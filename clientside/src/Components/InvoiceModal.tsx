import React, { useState } from 'react';
import Button from './Button';

interface InvoiceModalProps {
  handleModalClose: () => void;
  conversionRates: { [key: string]: number };
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  handleModalClose,
  conversionRates,
}) => {
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [vendorName, setVendorName] = useState<string>('');
  const [service, setService] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('ETH');
  const [tax, setTax] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [recurrenceFrequency, setRecurrenceFrequency] =
    useState<string>('daily');
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(value);
    calculateTotal(value, tax, currency);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
    calculateTotal(amount, tax, e.target.value);
  };

  const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setTax(value);
    calculateTotal(amount, value, currency);
  };

  const calculateTotal = (amount: number, tax: number, currency: string) => {
    const subtotal = amount;
    const taxAmount = (amount * tax) / 100;
    const total = subtotal + taxAmount;
    setSubtotal(subtotal * conversionRates[currency]);
    setTotal(total * conversionRates[currency]);
  };

  const handleSubmit = () => {
    const invoiceData = {
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
      recurrenceFrequency: isRecurring ? recurrenceFrequency : 'none',
    };

    console.log(invoiceData);
    setShowConfirmationModal(false);
    handleModalClose();
  };

  const handleConfirm = () => {
    setShowConfirmationModal(true);
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
  };

  return (
    <>
      <div className='relative w-full max-w-md bg-black bg-opacity-50 flex items-center justify-center m-auto mt-[-25rem] mb-1'>
        <div className='bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md'>
          <h2 className='text-h5 mb-4'>Create Invoice</h2>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Client Name
            </label>
            <input
              type='text'
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter client name'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Client Email
            </label>
            <input
              type='email'
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter client email'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Vendor Name (Optional)
            </label>
            <input
              type='text'
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter vendor name'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Service
            </label>
            <input
              type='text'
              value={service}
              onChange={(e) => setService(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter service description'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Amount
            </label>
            <input
              type='number'
              value={amount}
              onChange={handleAmountChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter amount'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Currency
            </label>
            <select
              value={currency}
              onChange={handleCurrencyChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            >
              {Object.keys(conversionRates).map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Tax %
            </label>
            <input
              type='number'
              value={tax}
              onChange={handleTaxChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter tax percentage'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Recurring Payment
            </label>
            <button
              className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                isRecurring ? 'bg-blue-500' : 'bg-gray-500'
              }`}
              onClick={() => setIsRecurring(!isRecurring)}
            >
              {isRecurring ? 'Yes' : 'No'}
            </button>
          </div>
          {isRecurring && (
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Recurrence Frequency
              </label>
              <select
                value={recurrenceFrequency}
                onChange={(e) => setRecurrenceFrequency(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              >
                <option value='daily'>Daily</option>
                <option value='weekly'>Weekly</option>
                <option value='monthly'>Monthly</option>
                <option value='yearly'>Yearly</option>
              </select>
            </div>
          )}
          <div className='mb-4'>
            <p className='text-gray-700 text-sm flex justify-between'>
              <span>Subtotal:</span>
              <span>
                {currency} {subtotal.toFixed(2)}
              </span>
            </p>
            <p className='text-gray-700 text-sm font-bold flex justify-between'>
              <span>Total:</span>
              <span>
                {currency} {total.toFixed(2)}
              </span>
            </p>
          </div>
          <div className='flex justify-end'>
            <Button
              className='bg-gray-500 text-white py-2 px-4 rounded mr-2'
              onClick={handleModalClose}
            >
              Cancel
            </Button>
            <Button
              className='bg-blue-500 text-white py-2 px-4 rounded'
              onClick={handleConfirm}
            >
              Create Invoice
            </Button>
          </div>
        </div>
      </div>

      {showConfirmationModal && (
        <div className='relative w-full max-w-md bg-black bg-opacity-50 flex items-center justify-center m-auto mt-[-30rem]'>
          <div className='bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md'>
            <h2 className='text-h5 mb-4'>Confirm Invoice Details</h2>
            <div className='mb-4'>
              <p className='text-gray-700 text-sm flex justify-between'>
                <span>Client Name:</span>
                <span>{clientName}</span>
              </p>
              <p
                className='text-gray-700 text-sm flex justify-between'
              >
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
                <span>
                  {currency} {amount.toFixed(2)}
                </span>
              </p>
              <p className='text-gray-700 text-sm flex justify-between'>
                <span>Tax %:</span>
                <span>{tax}%</span>
              </p>
              <p className='text-gray-700 text-sm flex justify-between'>
                <span>Subtotal:</span>
                <span>
                  {currency} {subtotal.toFixed(2)}
                </span>
              </p>
              <p className='text-gray-700 text-sm font-bold flex justify-between'>
                <span>Total:</span>
                <span>
                  {currency} {total.toFixed(2)}
                </span>
              </p>
              <p className='text-gray-700 text-sm flex justify-between'>
                <span>Recurring Payment:</span>
                <span>{isRecurring ? 'Yes' : 'No'}</span>
              </p>
              {isRecurring && (
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
                Send Invoice
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InvoiceModal;
