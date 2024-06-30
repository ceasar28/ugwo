import React, { useState, useCallback, useEffect } from "react";
import BalanceSection from '../../Components/BalanceSection';
import ActionButtons from '../../Components/ActionButtons';
import FundSection from '../../Components/FundSection';
import WithdrawSection from '../../Components/WithdrawSection';
import ActiveSubList from "../../Components/ActiveSubList";
import PaymentList from '../../Components/TransactionsList';
import Modal from '../../Components/Modal';
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentPlans from "../../Components/PaymentPlans";

const Dashboard: React.FC = () => {
  const [ethValue, setEthValue] = useState<string>('0');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const navigate = useNavigate();
  const { address } = useAccount(); 
  const [profile, setProfile] = useState<string[]>([]);

  const balanceUSD = 4500.0;
  const conversionRates: { [key: string]: number } = {
    USD: 1,
    NGN: 500,
    GBP: 0.75,
    EUR: 0.85,
  };

  useEffect(() => {
    const fetchEthValue = async () => {
      const rate = await getEthConversionRate();
      setEthValue((balanceUSD / rate).toFixed(4));
    };
    fetchEthValue();
  }, []);

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

  const checkUserProfile = useCallback(async (walletAddress) => {
    try {
      const response = await axios.get(
        `https://ugwo.onrender.com/user/get-user/${walletAddress}`
      );
      if (response.data) {
        console.log(response.data);
        setProfile(response.data);
        navigate("/wallet");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      console.log("No record found, navigating to profile creation.");
      navigate("/profile");
    }
  }, [navigate]);
  /* useEffect(() => {
    // Check if there is no wallet address
    if (!address) {
      navigate("/");
    } else {
      // If there is a wallet address, check user profile
      checkUserProfile(address);
    }
  }, [address, navigate, checkUserProfile]); */


  return (
    <div className='min-h-screen bg-primary-100 font-Inter'>
      <main className='p-6 flex flex-col items-center'>
        <BalanceSection
          balanceUSD={balanceUSD}
          ethValue={ethValue}
          conversionRates={conversionRates}
        />

        <ActionButtons />
       {/*  <FundSection handleModalOpen={handleModalOpen} />
        <WithdrawSection handleModalOpen={handleModalOpen} /> */}
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
