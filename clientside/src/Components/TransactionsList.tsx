import React, { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useReadContract,
  useReadContracts,
} from "wagmi";
import abi from "../utils/contractABI.json";

const contractAddress = "0xDA640C8b7495577DAC1bee511092320812cDEc5E";

interface Transaction {
  from: string;
  to: string;
  amount: bigint;
  description: string;
  timestamp: bigint;
}

const TransactionsList: React.FC = () => {
  const [paymentHistory, setPaymentHistory] = useState<Transaction[]>([]);
  const [receivedPaymentHistory, setReceivedPaymentHistory] = useState<
    Transaction[]
  >([]);
  const [sortedTransactionHistory, setSortedTransactionHistory] = useState<
    Transaction[]
  >([]);
  const { address } = useAccount();
  const { data } = useBalance({ address: address });

  const {
    data: readData,
    isLoading: readLoading,
    error,
  } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getSubscriptionsByAddress",
    args: [address],
  });

  const {
    data: allData,
    isLoading: multipleDataLoading,
    error: multipleReadingError,
  } = useReadContracts({
    contracts: [
      {
        address: contractAddress,
        abi: abi,
        functionName: "getUserPaymentHistory",
        args: [address],
      },
      {
        address: contractAddress,
        abi: abi,
        functionName: "getUserReceivedPaymentHistory",
        args: [address],
      },
    ],
  });

  const sortTransactions = (transactions: Transaction[]) => {
    return transactions.sort(
      (a, b) => Number(a.timestamp) - Number(b.timestamp)
    );
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

  useEffect(() => {
    if (address && allData?.[0]?.result && allData?.[1]?.result) {
      const paymentHistoryData = allData[0].result as Transaction[];
      const receivedPaymentHistoryData = allData[1].result as Transaction[];

      setPaymentHistory(paymentHistoryData);
      setReceivedPaymentHistory(receivedPaymentHistoryData);

      const allTransactions = [
        ...paymentHistoryData,
        ...receivedPaymentHistoryData,
      ];
      const sortedTransactions = sortTransactions(allTransactions);

      setSortedTransactionHistory(sortedTransactions);
    } else {
      setPaymentHistory([]);
      setReceivedPaymentHistory([]);
      setSortedTransactionHistory([]);
    }
  }, [allData, address]);

  return (
    <section className="mt-8 w-full max-w-md">
      <h3 className="text-h6 text-primary-400 mb-2 text-bold text-2 font-bold">
        Recent Transactions
      </h3>
      <ul>
        {sortedTransactionHistory.length > 0 ? (
          sortedTransactionHistory.map(
            (transaction: Transaction, index: number) => {
              const amountInEth =
                Number(transaction.amount) / Number(10n ** 18n);
              const truncatedTo = truncateAddress(transaction.to);
              const truncatedFrom = truncateAddress(transaction.from);
              return (
                <li key={index} className="bg-primary-600 p-4 mb-2 rounded-lg">
                  <div className="flex justify-between text-white">
                    {transaction.from === address ? (
                      <span>{`Sent to ${truncatedTo}`}</span>
                    ) : (
                      <span>{`Received from ${truncatedFrom}`}</span>
                    )}
                    {transaction.from === address ? (
                      <span className="text-red-500">
                        - {amountInEth.toFixed(3)} ETH
                      </span>
                    ) : (
                      <span className="text-green-500">
                        + {amountInEth.toFixed(3)} ETH
                      </span>
                    )}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {formatDate(transaction.timestamp)}
                  </div>
                </li>
              );
            }
          )
        ) : (
          <li className="bg-primary-600 p-4 mb-2 rounded-lg">
            <div className="text-white">No transactions found.</div>
          </li>
        )}
      </ul>
    </section>
  );
};

export default TransactionsList;
