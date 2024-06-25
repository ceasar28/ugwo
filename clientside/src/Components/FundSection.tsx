import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBank, faCoins, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

interface FundSectionProps {
  handleModalOpen: (modalName: string) => void;
}

const FundSection: React.FC<FundSectionProps> = ({ handleModalOpen }) => (
  <section className='mt-8 bg-white p-6 rounded-lg shadow-4xl w-full max-w-md text-center'>
    <div className='flex justify-between'>
      <h3 className='text-h6 text-primary-400 mb-2 text-bold text-2 '>
        Fund Account
      </h3>
      <Button className='text-bold text-2 ' onClick={() => handleModalOpen('viewAllFunds')}>
        View All
      </Button>
    </div>
    <div className='flex overflow-x-auto space-x-4 pb-4'>
      <div className='flex-grow'>
        <Button
           className='p-6 rounded-lg bg-primary-100 text-black-600 m-auto w-[230px] max-w-md text-center'
          onClick={() => handleModalOpen('fundBankAccount')}
        >
          <FontAwesomeIcon icon={faBank} className='mr-2' />
          <div className='text-bold text-2 '>Using Bank Account</div>
        </Button>
      </div>
      <div className='flex-grow'>
        <Button
           className='p-6 rounded-lg bg-primary-100 text-black-600 m-auto w-[230px] max-w-md text-center'
          onClick={() => handleModalOpen('fundNaira')}
        >
          <FontAwesomeIcon icon={faCoins} className='mr-2' />
          <div className='text-bold text-2 '>Fund with Naira</div>
        </Button>
      </div>
      <div className='flex-grow'>
        <Button
           className='p-6 rounded-lg bg-primary-100 text-black-600 m-auto w-[230px] max-w-md text-center'
          onClick={() => handleModalOpen('fundStablecoins')}
        >
          <FontAwesomeIcon icon={faExchangeAlt} className='mr-2' />
          <div className='text-bold text-2 '>Using Other Stablecoins</div>
        </Button>
      </div>
    </div>
  </section>
);

export default FundSection;
