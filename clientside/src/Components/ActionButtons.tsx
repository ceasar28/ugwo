import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faFileInvoiceDollar,
  faDollarSign,
  faArrowDown,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

interface ActionButtonsProps {
  handleModalOpen: (modalName: string) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ handleModalOpen }) => (
  <section className='mt-2 w-full max-w-md'>
    <div className='flex overflow-x-auto space-x-4 pb-4 m-3'>
      <div className='flex-shrink-0'>
        <Button
          className='p-6 rounded-lg bg-white text-black-600'
          onClick={() => handleModalOpen('viewAssets')}
        >
          <FontAwesomeIcon icon={faWallet} className='text-red-600 text-3xl' />
          <div className='text-bold text-2 font-bold'>View Assets</div>
        </Button>
      </div>
      <div className='flex-shrink-0'>
        <Button
          className='p-6 rounded-lg bg-white text-black-600'
          onClick={() => handleModalOpen('invoice')}
        >
          <FontAwesomeIcon icon={faFileInvoiceDollar} className='text-blue-600 text-3xl' />
          <div className='text-bold text-2 font-bold'>Invoice</div>
        </Button>
      </div>
      <div className='flex-shrink-0'>
        <Button
          className='p-6 rounded-lg bg-white text-black-600'
          onClick={() => handleModalOpen('fund')}
        >
          <FontAwesomeIcon icon={faDollarSign} className='text-green-600 text-3xl' />
          <div className='text-bold text-2 font-bold'>Fund</div>
        </Button>
      </div>
      <div className='flex-shrink-0'>
        <Button
          className='p-6 rounded-lg bg-white text-black-600'
          onClick={() => handleModalOpen('withdraw')}
        >
          <FontAwesomeIcon icon={faArrowDown} className='text-purple-600 text-3xl' />
          <div className='text-bold text-2 font-bold'>Withdraw</div>
        </Button>
      </div>
      <div className='flex-shrink-0'>
        <Button
          className='p-6 rounded-lg bg-white text-black-600'
          onClick={() => handleModalOpen('inviteFriends')}
        >
          <FontAwesomeIcon icon={faUserFriends} className='text-yellow-600 text-3xl' />
          <div className='text-bold text-2 font-bold'>Invite Friends</div>
        </Button>
      </div>
    </div>
  </section>
);

export default ActionButtons;
