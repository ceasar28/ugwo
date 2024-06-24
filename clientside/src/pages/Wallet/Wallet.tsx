import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faChevronDown,
  faWallet,
  faFileInvoiceDollar,
  faDollarSign,
  faArrowDown,
  faUserFriends,
  faBank,
  faCoins,
  faExchangeAlt,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../Components/Button';

const Dashboard: React.FC = () => {
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const [ethValue, setEthValue] = useState<string>('0');
  const [showCurrencyOptions, setShowCurrencyOptions] =
    useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const balanceUSD = 4500.0;
  const conversionRates: { [key: string]: number } = {
    USD: 1,
    NGN: 500,
    GBP: 0.75,
    EUR: 0.85,
  };

  const getConvertedBalance = (): string => {
    return (balanceUSD * conversionRates[selectedCurrency]).toFixed(2);
  };

  useEffect(() => {
    const fetchEthValue = async () => {
      const rate = await getEthConversionRate();
      setEthValue((balanceUSD / rate).toFixed(4));
    };
    fetchEthValue();
  }, []);

  const getEthConversionRate = async (): Promise<number> => {
    // Simulate an API call
    return 2000;
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

  const handleModalOpen = (modalName: string): void => {
    setActiveModal(modalName);
  };

  const handleModalClose = (): void => {
    setActiveModal(null);
  };

  return (
    <div className='min-h-screen bg-primary-100 font-Inter'>
      <main className='p-6 flex flex-col items-center'>
        <section className='bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md text-center'>
          <div className='flex justify-between w-full'>
            <div className=' justify-between gap-20 ss:gap-[180px] items-center m-auto'>
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
                      <div
                        className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                        onClick={() => handleCurrencyChange('USD')}
                      >
                        USD (USD)
                      </div>
                      <div
                        className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                        onClick={() => handleCurrencyChange('NGN')}
                      >
                        Naira (NGN)
                      </div>
                      <div
                        className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                        onClick={() => handleCurrencyChange('GBP')}
                      >
                        Pound (GBP)
                      </div>
                      <div
                        className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                        onClick={() => handleCurrencyChange('EUR')}
                      >
                        Euro (EUR)
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={toggleBalanceVisibility}
                className='text-black-400'
              >
                <FontAwesomeIcon
                  icon={showBalance ? faEyeSlash : faEye}
                  className='ml-2 mb-2'
                />
              </button>
            </div>
          </div>
          <div className='relative flex justify-center items-center'>
            <div className="text-2xl font-semibold font-['Inter'] text-primary-600">
              {showBalance
                ? `${selectedCurrency} ${getConvertedBalance()}`
                : '•••••'}
            </div>
          </div>
          <div className='text-h6 text-gray-400 mb-4'>
            {showBalance ? `${ethValue} ETH` : ''}
          </div>
          <div className='flex justify-between w-full '>
            <Button
              className='w-[100px] ss:w-[180px] p-6 rounded-lg bg-primary-600 text-white py-2 px-4 hover:bg-primary-400'
              onClick={() => {}} // Provide a default onClick handler if needed
            >
              Send
            </Button>
            <Button
              className='w-[100px] ss:w-[180px] p-6 rounded-lg max-w-md bg-primary-600 text-white py-2 px-4 hover:bg-primary-400'
              onClick={() => {}} // Provide a default onClick handler if needed
            >
              Request
            </Button>
          </div>
        </section>

        <section className='mt-8 w-full max-w-md'>
          <div className='flex overflow-x-auto space-x-4 pb-4 m-3'>
            <div className='flex-shrink-0'>
              <Button
                className='p-6 rounded-lg bg-white text-black'
                onClick={() => handleModalOpen('viewAssets')}
              >
                <FontAwesomeIcon
                  icon={faWallet}
                  className='text-red-600 text-3xl'
                />
                <div className='text-bold text-2 font-bold'>View Assets</div>
              </Button>
            </div>
            <div className='flex-shrink-0'>
              <Button
                className='p-6 rounded-lg bg-white text-black'
                onClick={() => handleModalOpen('invoice')}
              >
                <FontAwesomeIcon
                  icon={faFileInvoiceDollar}
                  className='text-blue-600 text-3xl'
                />
                <div className='text-bold text-2 font-bold'>Invoice</div>
              </Button>
            </div>
            <div className='flex-shrink-0'>
              <Button
                className='p-6 rounded-lg bg-white text-black'
                onClick={() => handleModalOpen('fund')}
              >
                <FontAwesomeIcon
                  icon={faDollarSign}
                  className='text-green-600 text-3xl'
                />
                <div className='text-bold text-2 font-bold'>Fund</div>
              </Button>
            </div>
            <div className='flex-shrink-0'>
              <Button
                className='p-6 rounded-lg bg-white text-black'
                onClick={() => handleModalOpen('withdraw')}
              >
                <FontAwesomeIcon
                  icon={faArrowDown}
                  className='text-purple-600 text-3xl'
                />
                <div className='text-bold text-2 font-bold'>Withdraw</div>
              </Button>
            </div>
            <div className='flex-shrink-0'>
              <Button
                className='p-6 rounded-lg bg-white text-black'
                onClick={() => handleModalOpen('inviteFriends')}
              >
                <FontAwesomeIcon
                  icon={faUserFriends}
                  className='text-yellow-600 text-3xl'
                />
                <div className='text-bold text-2 font-bold'>Invite Friends</div>
              </Button>
            </div>
          </div>
        </section>

        <section className='mt-8 bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md text-center'>
          <div className='flex justify-between'>
            <h3 className='text-h6 text-primary-400 mb-2 text-bold text-2 font-bold'>
              Fund Account
            </h3>

            <Button
               className='text-bold text-2 font-bold'
              onClick={() => handleModalOpen('viewAllFunds')}
            >
              View All
            </Button>

           {/*  <Button onClick={() => handleModalOpen('viewAllFunds')}>
              <div className='text-bold text-2 font-bold'>View All</div>
            </Button> */}

          </div>
          <div className='flex overflow-x-auto space-x-4 pb-4'>
            <div className='flex-grow'>
              <Button
                className='w-full p-6 rounded-lg bg-white text-black flex items-center justify-center'
                onClick={() => handleModalOpen('fundBankAccount')}
              >
                <FontAwesomeIcon icon={faBank} className='mr-2' />
                <div className='text-bold text-2 font-bold'>
                  Using Bank Account
                </div>
              </Button>
            </div>
            <div className='flex-grow'>
              <Button
                className='w-full p-6 rounded-lg bg-white text-black flex items-center justify-center'
                onClick={() => handleModalOpen('fundNaira')}
              >
                <FontAwesomeIcon icon={faCoins} className='mr-2' />
                <div className='text-bold text-2 font-bold'>
                  Fund with Naira
                </div>
              </Button>
            </div>
            <div className='flex-grow'>
              <Button
                className='w-full p-6 rounded-lg bg-white text-black flex items-center justify-center'
                onClick={() => handleModalOpen('fundStablecoins')}
              >
                <FontAwesomeIcon icon={faExchangeAlt} className='mr-2' />
                <div className='text-bold text-2 font-bold'>
                  Using Other Stablecoins
                </div>
              </Button>
            </div>
          </div>
        </section>

        <section className='mt-8 bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md text-center'>
          <div className='flex justify-between'>
            <h3 className='text-h6 text-primary-400 mb-2 text-bold text-2 font-bold'>
              Withdraw Funds
            </h3>
            <Button
               className='text-bold text-2 font-bold'
              onClick={() => handleModalOpen('viewAllFunds')}
            >
              View All
            </Button>
          </div>
          <div className='flex overflow-x-auto space-x-4 pb-4'>
            <div className='flex-shrink-0'>
              <Button
                className='p-6 rounded-lg bg-white text-black'
                onClick={() => handleModalOpen('withdrawBankAccount')}
              >
                <FontAwesomeIcon icon={faBank} />
                <div className='text-bold text-2 font-bold'>
                  To Bank Account
                </div>
              </Button>
            </div>
            <div className='flex-shrink-0'>
              <Button
                className='p-6 rounded-lg bg-white text-black'
                onClick={() => handleModalOpen('withdrawNaira')}
              >
                <FontAwesomeIcon icon={faCoins} />
                <div className='text-bold text-2 font-bold'>Withdraw Naira</div>
              </Button>
            </div>
            <div className='flex-shrink-0'>
              <Button
                className='p-6 rounded-lg bg-white text-black'
                onClick={() => handleModalOpen('withdrawStablecoins')}
              >
                <FontAwesomeIcon icon={faExchangeAlt} />
                <div className='text-bold text-2 font-bold'>
                  Withdraw Stablecoins
                </div>
              </Button>
            </div>
          </div>
        </section>

        <section className='mt-8 w-full max-w-md'>
          <h3 className='text-h6 text-primary-400 mb-2 text-bold text-2 font-bold'>
            Recent Transactions
          </h3>
          <ul>
            <li className='bg-primary-600 p-4 mb-2 rounded-lg'>
              <div className='flex justify-between text-white'>
                <span>Payment to ABC Store</span>
                <span>-$50.00</span>
              </div>
              <div className='text-gray-400 text-sm'>June 21, 2024</div>
            </li>
            <li className='bg-primary-600 p-4 mb-2 rounded-lg'>
              <div className='flex justify-between text-white'>
                <span>Salary</span>
                <span>+$3,000.00</span>
              </div>
              <div className='text-gray-400 text-sm'>June 20, 2024</div>
            </li>
            {/* Add more transactions as needed */}
          </ul>
        </section>
      </main>

      {activeModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20'>
          <div className='bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md'>
            <h2 className='text-h5 mb-4'>
              {activeModal.replace(/([A-Z])/g, ' $1').trim()}
            </h2>
            <p>
              Modal content for {activeModal.replace(/([A-Z])/g, ' $1').trim()}{' '}
              goes here.
            </p>
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
            <Button
              className='mt-4 w-full bg-white text-black py-2 px-4 hover:bg-primary-400'
              onClick={handleModalClose}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
