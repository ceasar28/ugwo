import React from 'react';

interface ModalProps {
  handleClose: () => void;
  children: React.ReactNode;
}

const ModalActive: React.FC<ModalProps> = ({ handleClose, children }) => {
  return (
    <div className='relative inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 mt-[-20rem] mb-1'>
      <div className='bg-white p-6 rounded-lg shadow-4xl'>
        {children}
        <div className='flex justify-end mt-4'>
          <button
            className='text-sm text-blue-600 underline'
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalActive;
