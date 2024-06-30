import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';

const Payment: React.FC = () => {
  const { walletAddress, amountETH } = useParams<{ walletAddress: string; amountETH: string }>();
  const [address, setAddress] = useState<string>(walletAddress || '');
  const [amount, setAmount] = useState<number>(parseFloat(amountETH) || 0);
  const navigate = useNavigate();

  useEffect(() => {
    setAddress(walletAddress || '');
    setAmount(parseFloat(amountETH) || 0);
  }, [walletAddress, amountETH]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(value);
  };

  const handleSend = (address: string, amount: number) => {
    console.log(`Sending ${amount} ETH to ${address}`);
    // Implement the send functionality here
  };

  const handleModalClose = () => {
    navigate(-1); // Navigate back
  };

  const handleSubmit = () => {
    handleSend(address, amount);
    handleModalClose();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20'>
      <div className='bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md'>
        <h2 className='text-h5 mb-4'>Send ETH</h2>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Wallet Name or Address</label>
          <input
            type='text'
            value={address}
            onChange={handleAddressChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter wallet name or address'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Amount (ETH)</label>
          <input
            type='number'
            value={amount}
            onChange={handleAmountChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter amount in ETH'
          />
        </div>
        <div className='flex justify-end'>
          <Button className='bg-gray-500 text-white py-2 px-4 rounded mr-2' onClick={handleModalClose}>
            Cancel
          </Button>
          <Button className='bg-blue-500 text-white py-2 px-4 rounded' onClick={handleSubmit}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
