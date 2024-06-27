import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBank,
  faCoins,
  faExchangeAlt,
} from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

interface WithdrawSectionProps {
  handleModalOpen: (modalName: string) => void;
}

const WithdrawSection: React.FC<WithdrawSectionProps> = ({
  handleModalOpen,
}) => (
  <section className='mt-8 bg-white p-6 rounded-lg shadow-4xl w-full max-w-md text-center'>
    <div className='flex justify-between'>
      <h3 className='text-h6 text-primary-400 mb-2'>Withdraw Funds</h3>
      <Button className='' onClick={() => handleModalOpen('viewAllFunds')}>
        <div>View All</div>
      </Button>
    </div>
    <div className='flex flex-col overflow-y-auto space-y-4 pb-4'>
      <div className='flex-shrink-0'>
        <Button
          className='p-6 rounded-lg bg-primary-100 text-black-600 w-full max-w-md text-center'
          onClick={() => handleModalOpen('withdrawBankAccount')}
        >
          <FontAwesomeIcon icon={faBank} />
          <div>To Bank Account</div>
        </Button>
      </div>
      <div className='flex-shrink-0'>
        <Button
          className='p-6 rounded-lg bg-primary-100 text-black-600 w-full max-w-md text-center'
          onClick={() => handleModalOpen('withdrawNaira')}
        >
          <FontAwesomeIcon icon={faCoins} />
          <div>Withdraw Naira</div>
        </Button>
      </div>
      <div className='flex-shrink-0'>
        <Button
          className='p-6 rounded-lg bg-primary-100 text-black-600 w-full max-w-md text-center'
          onClick={() => handleModalOpen('withdrawStablecoins')}
        >
          <FontAwesomeIcon icon={faExchangeAlt} />
          <div>Withdraw Stablecoins</div>
        </Button>
      </div>
    </div>
  </section>
);

export default WithdrawSection;
