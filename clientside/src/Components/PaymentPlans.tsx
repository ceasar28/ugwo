import React, { useEffect, useState, useCallback } from "react";
import ModalActive from "./ModalActive"; // Assuming you have a Modal component for displaying content
import { useAccount, useReadContract } from "wagmi";
import abi from "../utils/contractABI.json";

const contractAddress = "0xDA640C8b7495577DAC1bee511092320812cDEc5E";

interface Plan {
  creator: string;
  recipient: string;
  period: bigint;
  amount: bigint;
  isActive: boolean;
  planId: bigint;
}

const PaymentPlans: React.FC = () => {
  const { address } = useAccount();
  const [showAllModal, setShowAllModal] = useState(false);
  const [cancelledPayments, setCancelledPayments] = useState<number[]>([]);
  const [activePlans, setActivePlans] = useState<Plan[]>([]);

  const { data: readData } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getPlansByAddress",
    args: [address],
  }) as { data: Plan[] };

  const getActivePlans = useCallback((plans: Plan[]): Plan[] => {
    return plans.filter((plan) => plan.isActive);
  }, []);

  useEffect(() => {
    if (address && readData) {
      const activePlans = getActivePlans(readData);
      setActivePlans(activePlans);
    }
  }, [readData, address, getActivePlans]);

  const handleCancelPayment = (id: number) => {
    setCancelledPayments((prev) => [...prev, id]);
  };

  const handleViewAllPayments = () => {
    setShowAllModal(true);
  };

  const handleCloseModal = () => {
    setShowAllModal(false);
  };

  const formatDate = (epochTimestamp: bigint) => {
    const date = new Date(Number(epochTimestamp) * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <section className="mt-8 w-full max-w-md mb-5">
      <h3 className="text-h6 flex justify-between items-center m-auto text-primary-400 mb-2 font-bold text-2xl">
        <p>Active Payments Plans</p>
        {activePlans.length > 3 && (
          <button
            className="text-sm text-blue-600 mt-2"
            onClick={handleViewAllPayments}
          >
            View All
          </button>
        )}
      </h3>
      <ul>
        {activePlans.length > 0 ? (
          activePlans.slice(0, 3).map((plan: Plan, index: number) => (
            <li key={index} className="bg-white p-4 mb-2 rounded-lg">
              <div className="flex justify-between text-black-600">
                <span>{truncateAddress(plan.creator)}</span>
                <span>
                  {plan.amount >= 0
                    ? `+$${Number(plan.amount).toFixed(2)}`
                    : `-$${Math.abs(Number(plan.amount)).toFixed(2)}`}
                </span>
              </div>
              <span className="flex justify-between items-center m-auto">
                <div className="text-gray-400 text-sm">
                  {plan.period.toString()}
                </div>
                {cancelledPayments.includes(Number(plan.planId)) ? (
                  <button
                    className="text-sm text-white bg-gray-600 p-2 mb-2 rounded-lg"
                    disabled
                  >
                    Canceled
                  </button>
                ) : (
                  <button
                    className="text-sm text-white bg-red-600 p-2 mb-2 rounded-lg"
                    onClick={() => handleCancelPayment(Number(plan.planId))}
                  >
                    Cancel plan
                  </button>
                )}
              </span>
            </li>
          ))
        ) : (
          <li className="bg-white p-4 mb-2 rounded-lg">
            <div className="flex justify-between text-black-600">
              No Active Payment plan
            </div>
          </li>
        )}
      </ul>

      {showAllModal && (
        <ModalActive handleClose={handleCloseModal}>
          <h2 className="text-h6 text-primary-400 mb-2 font-bold text-2xl">
            All Payment Plans Created
          </h2>
          <div className="h-96 overflow-y-auto">
            <ul>
              {activePlans.map((plan: Plan) => (
                <li
                  key={Number(plan.planId)}
                  className="bg-primary-100 p-4 mb-2 rounded-lg"
                >
                  <div className="flex justify-between text-black-600">
                    <span>{truncateAddress(plan.recipient)}</span>
                    <span>
                      {plan.amount >= 0
                        ? `+$${Number(plan.amount).toFixed(2)}`
                        : `-$${Math.abs(Number(plan.amount)).toFixed(2)}`}
                    </span>
                  </div>
                  <span className="flex justify-between items-center m-auto">
                    <div className="text-gray-400 text-sm">
                      {plan.period.toString()}
                    </div>
                    {cancelledPayments.includes(Number(plan.planId)) ? (
                      <button
                        className="text-sm text-white bg-gray-600 p-2 mb-2 rounded-lg"
                        disabled
                      >
                        Canceled
                      </button>
                    ) : (
                      <button
                        className="text-sm text-white bg-red-600 p-2 mb-2 rounded-lg"
                        onClick={() => handleCancelPayment(Number(plan.planId))}
                      >
                        Cancel plan
                      </button>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ModalActive>
      )}
    </section>
  );
};

export default PaymentPlans;
