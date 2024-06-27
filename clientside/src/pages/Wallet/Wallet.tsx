import React, { useState, useEffect } from 'react';
import BalanceSection from '../../Components/BalanceSection';
import ActionButtons from '../../Components/ActionButtons';
import FundSection from '../../Components/FundSection';
import WithdrawSection from '../../Components/WithdrawSection';
import TransactionsList from '../../Components/TransactionsList';
import Modal from '../../Components/Modal';

const Dashboard: React.FC = () => {
  const [ethValue, setEthValue] = useState<string>('0');
  const [activeModal, setActiveModal] = useState<string | null>(null);

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

  return (
    <div className='min-h-screen bg-primary-100 font-Inter mb-20'>
      <main className='p-6 flex flex-col items-center'>
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
