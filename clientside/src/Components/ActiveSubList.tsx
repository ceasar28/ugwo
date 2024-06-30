import React, { useState } from 'react';
import ModalActive from './ModalActive'; // Assuming you have a Modal component for displaying content

const ActiveSubList: React.FC = () => {
  const [showAllModal, setShowAllModal] = useState(false);
  const [cancelledSubscriptions, setCancelledSubscriptions] = useState<number[]>([]);

  // Mock data for active subscriptions
  const activeSubscriptions = [
    {
      id: 1,
      name: 'Payment to ABC Store',
      amount: -50.0,
      date: 'June 21, 2024',
    },
    { id: 2, name: 'Salary', amount: 3000.0, date: 'June 20, 2024' },
    // Add more subscriptions as needed
    { id: 3, name: 'Subscription 3', amount: -25.0, date: 'June 19, 2024' },
    { id: 4, name: 'Subscription 4', amount: -10.0, date: 'June 18, 2024' },
    { id: 5, name: 'Subscription 5', amount: -15.0, date: 'June 17, 2024' },
    // Add more subscriptions as needed
  ];

  const handleCancelSubscription = (id: number) => {
    // Add the subscription ID to the list of cancelled subscriptions
    setCancelledSubscriptions((prev) => [...prev, id]);
  };

  const handleViewAllSubscriptions = () => {
    setShowAllModal(true);
  };

  const handleCloseModal = () => {
    setShowAllModal(false);
  };

  return (
    <section className='mt-8 w-full max-w-md'>
      <h3 className='text-h6 flex justify-between items-center m-auto text-primary-400 mb-2 text-bold text-2 font-bold'>
        <p> Active Subscriptions </p>
        {activeSubscriptions.length > 3 && (
          <button
            className='text-sm text-blue-600 mt-2'
            onClick={handleViewAllSubscriptions}
          >
            View All
          </button>
        )}
      </h3>
      <ul>
        {activeSubscriptions.slice(0, 3).map((subscription) => (
          <li key={subscription.id} className='bg-white p-4 mb-2 rounded-lg'>
            <div className='flex justify-between text-black-600'>
              <span>{subscription.name}</span>
              <span>
                {subscription.amount >= 0
                  ? `+$${subscription.amount.toFixed(2)}`
                  : `-$${Math.abs(subscription.amount).toFixed(2)}`}
              </span>
            </div>
            <span className='flex justify-between items-center m-auto'>
              <div className='text-gray-400 text-sm'>{subscription.date}</div>
              {cancelledSubscriptions.includes(subscription.id) ? (
                <button className='text-sm text-white bg-gray-600 p-2 mb-2 rounded-lg' disabled>
                  Canceled
                </button>
              ) : (
                <button
                  className='text-sm text-white bg-red-600 p-2 mb-2 rounded-lg'
                  onClick={() => handleCancelSubscription(subscription.id)}
                >
                  Cancel Subscription
                </button>
              )}
            </span>
          </li>
        ))}
      </ul>

      {/* Modal to show all subscriptions */}
      {showAllModal && (
        <ModalActive handleClose={handleCloseModal}>
          <h2 className='text-h6 text-primary-400 mb-2 text-bold text-2 font-bold'>
            All Subscriptions
          </h2>
          <div className='h-96 overflow-y-auto'>
            <ul>
              {activeSubscriptions.map((subscription) => (
                <li
                  key={subscription.id}
                  className='bg-primary-100 p-4 mb-2 rounded-lg'
                >
                  <div className='flex justify-between text-black-600'>
                    <span>{subscription.name}</span>
                    <span>
                      {subscription.amount >= 0
                        ? `+$${subscription.amount.toFixed(2)}`
                        : `-$${Math.abs(subscription.amount).toFixed(2)}`}
                    </span>
                  </div>
                  <span className='flex justify-between items-center m-auto'>
                    <div className='text-gray-400 text-sm'>{subscription.date}</div>
                    {cancelledSubscriptions.includes(subscription.id) ? (
                      <button className='text-sm text-white bg-gray-600 p-2 mb-2 rounded-lg' disabled>
                        Canceled
                      </button>
                    ) : (
                      <button
                        className='text-sm text-white bg-red-600 p-2 mb-2 rounded-lg'
                        onClick={() => handleCancelSubscription(subscription.id)}
                      >
                        Cancel Subscription
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

export default ActiveSubList;
