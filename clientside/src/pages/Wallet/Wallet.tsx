import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAccount, useBalance, useReadContracts } from "wagmi";
import abi from "../../utils/contractABI.json";
import BalanceSection from "../../Components/BalanceSection";
import ActionButtons from "../../Components/ActionButtons";
import PaymentList from "../../Components/TransactionsList";
import ActiveSubList from "../../Components/ActiveSubList";
import PaymentPlans from "../../Components/PaymentPlans";
import Modal from "../../Components/Modal";
import BottomNavbar from "../../layout/BottonNavbar";

const contractAddress = "0xDA640C8b7495577DAC1bee511092320812cDEc5E";

const Dashboard: React.FC = () => {
  const [ethValue, setEthValue] = useState<string>("0");
  const [USDValue, setUSDValue] = useState<string>("0");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [profile, setProfile] = useState<string[]>([]);
  const [activeSubscription, setActiveSubscription] = useState<any[]>([]);
  const [activePlans, setActivePlans] = useState<any[]>([]);
  const navigate = useNavigate();
  const { address } = useAccount();

  const { data: balanceData } = useBalance({ address });

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
      {
        address: contractAddress,
        abi: abi,
        functionName: "owner",
        args: [],
      },
    ],
  });

  const conversionRates: { [key: string]: number } = {
    USD: 1,
    NGN: 500,
    GBP: 0.75,
    EUR: 0.85,
  };

  const handleModalOpen = (modalName: string): void => {
    setActiveModal(modalName);
  };

  const handleModalClose = (): void => {
    setActiveModal(null);
  };

  const checkUserProfile = useCallback(
    async (walletAddress: string) => {
      try {
        const response = await axios.get(
          `https://ugwo.onrender.com/user/get-user/${walletAddress}`
        );
        if (response.data) {
          setProfile(response.data);
          navigate("/wallet");
        } else {
          navigate("/profile");
        }
      } catch (error) {
        console.log("No record found, navigating to profile creation.");
        navigate("/profile");
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (!address) {
      // navigate("/");
    } else {
      // checkUserProfile(address);
    }
  }, [address, navigate, checkUserProfile]);

  return (
    <div className="min-h-screen bg-primary-100 font-Inter">
      <main className="p-6 flex flex-col items-center">
        <BalanceSection
          balanceUSD={Number(USDValue)}
          ethValue={ethValue}
          conversionRates={conversionRates}
        />
        <ActionButtons />
        <PaymentList />
        <ActiveSubList />
        <PaymentPlans />
      </main>
      {activeModal && (
        <Modal activeModal={activeModal} handleModalClose={handleModalClose} />
      )}
    </div>
  );
};

export default Dashboard;
