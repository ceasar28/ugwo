import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBank, faCoins, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

interface WithdrawSectionProps {
  handleModalOpen: (modalName: string) => void;
}

const WithdrawSection: React.FC<WithdrawSectionProps> = ({ handleModalOpen }) => (
  <section className='mt-8 bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md text-center'>
    <div className='flex justify-between'>
      <h3 className='text-h6 text-primary-400 mb-2 text-bold text-2 font-bold'>
        Withdraw Funds
      </h3>
      <Button className='text-bold text-2 font-bold' onClick={() => handleModalOpen('viewAllWithdrawals')}>
        View All
      </Button>
    </div>
    <div className='flex overflow-x-auto space-x-4 pb-4'>
      <div className='flex-shrink-0'>
        <Button
          className='p-6 rounded-lg bg-white text-black-600'
          onClick={() => handleModalOpen('withdrawBankAccount')}
        >
          <FontAwesomeIcon icon={faBank} />
          <div className='text-bold text-2 font-bold'>To Bank Account</div>
        </Button>
      </div>
      <div className='flex-shrink-0'>
        <Button
          className='p-6 rounded-lg bg-white text-black-600'
          onClick={() => handleModalOpen('withdrawNaira')}
        >
          <FontAwesomeIcon icon={faCoins} />
          <div className='text-bold text-2 font-bold'>Withdraw Naira</div>
        </Button>
      </div>
      <div className='flex-shrink-0'>
        <Button
          className='p-6 rounded-lg bg-white text-black-600'
          onClick={() => handleModalOpen('withdrawStablecoins')}
        >
          <FontAwesomeIcon icon={faExchangeAlt} />
          <div className='text-bold text-2 font-bold'>Withdraw Stablecoins</div>
        </Button>
      </div>
    </div>
  </section>
);

export default WithdrawSection;
