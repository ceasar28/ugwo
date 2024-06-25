import React, { useState } from 'react';
import Button from './Button';

interface InvoiceModalProps {
  handleModalClose: () => void;
  conversionRates: { [key: string]: number };
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ handleModalClose, conversionRates }) => {
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [vendorName, setVendorName] = useState<string>('');
  const [service, setService] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('ETH');
  const [tax, setTax] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

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
    // Implement invoice submission logic here
    console.log({
      clientName,
      clientEmail,
      vendorName,
      service,
      amount,
      currency,
      tax,
      subtotal,
      total,
    });
    handleModalClose();
  };

  return (
    <div className='absolute w-full max-w-md bg-black bg-opacity-50 flex items-center justify-center m-auto'>
      <div className='bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md'>
        <h2 className='text-h5 mb-4'>Create Invoice</h2>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Client Name</label>
          <input
            type='text'
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter client name'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Client Email</label>
          <input
            type='email'
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter client email'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Vendor Name (Optional)</label>
          <input
            type='text'
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter vendor name'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Service</label>
          <input
            type='text'
            value={service}
            onChange={(e) => setService(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter service description'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Amount</label>
          <input
            type='number'
            value={amount}
            onChange={handleAmountChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter amount'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Currency</label>
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
          <label className='block text-gray-700 text-sm font-bold mb-2'>Tax %</label>
          <input
            type='number'
            value={tax}
            onChange={handleTaxChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter tax percentage'
          />
        </div>
        <div className='mb-4'>
          <p className='text-gray-700 text-sm'>
            Subtotal: {currency} {subtotal.toFixed(2)}
          </p>
          <p className='text-gray-700 text-sm'>
            Total: {currency} {total.toFixed(2)}
          </p>
        </div>
        <div className='flex justify-end'>
          <Button className='bg-gray-500 text-white py-2 px-4 rounded mr-2' onClick={handleModalClose}>
            Cancel
          </Button>
          <Button className='bg-blue-500 text-white py-2 px-4 rounded' onClick={handleSubmit}>
            Create Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
