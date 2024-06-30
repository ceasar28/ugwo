import React, { useState, useCallback, useEffect } from "react";
import BalanceSection from "../../Components/BalanceSection";
import ActionButtons from "../../Components/ActionButtons";
import FundSection from "../../Components/FundSection";
import WithdrawSection from "../../Components/WithdrawSection";
import TransactionsList from "../../Components/TransactionsList";
import Modal from "../../Components/Modal";
import {
  useAccount,
  useBalance,
  useReadContract,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSimulateContract,
} from "wagmi";
import { parseEther } from "ethers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar } from "@coinbase/onchainkit/identity";
import { getTokens } from "@coinbase/onchainkit/token";
import abi from "../../utils/contractABI.json";

const contractAddress = "0x468a05df850c836ca08ad965fd5188fa4b3ba032";

const Dashboard: React.FC = () => {
  const [ethValue, setEthValue] = useState<string>("0");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const navigate = useNavigate();
  const { address } = useAccount();

  const { data, refetch } = useBalance({
    address: address,
  });
  const account = useAccount();
  const balance = useBalance({ address: account.address });
  const [profile, setProfile] = useState<string[]>([]);

  const balanceUSD = 4500.0;
  const conversionRates: { [key: string]: number } = {
    USD: 1,
    NGN: 500,
    GBP: 0.75,
    EUR: 0.85,
  };

  // Read values from the smart contract
  const {
    data: readData,
    isLoading: readLoading,
    error,
  } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "owner",
    args: [],
  });

  // Reading multiples values from the smart contract
  const {
    data: allData,
    isLoading: multipleDataLoading,
    error: muiltipleReadingError,
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
      {
        address: contractAddress,
        abi: abi,
        functionName: "getSubscriptionsByAddress",
        args: [address],
      },
      {
        address: contractAddress,
        abi: abi,
        functionName: "getPlansByAddress",
        args: [address],
      },
      { address: contractAddress, abi: abi, functionName: "owner", args: [] },
      { address: contractAddress, abi: abi, functionName: "owner", args: [] },
    ],
  });

  useEffect(() => {
    console.log(`user Address :`, address);
    console.log(`User balance   :`, `${data?.formatted} ${data?.symbol}`);
    const fetchEthValue = async () => {
      const rate = await getEthConversionRate();
      setEthValue((balanceUSD / rate).toFixed(4));
    };
    fetchEthValue();
    console.log(account.chain?.nativeCurrency.name);

    console.log(readData);
    console.log(`All users Data  :`, allData);
  }, [address]);

  const getEthConversionRate = async (): Promise<number> => {
    // Simulate an API call
    return 2000;
  };

  const handleModalOpen = (modalName: string): void => {
    setActiveModal(modalName);
  };

  const handleModalClose = (): void => {
    setActiveModal(null);
  };

  // const checkUserProfile = useCallback(
  //   async (walletAddress: any) => {
  //     try {
  //       const response = await axios.get(
  //         `https://ugwo.onrender.com/user/get-user/${walletAddress}`
  //       );
  //       if (response.data) {
  //         console.log(response.data);
  //         setProfile(response.data);
  //         navigate("/wallet");
  //       } else {
  //         navigate("/profile");
  //       }
  //     } catch (error) {
  //       console.log("No record found, navigating to profile creation.");
  //       navigate("/profile");
  //     }
  //   },
  //   [navigate]
  // );

  // useEffect(() => {
  //   // Check if there is no wallet address
  //   if (!address) {
  //     navigate("/");
  //   } else {
  //     // If there is a wallet address, check user profile
  //     checkUserProfile(address);
  //   }
  // }, [address, navigate, checkUserProfile]);

  return (
    <div className="min-h-screen bg-primary-100 font-Inter mb-20">
      <main className="p-6 flex flex-col items-center">
        <BalanceSection
          balanceUSD={balanceUSD}
          ethValue={ethValue}
          conversionRates={conversionRates}
        />

        <ActionButtons />
        <FundSection handleModalOpen={handleModalOpen} />
        <WithdrawSection handleModalOpen={handleModalOpen} />
        <TransactionsList />
      </main>
      {activeModal && (
        <Modal activeModal={activeModal} handleModalClose={handleModalClose} />
      )}
    </div>
  );
};

export default Dashboard;
