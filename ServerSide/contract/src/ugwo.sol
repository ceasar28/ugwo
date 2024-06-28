// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SubscriptionManager {
    address payable public owner;

    struct Payment {
        address from;
        address to;
        uint256 amount;
        string description;
        uint256 timestamp;
    }

    struct Plan {
        address creator;
        address payable recipient;
        uint256 period;
        uint256 amount;
        bool isActive;
        uint256 planId;
    }

    struct Subscription {
        uint256 subscriptionId;
        uint256 planId;
        address payable payer;
        bool isActive;
        uint256 totalAmountPaid;
        uint256 remainingAmount;
        uint256 totalSubscriptionPeriod;
        uint256 balance;
        uint256 payoutCount;
    }

    Payment[] public payments;
    Plan[] public plans;
    Subscription[] public subscriptions;

    mapping(address => uint256[]) public userPlans;
    mapping(address => uint256[]) public userSubscriptions;
    mapping(address => uint256[]) public userPayments;
    mapping(address => uint256[]) public userReceivedPayments;
    mapping(uint256 => uint256[]) public planSubscriptions;

    event PaymentSent(address indexed from, address indexed to, uint256 amount, string description);
    event PlanCreated(address indexed creator, uint256 planId);
    event PlanCancelled(uint256 planId);
    event Subscribed(uint256 planId, address indexed payer, uint256 subscriptionId);
    event SubscriptionCancelled(uint256 planId, address indexed payer, uint256 subscriptionId);
    event Payout(uint256 planId, address indexed creator, address indexed payer, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = payable(msg.sender);
    }

    function sendPayment(address payable _to, string memory _description) external payable {
        require(msg.value > 0, "Payment amount must be greater than zero");

        payable(_to).transfer(msg.value);

        uint256 paymentId = payments.length;
        payments.push(Payment({
            from: msg.sender,
            to: _to,
            amount: msg.value,
            description: _description,
            timestamp: block.timestamp
        }));

        userPayments[msg.sender].push(paymentId);
        userReceivedPayments[_to].push(paymentId);

        emit PaymentSent(msg.sender, _to, msg.value, _description);
    }

    function getPaymentHistory() public view returns (Payment[] memory) {
        return payments;
    }

    function getUserPaymentHistory(address _user) public view returns (Payment[] memory) {
        uint256[] memory paymentIds = userPayments[_user];
        Payment[] memory result = new Payment[](paymentIds.length);

        for (uint256 i = 0; i < paymentIds.length; i++) {
            result[i] = payments[paymentIds[i]];
        }

        return result;
    }

    function getUserReceivedPaymentHistory(address _user) public view returns (Payment[] memory) {
        uint256[] memory paymentIds = userReceivedPayments[_user];
        Payment[] memory result = new Payment[](paymentIds.length);

        for (uint256 i = 0; i < paymentIds.length; i++) {
            result[i] = payments[paymentIds[i]];
        }

        return result;
    }

    function createPlan(
        uint256 _period,
        uint256 _amount
    ) public {
        uint256 planId = plans.length;

        plans.push(Plan({
            creator: msg.sender,
            recipient: payable(msg.sender),
            period: _period,
            amount: _amount,
            isActive: true,
            planId: planId
        }));

        userPlans[msg.sender].push(planId);

        emit PlanCreated(msg.sender, planId);
    }

    function cancelPlan(uint256 _planId) external {
        Plan storage plan = plans[_planId];
        require(plan.creator == msg.sender, "Only plan creator can cancel the plan");
        require(plan.isActive, "Subscription plan is already cancelled");

        plan.isActive = false;

        emit PlanCancelled(_planId);
    }

    function getPlans() external view returns (Plan[] memory) {
        return plans;
    }

    function getPlansByAddress(address _user) external view returns (Plan[] memory) {
        uint256[] memory planIds = userPlans[_user];
        Plan[] memory result = new Plan[](planIds.length);

        for (uint256 i = 0; i < planIds.length; i++) {
            result[i] = plans[planIds[i]];
        }

        return result;
    }

    function subscribeToPlan(uint256 _planId, uint256 _totalSubscriptionPeriod) external payable {
        Plan storage plan = plans[_planId];
        require(plan.isActive, "Plan is not active");

        uint256 totalAmount = plan.amount * _totalSubscriptionPeriod;
        require(msg.value == totalAmount, "Incorrect subscription amount");

        uint256 subscriptionId = subscriptions.length;

        subscriptions.push(Subscription({
            subscriptionId: subscriptionId,
            planId: _planId,
            payer: payable(msg.sender),
            isActive: true,
            totalAmountPaid: 0,
            remainingAmount: totalAmount,
            totalSubscriptionPeriod: _totalSubscriptionPeriod,
            balance: totalAmount,
            payoutCount: 0
        }));

        userSubscriptions[msg.sender].push(subscriptionId);
        planSubscriptions[_planId].push(subscriptionId);

        emit Subscribed(_planId, msg.sender, subscriptionId);
    }

    function getSubscriptions() external view returns (Subscription[] memory) {
        return subscriptions;
    }

    function getSubscriptionsByAddress(address _user) external view returns (Subscription[] memory) {
        uint256[] memory subscriptionIds = userSubscriptions[_user];
        Subscription[] memory result = new Subscription[](subscriptionIds.length);

        for (uint256 i = 0; i < subscriptionIds.length; i++) {
            result[i] = subscriptions[subscriptionIds[i]];
        }

        return result;
    }

    function cancelSubscription(uint256 _subscriptionId) external {
        Subscription storage subscription = subscriptions[_subscriptionId];
        require(subscription.payer == msg.sender, "Only subscriber can cancel the subscription");

        uint256 refundAmount = subscription.balance;
        subscription.isActive = false;
        subscription.balance = 0;

        subscription.payer.transfer(refundAmount);

        emit SubscriptionCancelled(subscription.planId, msg.sender, _subscriptionId);
    }

    function getPlanSubscribers(uint256 _planId) external view returns (Subscription[] memory) {
        uint256[] memory subscriptionIds = planSubscriptions[_planId];
        Subscription[] memory result = new Subscription[](subscriptionIds.length);

        for (uint256 i = 0; i < subscriptionIds.length; i++) {
            result[i] = subscriptions[subscriptionIds[i]];
        }

        return result;
    }

    function payout(uint256 _planId) external onlyOwner {
        Plan storage plan = plans[_planId];
        require(plan.isActive, "Plan is not active");

        for (uint256 i = 0; i < subscriptions.length; i++) {
            Subscription storage subscription = subscriptions[i];
            if (subscription.planId == _planId && subscription.isActive) {
                uint256 amountToPay = plan.amount;
                uint256 creatorShare = (amountToPay * 95) / 100;
                uint256 callerShare = amountToPay - creatorShare;

                require(subscription.balance >= amountToPay, "Insufficient balance in subscription");
                subscription.balance -= amountToPay;
                subscription.totalAmountPaid += amountToPay;
                subscription.payoutCount++;

                plan.recipient.transfer(creatorShare);
                payable(msg.sender).transfer(callerShare);

                emit Payout(_planId, plan.creator, subscription.payer, amountToPay);
            }
        }
    }

    function getActivePlans() external view returns (Plan[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < plans.length; i++) {
            if (plans[i].isActive) {
                count++;
            }
        }

        Plan[] memory result = new Plan[](count);
        uint256 j = 0;

        for (uint256 i = 0; i < plans.length; i++) {
            if (plans[i].isActive) {
                result[j] = plans[i];
                j++;
            }
        }

        return result;
    }

    function getActiveSubscriptions() external view returns (Subscription[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < subscriptions.length; i++) {
            if (subscriptions[i].isActive) {
                count++;
            }
        }

        Subscription[] memory result = new Subscription[](count);
        uint256 j = 0;

        for (uint256 i = 0; i < subscriptions.length; i++) {
            if (subscriptions[i].isActive) {
                result[j] = subscriptions[i];
                j++;
            }
        }

        return result;
    }

    receive() external payable {
        revert("Direct payments not accepted");
    }
}
