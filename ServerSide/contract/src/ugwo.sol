// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Ugwo {

    struct Payment {
        address sender;
        address recipient;
        uint256 amount;
        string description;
        string paymentUUID;
    }

    struct SubscriptionPlan {
        bool active;
        uint256 amount;
        uint256 period; // in seconds
        address payable recipient;
        string planId;
    }

    struct Subscription {
        uint256 startTime;
        uint256 endTime;
        bool active;
        string planId;
        string subscriptionId;
    }

    mapping(string => Payment) public payments;
    mapping(string => SubscriptionPlan) public subscriptionPlans;
    mapping(address => string[]) public userCreatedPlans;
    mapping(address => string[]) public userSubscribedPlans;
    mapping(string => Subscription) public subscriptions;

    string[] public allSubscriptionPlans;
    string[] public allSubscriptions;

    mapping(address => string[]) public paymentHistory;

    event PaymentSent(address indexed sender, address indexed recipient, uint256 amount, string description, string paymentUUID);
    event SubscriptionCreated(address indexed creator, uint256 amount, uint256 period, string planId);
    event Subscribed(address indexed subscriber, address indexed planOwner, uint256 amount, uint256 startTime, uint256 endTime, string planId, string subscriptionId);
    event Payout(address indexed planOwner, address indexed subscriber, uint256 amount, string planId, string subscriptionId);
    event SubscriptionCancelled(address indexed subscriber, address indexed planOwner, uint256 amount, string planId, string subscriptionId);

    function generateUUID() internal view returns (string memory) {
        return string(abi.encodePacked(keccak256(abi.encodePacked(msg.sender, block.timestamp))));
    }

    function sendEthPayment(address payable recipient, string memory description, string memory paymentUUID) public payable {
        require(msg.value > 0, "Payment amount must be greater than 0");
        string memory paymentId = generateUUID();
        payments[paymentId] = Payment(msg.sender, recipient, msg.value, description, paymentUUID);
        paymentHistory[msg.sender].push(paymentId);

        recipient.transfer(msg.value);
        emit PaymentSent(msg.sender, recipient, msg.value, description, paymentUUID);
    }

    function createSubscriptionPlan(uint256 amount, uint256 period) public {
        require(amount > 0, "Subscription amount must be greater than 0");
        require(period > 0, "Subscription period must be greater than 0");

        string memory planId = generateUUID();
        subscriptionPlans[planId] = SubscriptionPlan(true, amount, period, payable(msg.sender), planId);
        userCreatedPlans[msg.sender].push(planId);
        allSubscriptionPlans.push(planId);
        emit SubscriptionCreated(msg.sender, amount, period, planId);
    }

    function subscribe(address planOwner, string memory planId) public payable {
        SubscriptionPlan memory plan = subscriptionPlans[planId];
        require(plan.amount > 0, "Subscription plan does not exist");
        require(plan.active, "Subscription plan is not active");

        require(msg.value == plan.amount, "Incorrect subscription amount");

        string memory subscriptionId = generateUUID();
        subscriptions[subscriptionId] = Subscription(block.timestamp, block.timestamp + plan.period, true, planId, subscriptionId);
        userSubscribedPlans[msg.sender].push(subscriptionId);
        allSubscriptions.push(subscriptionId);
        emit Subscribed(msg.sender, planOwner, msg.value, block.timestamp, block.timestamp + plan.period, planId, subscriptionId);
    }

    function payout(string memory subscriptionId) public {
        Subscription memory subscription = subscriptions[subscriptionId];
        require(subscription.active, "No active subscription found");
        require(block.timestamp >= subscription.endTime, "Subscription period has not ended");

        SubscriptionPlan storage plan = subscriptionPlans[subscription.planId];
        require(plan.amount > 0, "Subscription plan does not exist");
        require(plan.active, "Subscription plan is not active");

        plan.recipient.transfer(plan.amount);

        subscriptions[subscriptionId].active = false;
        emit Payout(plan.recipient, msg.sender, plan.amount, subscription.planId, subscriptionId);
    }

    function cancelSubscription(string memory subscriptionId) public {
        Subscription memory subscription = subscriptions[subscriptionId];
        require(subscription.active, "No active subscription found");
        require(block.timestamp < subscription.endTime, "Subscription period has already ended");

        SubscriptionPlan memory plan = subscriptionPlans[subscription.planId];
        require(plan.amount > 0, "Subscription plan does not exist");
        require(plan.active, "Subscription plan is not active");

        payable(msg.sender).transfer(plan.amount);

        subscriptions[subscriptionId].active = false;
        emit SubscriptionCancelled(msg.sender, plan.recipient, plan.amount, subscription.planId, subscriptionId);
    }

    function cancelSubscriptionPlan(string memory planId) public {
        SubscriptionPlan storage plan = subscriptionPlans[planId];
        require(plan.amount > 0, "Subscription plan does not exist");
        require(plan.active, "Subscription plan is already cancelled");

        plan.active = false;
        emit SubscriptionCancelled(msg.sender, plan.recipient, plan.amount, planId, "");
    }

    function getAllSubscriptionPlans() public view returns (SubscriptionPlan[] memory) {
        SubscriptionPlan[] memory plans = new SubscriptionPlan[](allSubscriptionPlans.length);
        for (uint i = 0; i < allSubscriptionPlans.length; i++) {
            plans[i] = subscriptionPlans[allSubscriptionPlans[i]];
        }
        return plans;
    }

    function getAllSubscriptions() public view returns (Subscription[] memory) {
        Subscription[] memory subs = new Subscription[](allSubscriptions.length);
        for (uint i = 0; i < allSubscriptions.length; i++) {
            subs[i] = subscriptions[allSubscriptions[i]];
        }
        return subs;
    }

    function getCreatedSubscriptionPlansByUser(address user) public view returns (SubscriptionPlan[] memory) {
        string[] memory planIds = userCreatedPlans[user];
        SubscriptionPlan[] memory plans = new SubscriptionPlan[](planIds.length);
        for (uint i = 0; i < planIds.length; i++) {
            plans[i] = subscriptionPlans[planIds[i]];
        }
        return plans;
    }

    function getSubscribedPlansByUser(address user) public view returns (Subscription[] memory) {
        string[] memory subscriptionIds = userSubscribedPlans[user];
        Subscription[] memory subs = new Subscription[](subscriptionIds.length);
        for (uint i = 0; i < subscriptionIds.length; i++) {
            subs[i] = subscriptions[subscriptionIds[i]];
        }
        return subs;
    }

    function getSubscriptionPlan(string memory planId) public view returns (SubscriptionPlan memory) {
        return subscriptionPlans[planId];
    }

    function getSubscription(string memory subscriptionId) public view returns (Subscription memory) {
        return subscriptions[subscriptionId];
    }

    function getPaymentHistory(address user) public view returns (Payment[] memory) {
        string[] memory paymentIds = paymentHistory[user];
        Payment[] memory userPayments = new Payment[](paymentIds.length);
        for (uint i = 0; i < paymentIds.length; i++) {
            userPayments[i] = payments[paymentIds[i]];
        }
        return userPayments;
    }
}
