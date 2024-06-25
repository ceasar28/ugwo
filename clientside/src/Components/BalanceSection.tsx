import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Button from '../Components/Button';

interface BalanceSectionProps {
  balanceUSD: number;
  ethValue: string;
  conversionRates: { [key: string]: number };
}

const BalanceSection: React.FC<BalanceSectionProps> = ({ balanceUSD, ethValue, conversionRates }) => {
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const [showCurrencyOptions, setShowCurrencyOptions] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  const getConvertedBalance = (): string => {
    return (balanceUSD * conversionRates[selectedCurrency]).toFixed(2);
  };

  const toggleBalanceVisibility = (): void => {
    setShowBalance(!showBalance);
  };

  const toggleCurrencyOptions = (): void => {
    setShowCurrencyOptions(!showCurrencyOptions);
  };

  const handleCurrencyChange = (currency: string): void => {
    setSelectedCurrency(currency);
    setShowCurrencyOptions(false);
  };

  return (
    <section className='bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md text-center'>
      <div className='flex justify-between w-full'>
        <div className='flex justify-center items-center m-auto'>
          <h2 className='text-h5 mb-4'>Balance</h2>
          <div className='relative'>
            <FontAwesomeIcon
              icon={faChevronDown}
              className='ml-2 mb-3 cursor-pointer'
              onClick={toggleCurrencyOptions}
            />
            {showCurrencyOptions && (
              <div className='absolute bg-primary-100 w-[200px] border rounded shadow-lg mt-0 left-[-130px] z-10'>
                {Object.keys(conversionRates).map(currency => (
                  <div
                    key={currency}
                    className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                    onClick={() => handleCurrencyChange(currency)}
                  >
                    {currency} ({currency})
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button onClick={toggleBalanceVisibility} className='text-black-400'>
          <FontAwesomeIcon icon={showBalance ? faEyeSlash : faEye} className='ml-2 mb-2' />
        </button>
      </div>
      <div className='relative flex justify-center items-center'>
        <div className="text-2xl font-semibold font-['Inter'] text-primary-600">
          {showBalance ? `${selectedCurrency} ${getConvertedBalance()}` : '•••••'}
        </div>
      </div>
      <div className='text-h6 text-gray-400 mb-4'>
        {showBalance ? `${ethValue} ETH` : ''}
      </div>
      <div className='flex justify-between w-full max-w-md text-center mt-2'>
          <Button className='w-[100px] ss:w-[180px] p-6 rounded-lg bg-primary-600 text-white py-2 px-4 hover:bg-primary-400' onClick={() => {}}>
            Send
          </Button>
          <Button className='w-[100px] ss:w-[180px] p-6 rounded-lg bg-primary-600 text-white py-2 px-4 hover:bg-primary-400' onClick={() => {}}>
            Request
          </Button>
        </div>
    </section>
  );
};

export default BalanceSection;
