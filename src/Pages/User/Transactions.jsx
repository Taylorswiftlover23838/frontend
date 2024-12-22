import React, { useEffect, useState } from 'react';
import useAuthStore from '../../utils/ZustandStore/useAuthStore';
import Header from '../../components/header';
import { IoSettingsSharp } from 'react-icons/io5';
import useModalStore from '../../utils/ZustandStore/useModalStore';
import useDropdownStore from '../../utils/ZustandStore/useDropDownStore';
import api from '../../utils/Api/axiosConfig';
import 'react-tabs/style/react-tabs.css';
import { FaDiceFive } from 'react-icons/fa6';
import { TbCoinFilled } from 'react-icons/tb';
import { GiPokerHand } from 'react-icons/gi';
import { TbSpeakerphone } from 'react-icons/tb';
import { FaCreditCard } from 'react-icons/fa6';  

const transactionLogos = {
  Dice: <FaDiceFive className="text-xl" />,
  Blackjack: <GiPokerHand className="text-xl" />,
  CoinFlip: <TbCoinFilled className="text-xl" />,
  Promotion: <TbSpeakerphone className="text-xl" />,
  Purchase: <FaCreditCard className="text-xl" />  
};

export default function Transactions() {
  const { loggedIn } = useAuthStore();
  const { openLoginModal } = useModalStore();
  const {
    selectedTransaction,
    transactionDropdownOpen,
    toggleTransactionDropdown,
    setSelectedTransaction,
  } = useDropdownStore();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async (transactionType) => {
    const body = { transactionType };
    setLoading(true);
    try {
      const response = await api.post('/transactionsData', body);
      setTransactions(response.data.transactions);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      setTransactions([]);
      fetchTransactions(selectedTransaction);
    }
  }, [loggedIn, selectedTransaction]);

  const links = [
    { linkText: 'General', linkUrl: '/profile' },
    { linkText: 'Transactions', linkUrl: '/profile/transactions' },
  ];

  const transactionTypes = ['All', 'Dice', 'Blackjack', 'CoinFlip', 'Promotion', 'Purchase'];  // Add "Purchase" type

  const handleTransactionTypeSelect = (type) => {
    setSelectedTransaction(type);
    toggleTransactionDropdown();
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 sm:px-6">
      <div className="w-full mt-6">
        <Header title="Profile" icon={<IoSettingsSharp />} links={links} />
      </div>

      <div className="w-full max-w-screen-lg mx-auto mt-6 p-4 bg-gray-800 border-2 border-gray-700 rounded-lg flex items-center justify-start">
        <div className="relative w-40">
          <button
            onClick={toggleTransactionDropdown}
            className="text-sm sm:text-md bg-gray-700 text-white px-4 py-2 rounded-lg w-full text-left hover:bg-gray-600"
            aria-haspopup="true"
            aria-expanded={transactionDropdownOpen}
          >
            {selectedTransaction}
          </button>
          {transactionDropdownOpen && (
            <div
              className="absolute mt-2 bg-gray-700 rounded-lg shadow-lg w-full animate-drop-from-top z-10"
              role="menu"
            >
              {transactionTypes.map((type, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleTransactionTypeSelect(type);
                  }}
                  className="block px-4 py-2 text-xs sm:text-sm text-gray-200 hover:bg-gray-600 hover:text-white w-full text-left"
                  role="menuitem"
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-screen-lg mx-auto mt-4 p-6 flex flex-col justify-center items-center border-2 border-gray-700 rounded-lg bg-gray-800">
        {loggedIn ? (
          <div className="text-white w-full">
            {loading ? (
              <p className="mt-4 text-white">Loading transactions...</p>
            ) : (
              <div className="mt-4 space-y-2">
                {transactions.length > 0 ? (
                  transactions.map((transaction, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-gray-700 rounded-lg flex items-center justify-between text-sm sm:text-md text-white"
                    >
                      <span className="flex items-center justify-center w-8 h-8 mr-4">
                        {transactionLogos[transaction.kind]}  
                      </span>

                      <span className="flex-[2] text-left font-bold">
                        {`${transaction.kind} - ${transaction.action}`}
                      </span>

                      <span
                        className={`flex-1 text-right font-bold ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                          }`}
                      >
                        {transaction.amount > 0
                          ? `+$${transaction.amount}`
                          : `-$${Math.abs(transaction.amount)}`}
                      </span>

                      <span className="flex-1 text-right font-bold">${transaction.balance}</span>

                      <span className="flex-1 text-right font-bold text-gray-300">
                        {transaction.timestamp}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="mt-4 text-white">No transactions available.</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center bg-gray-900 p-8 space-y-6 rounded-lg">
            <h1 className="text-3xl font-bold text-red-600">Login Required</h1>
            <p className="text-lg text-white">
              You need to log in to view your transactions.
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg"
              onClick={openLoginModal}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
