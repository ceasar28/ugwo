import React, { useEffect, useState, useCallback } from "react";
import ModalActive from "./ModalActive"; // Assuming you have a Modal component for displaying content
import { useAccount, useBalance, useReadContract } from "wagmi";
import abi from "../utils/contractABI.json";

const contractAddress = "0xDA640C8b7495577DAC1bee511092320812cDEc5E";

interface Subscription {
  subscriptionId: bigint;
  planId: bigint;
  payer: string;
  isActive: boolean;
  totalAmountPaid: bigint;
  remainingAmount: bigint;
  totalSubscriptionPeriod: number;
  balance: bigint;
  payoutCount: bigint;
}

const ActiveSubList: React.FC = () => {
  const { address } = useAccount();
  const [showAllModal, setShowAllModal] = useState(false);
  const [cancelledSubscriptions, setCancelledSubscriptions] = useState<
    number[]
  >([]);
  const [allActiveSubscriptions, setAllActiveSubscriptions] = useState<
    Subscription[]
  >([]);

  const { data: readData } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getSubscriptionsByAddress",
    args: [address],
  }) as { data: Subscription[] };

  const getActiveSubscriptions = useCallback(
    (subscriptions: Subscription[]): Subscription[] => {
      return subscriptions.filter((subscription) => subscription.isActive);
    },
    []
  );

  useEffect(() => {
    if (address && readData) {
      const activeSubscriptions = getActiveSubscriptions(readData);
      setAllActiveSubscriptions(activeSubscriptions);
    }
  }, [readData, address, getActiveSubscriptions]);

  const handleCancelSubscription = (id: number) => {
    setCancelledSubscriptions((prev) => [...prev, id]);
  };

  const handleViewAllSubscriptions = () => {
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
    <section className="mt-8 w-full max-w-md">
      <h3 className="text-h6 flex justify-between items-center m-auto text-primary-400 mb-2 font-bold text-2xl">
        <p>Active Subscriptions</p>
        {allActiveSubscriptions.length > 3 && (
          <button
            className="text-sm text-blue-600 mt-2"
            onClick={handleViewAllSubscriptions}
          >
            View All
          </button>
        )}
      </h3>
      <ul>
        {allActiveSubscriptions.length > 0 ? (
          allActiveSubscriptions
            .slice(0, 3)
            .map((subscription: Subscription, index: number) => (
              <li key={index} className="bg-white p-4 mb-2 rounded-lg">
                <div className="flex justify-between text-black-600">
                  <span>{truncateAddress(subscription.payer)}</span>
                  <span>
                    {subscription.totalAmountPaid >= 0
                      ? `+$${Number(subscription.totalAmountPaid).toFixed(2)}`
                      : `-$${Math.abs(
                          Number(subscription.totalAmountPaid)
                        ).toFixed(2)}`}
                  </span>
                </div>
                <span className="flex justify-between items-center m-auto">
                  <div className="text-gray-400 text-sm">
                    {subscription.totalSubscriptionPeriod}
                  </div>
                  {cancelledSubscriptions.includes(
                    Number(subscription.subscriptionId)
                  ) ? (
                    <button
                      className="text-sm text-white bg-gray-600 p-2 mb-2 rounded-lg"
                      disabled
                    >
                      Canceled
                    </button>
                  ) : (
                    <button
                      className="text-sm text-white bg-red-600 p-2 mb-2 rounded-lg"
                      onClick={() =>
                        handleCancelSubscription(
                          Number(subscription.subscriptionId)
                        )
                      }
                    >
                      Cancel Subscription
                    </button>
                  )}
                </span>
              </li>
            ))
        ) : (
          <li className="bg-white p-4 mb-2 rounded-lg">
            <div className="flex justify-between text-black-600">
              No Active Payment Subscription
            </div>
          </li>
        )}
      </ul>

      {showAllModal && (
        <ModalActive handleClose={handleCloseModal}>
          <h2 className="text-h6 text-primary-400 mb-2 font-bold text-2xl">
            All Subscriptions
          </h2>
          <div className="h-96 overflow-y-auto">
            <ul>
              {allActiveSubscriptions.map((subscription: Subscription) => (
                <li
                  key={Number(subscription.subscriptionId)}
                  className="bg-primary-100 p-4 mb-2 rounded-lg"
                >
                  <div className="flex justify-between text-black-600">
                    <span>{truncateAddress(subscription.payer)}</span>
                    <span>
                      {subscription.totalAmountPaid >= 0
                        ? `+$${Number(subscription.totalAmountPaid).toFixed(2)}`
                        : `-$${Math.abs(
                            Number(subscription.totalAmountPaid)
                          ).toFixed(2)}`}
                    </span>
                  </div>
                  <span className="flex justify-between items-center m-auto">
                    <div className="text-gray-400 text-sm">
                      {subscription.totalSubscriptionPeriod}
                    </div>
                    {cancelledSubscriptions.includes(
                      Number(subscription.subscriptionId)
                    ) ? (
                      <button
                        className="text-sm text-white bg-gray-600 p-2 mb-2 rounded-lg"
                        disabled
                      >
                        Canceled
                      </button>
                    ) : (
                      <button
                        className="text-sm text-white bg-red-600 p-2 mb-2 rounded-lg"
                        onClick={() =>
                          handleCancelSubscription(
                            Number(subscription.subscriptionId)
                          )
                        }
                      >
                        Cancel Subscription
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

export default ActiveSubList;
