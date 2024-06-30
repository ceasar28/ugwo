import React, { useState } from 'react';
import ModalActive from './ModalActive'; // Assuming you have a Modal component for displaying content

const PaymentPlans: React.FC = () => {
  const [showAllModal, setShowAllModal] = useState(false);
  const [cancelledPayments, setCancelledPayments] = useState<number[]>([]);

  // Mock data for active payments
  const activePayments = [
    {
      id: 1,
      name: 'Payment to ABC Store',
      amount: -50.0,
      date: 'June 21, 2024',
    },
    { id: 2, name: 'Salary', amount: 3000.0, date: 'June 20, 2024' },
    // Add more payments as needed
    { id: 3, name: 'Payment 3', amount: -25.0, date: 'June 19, 2024' },
    { id: 4, name: 'Payment 4', amount: -10.0, date: 'June 18, 2024' },
    { id: 5, name: 'Payment 5', amount: -15.0, date: 'June 17, 2024' },
    // Add more payments as needed
  ];

  const handleCancelPayment = (id: number) => {
    // Add the payment ID to the list of cancelled payments
    setCancelledPayments((prev) => [...prev, id]);
  };

  const handleViewAllPayments = () => {
    setShowAllModal(true);
  };

  const handleCloseModal = () => {
    setShowAllModal(false);
  };

  return (
    <section className='mt-8 w-full max-w-md'>
      <h3 className='text-h6 flex justify-between items-center m-auto text-primary-400 mb-2 text-bold text-2 font-bold'>
        <p> Active Payments </p>
        {activePayments.length > 3 && (
          <button
            className='text-sm text-blue-600 mt-2'
            onClick={handleViewAllPayments}
          >
            View All
          </button>
        )}
      </h3>
      <ul>
        {activePayments.slice(0, 3).map((payment) => (
          <li key={payment.id} className='bg-primary-600 p-4 mb-2 rounded-lg'>
            <div className='flex justify-between text-white'>
              <span>{payment.name}</span>
              <span>
                {payment.amount >= 0
                  ? `+$${payment.amount.toFixed(2)}`
                  : `-$${Math.abs(payment.amount).toFixed(2)}`}
              </span>
            </div>
            <span className='flex justify-between items-center m-auto'>
              <div className='text-gray-400 text-sm'>{payment.date}</div>
              {cancelledPayments.includes(payment.id) ? (
                <button className='text-sm text-white bg-gray-600 p-2 mb-2 rounded-lg' disabled>
                  Canceled
                </button>
              ) : (
                <button
                  className='text-sm text-white bg-red-600 p-2 mb-2 rounded-lg'
                  onClick={() => handleCancelPayment(payment.id)}
                >
                  Cancel Payment
                </button>
              )}
            </span>
          </li>
        ))}
      </ul>

      {/* Modal to show all payments */}
      {showAllModal && (
        <ModalActive handleClose={handleCloseModal}>
          <h2 className='text-h6 text-primary-400 mb-2 text-bold text-2 font-bold'>
            All Payments
          </h2>
          <div className='h-96 overflow-y-auto'>
            <ul>
              {activePayments.map((payment) => (
                <li
                  key={payment.id}
                  className='bg-primary-600 p-4 mb-2 rounded-lg'
                >
                  <div className='flex justify-between text-white'>
                    <span>{payment.name}</span>
                    <span>
                      {payment.amount >= 0
                        ? `+$${payment.amount.toFixed(2)}`
                        : `-$${Math.abs(payment.amount).toFixed(2)}`}
                    </span>
                  </div>
                  <span className='flex justify-between items-center m-auto'>
                    <div className='text-gray-400 text-sm'>{payment.date}</div>
                    {cancelledPayments.includes(payment.id) ? (
                      <button className='text-sm text-white bg-gray-600 p-2 mb-2 rounded-lg' disabled>
                        Canceled
                      </button>
                    ) : (
                      <button
                        className='text-sm text-white bg-red-600 p-2 mb-2 rounded-lg'
                        onClick={() => handleCancelPayment(payment.id)}
                      >
                        Cancel Payment
                      </button>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ModalActive>
      )}
    </section>
  );
};

export default PaymentPlans;
