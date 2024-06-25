import React from 'react';
import Button from './Button';

interface ModalProps {
  activeModal: string;
  handleModalClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ activeModal, handleModalClose }) => (
  <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20'>
    <div className='bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md'>
      <h2 className='text-h5 mb-4'>{activeModal.replace(/([A-Z])/g, ' $1').trim()}</h2>
      <p>Modal content for {activeModal.replace(/([A-Z])/g, ' $1').trim()} goes here.</p>
      {activeModal === 'viewAllFunds' && (
        <>
          <p>Using Bank Account</p>
          <p>Fund with Naira</p>
          <p>Using Other Stablecoins (swap USDT or USDC for eUSD)</p>
          <p>Using MOB (swap MOB for eUSD)</p>
        </>
      )}
      {activeModal === 'viewAllWithdrawals' && (
        <>
          <p>To Bank Account</p>
          <p>Withdraw Naira</p>
          <p>Withdraw Stablecoins</p>
        </>
      )}
      <Button className='mt-4 w-full bg-white text-black-600 py-2 px-4 hover:bg-primary-400' onClick={handleModalClose}>
        Close
      </Button>
    </div>
  </div>
);

export default Modal;
