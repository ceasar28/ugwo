import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';

const Invoice: React.FC = () => {
  const {
    clientName,
    clientEmail,
    vendorName,
    service,
    amount,
    currency,
    tax,
    subtotal,
    total,
    isRecurring,
    recurrenceFrequency,
  } = useParams<{
    clientName: string;
    clientEmail: string;
    vendorName: string;
    service: string;
    amount: string;
    currency: string;
    tax: string;
    subtotal: string;
    total: string;
    isRecurring: string;
    recurrenceFrequency: string;
  }>();
  
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1); // Navigate back
  };

  const handleSubmit = () => {
    console.log('Invoice sent');
    // Implement the send invoice functionality here
    handleCancel();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20'>
      <div className='bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md'>
        <h2 className='text-h5 mb-4'>Confirm Invoice Details</h2>
        <div className='mb-4'>
          <p className='text-gray-700 text-sm flex justify-between'>
            <span>Client Name:</span>
            <span>{clientName}</span>
          </p>
          <p className='text-gray-700 text-sm flex justify-between'>
            <span>Client Email:</span>
            <span>{clientEmail}</span>
          </p>
          <p className='text-gray-700 text-sm flex justify-between'>
            <span>Vendor Name:</span>
            <span>{vendorName}</span>
          </p>
          <p className='text-gray-700 text-sm flex justify-between'>
            <span>Service:</span>
            <span>{service}</span>
          </p>
          <p className='text-gray-700 text-sm flex justify-between'>
            <span>Amount:</span>
            <span>{currency} {parseFloat(amount).toFixed(2)}</span>
          </p>
          <p className='text-gray-700 text-sm flex justify-between'>
            <span>Tax %:</span>
            <span>{tax}%</span>
          </p>
          <p className='text-gray-700 text-sm flex justify-between'>
            <span>Subtotal:</span>
            <span>{currency} {parseFloat(subtotal).toFixed(2)}</span>
          </p>
          <p className='text-gray-700 text-sm font-bold flex justify-between'>
            <span>Total:</span>
            <span>{currency} {parseFloat(total).toFixed(2)}</span>
          </p>
          <p className='text-gray-700 text-sm flex justify-between'>
            <span>Recurring Payment:</span>
            <span>{isRecurring === 'true' ? 'Yes' : 'No'}</span>
          </p>
          {isRecurring === 'true' && (
            <p className='text-gray-700 text-sm flex justify-between'>
              <span>Recurrence Frequency:</span>
              <span>{recurrenceFrequency}</span>
            </p>
          )}
        </div>
        <div className='flex justify-end'>
          <Button
            className='bg-gray-500 text-white py-2 px-4 rounded mr-2'
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            className='bg-blue-500 text-white py-2 px-4 rounded'
            onClick={handleSubmit}
          >
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
