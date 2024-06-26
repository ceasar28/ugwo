import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Button from './Button';

interface RequestModalProps {
  handleModalClose: () => void;
  walletName: string;
  walletAddress: string;
  availableBalance: number; // Add availableBalance prop
  conversionRates: { [key: string]: number };
}

const RequestModal: React.FC<RequestModalProps> = ({
  handleModalClose,
  walletName,
  walletAddress,
  availableBalance,
}) => {
  const [step, setStep] = useState<number>(1);
  const [amount, setAmount] = useState<number>(0);
  const [note, setNote] = useState<string>('');

  const transferFeeRate = 0.01; // 1% transfer fee
  const transferFee = amount * transferFeeRate;
  const totalCost = amount + transferFee;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const handleNextStep = () => {
    setStep(2);
  };

  /*   const handleCopyLink = () => {
    const shareableLink = `http://example.com/request/${walletAddress}/${amount}/${note}`;
    navigator.clipboard.writeText(shareableLink).then(() => {
      alert('Link copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy the link.');
    });
  }; */

  const truncatedNote = note.length > 20 ? `${note.substring(0, 20)}...` : note;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20'>
      <div className='bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md'>
        {step === 1 ? (
          <>
            <h2 className='text-h5 mb-4'>Request Payment</h2>
            <div className='mb-4'>
              <p className='text-gray-700 text-sm font-bold'>
                Available Balance: ETH {availableBalance.toFixed(4)}
              </p>
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Amount (ETH)
              </label>
              <input
                type='number'
                value={amount}
                onChange={handleAmountChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Enter amount to request'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Note (optional)
              </label>
              <input
                type='text'
                value={note}
                onChange={handleNoteChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Enter a summary note'
              />
            </div>
            <div className='mb-4'>
              <p className='text-gray-700 text-sm flex justify-between'>
                <span>Transfer Fee:</span>{' '}
                <span>ETH {transferFee.toFixed(4)}</span>
              </p>
              <p className='text-gray-700 text-sm font-bold flex justify-between'>
                <span>Total Cost:</span> <span>ETH {totalCost.toFixed(4)}</span>
              </p>
            </div>
            <div className='flex justify-end gap-2'>
            <Button
                className='bg-blue-500 text-white py-2 px-4 rounded'
                onClick={handleModalClose}
              >
                Cancle
              </Button>
              <Button
                className='bg-blue-500 text-white py-2 px-4 rounded'
                onClick={handleNextStep}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <>
            <h2 className='text-h5 mb-4'>Request Payment</h2>
            <div className='mb-4 flex justify-center'>
              <QRCode
                value={`${walletAddress},${totalCost},${truncatedNote}`}
                size={200}
              />
            </div>
            <div className='mb-4 text-center'>
              <p className='text-gray-700 text-sm font-bold'>{walletName}</p>
              <p className='text-gray-700 text-sm'>{walletAddress}</p>
            </div>
            <div className='mb-4 text-center'>
              <p className='text-gray-700 text-sm'>
                Total Amount: ETH {totalCost.toFixed(4)}
              </p>
              <p className='text-gray-700 text-sm'>Note: {truncatedNote}</p>
            </div>
            <div className='mb-4 text-center flex justify-center items-center'>
              <p className='text-gray-700 text-sm'>
                Shareable Link:{' '}
                <a
                  href={`http://example.com/request/${walletAddress}/${totalCost}/${truncatedNote}`}
                  className='text-blue-500'
                >{`http://example.com/request/${walletAddress}/${totalCost}/${truncatedNote}`}</a>
              </p>
              {/*  <button
                onClick={handleCopyLink}
                className='ml-2 text-gray-700 text-sm font-bold border border-gray-700 rounded px-2 py-1'
              >
                Copy
              </button> */}
            </div>
            <div className='flex justify-end'>
              <Button
                className='bg-gray-500 text-white py-2 px-4 rounded mr-2'
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className='bg-blue-500 text-white py-2 px-4 rounded'
                onClick={handleModalClose}
              >
                Close
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestModal;
