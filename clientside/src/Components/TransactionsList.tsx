import React from 'react';

const TransactionsList: React.FC = () => (
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
);

export default TransactionsList;
