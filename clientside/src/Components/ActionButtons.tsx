import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  /* faWallet, */
  faFileInvoiceDollar,
  faDollarSign,
  /*   faArrowDown,
    faUserFriends, */
} from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import InvoiceModal from './InvoiceModal';
import FundWalletModal from './FundWalletModal';

const conversionRates = {
  USD: 1,
  NGN: 500,
  GBP: 0.75,
  EUR: 0.85,
  ETH: 0.0005, // Example rate
};

const walletAddress = '0xYourWalletAddressHere'; // Replace with actual wallet address

const ActionButtons: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleModalOpen = (modalName: string): void => {
    setActiveModal(modalName);
  };

  const handleModalClose = (): void => {
    setActiveModal(null);
  };

  return (
    <>
      <section className='mt-2 w-full max-w-md'>
        <div className='w-full max-w-md space-x-4 m-auto flex justify-between items-center'>
          {/*  <div className='flex-shrink-0'>
            <Button
              className='p-6 rounded-lg bg-white text-black-600'
              onClick={() => handleModalOpen('viewAssets')}
            >
              <FontAwesomeIcon icon={faWallet} className='text-red-600 text-2xl' />
              <div className='text-bold text-2 '>View Assets</div>
            </Button>
          </div> */}
          <div className=' '>
            <Button
              className='justify-center items-center mt-8 w-[200px] ss:w-[200px] max-w-md p-6 rounded-lg bg-white text-black-600 flex gap-2'
              onClick={() => handleModalOpen('invoice')}
            >
              <FontAwesomeIcon icon={faFileInvoiceDollar} className='text-blue-600 text-2xl' />
              <div className='text-bold text-2 '>Invoice</div>
            </Button>
          </div>
          <div className=''>
            <Button
              className='justify-center items-center mt-8 w-[200px] ss:w-[200px] max-w-md p-6 rounded-lg bg-white text-black-600 flex gap-2'
              onClick={() => handleModalOpen('fund')}
            >
              <FontAwesomeIcon icon={faDollarSign} className='text-green-600 text-2xl' />
              <div className='text-bold text-2 '>Fund</div>
            </Button>
          </div>
          {/*  <div className='flex-shrink-0'>
            <Button
              className='p-6 rounded-lg bg-white text-black-600'
              onClick={() => handleModalOpen('withdraw')}
            >
              <FontAwesomeIcon icon={faArrowDown} className='text-purple-600 text-2xl' />
              <div className='text-bold text-2 '>Withdraw</div>
            </Button>
          </div> */}
          {/*  <div className='flex-shrink-0'>
            <Button
              className='p-6 rounded-lg bg-white text-black-600'
              onClick={() => handleModalOpen('inviteFriends')}
            >
              <FontAwesomeIcon icon={faUserFriends} className='text-yellow-600 text-2xl' />
              <div className='text-bold text-2 '>Invite Friends</div>
            </Button>
          </div> */}
        </div>
      </section>

      {activeModal === 'invoice' && (
        <InvoiceModal
          handleModalClose={handleModalClose}
          conversionRates={conversionRates}
        />
      )}

      {activeModal === 'fund' && (
        <FundWalletModal
          handleModalClose={handleModalClose}
          walletAddress={walletAddress}
        />
      )}
    </>
  );
};

export default ActionButtons;
