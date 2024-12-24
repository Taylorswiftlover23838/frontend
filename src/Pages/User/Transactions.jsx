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
import { formatDate } from '../../utils/formatDate';
import { BsWechat } from "react-icons/bs";
import { SiCashapp } from "react-icons/si";
import { FaCcAmazonPay } from "react-icons/fa";

const transactionLogos = {
  Dice: <FaDiceFive className="text-xl" />,
  Blackjack: <GiPokerHand className="text-xl" />,
  CoinFlip: <TbCoinFilled className="text-xl" />,
  Promotion: <TbSpeakerphone className="text-xl" />,
  Purchase: {
    card: <FaCreditCard className="text-xl" />,
    amazon_pay: <FaCcAmazonPay className="text-xl" />,
    wechat_pay: <BsWechat className="text-xl" />,
    cashapp: <SiCashapp className="text-xl" />
  }
};

export default function Transactions() {
  const { loggedIn } = useAuthStore();
  const { openLoginModal } = useModalStore();
  const { openTransactionModal } = useModalStore();
  const {
    selectedTransaction,
    transactionDropdownOpen,
    toggleTransactionDropdown,
    setSelectedTransaction,
  } = useDropdownStore();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const links = [
    { linkText: 'General', linkUrl: '/profile' },
    { linkText: 'Transactions', linkUrl: '/profile/transactions' },
  ];

  const transactionTypes = ['All', 'Dice', 'Blackjack', 'CoinFlip', 'Promotion', 'Purchase'];
  const limit = 10;

  const fetchTransactions = async (transactionType, page) => {
    const body = { transactionType, page };
    setLoading(true);
    try {
      const response = await api.post('/transactionsData', body);
      if (response.data.transactions.length === 0) {
        console.log('No transactions found.');
      }
      setTransactions(response.data.transactions);
      setTransactionCount(response.data.transactionCount);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      setTransactions([]);
      fetchTransactions(selectedTransaction, currentPage);
    }
  }, [loggedIn, selectedTransaction, currentPage]);

  const handleTransactionTypeSelect = (type) => {
    setSelectedTransaction(type);
    setCurrentPage(1); 
    toggleTransactionDropdown();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(transactionCount / limit);

  const renderTransactionLogo = (transaction) => {
    return transaction.kind === 'Purchase'
      ? transactionLogos.Purchase[transaction.action]
      : transactionLogos[transaction.kind];
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 sm:px-6">
      <Header title="Profile" icon={<IoSettingsSharp />} links={links} />

      {/* Dropdown Section */}
      <div className="w-full max-w-screen-lg mx-auto mt-6 p-6 bg-gray-800 border-2 border-gray-700 rounded-lg flex justify-start items-center">
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
            <div className="absolute mt-2 bg-gray-700 rounded-lg shadow-lg w-full animate-drop-from-top z-10">
              {transactionTypes.map((type, index) => (
                <button
                  key={index}
                  onClick={() => handleTransactionTypeSelect(type)}
                  className="block px-4 py-2 text-xs sm:text-sm text-gray-200 hover:bg-gray-600 hover:text-white w-full text-left"
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full max-w-screen-lg mx-auto mt-4 p-6 flex flex-col border-2 border-gray-700 rounded-lg bg-gray-800">
        {loggedIn ? (
          <div className="text-white w-full">
            {loading ? (
              <p className="mt-4 text-center text-white">Loading transactions...</p>
            ) : (
              <>
                {transactions.length === 0 ? (
                  <p className="mt-4 text-center text-gray-400">No transactions found.</p>
                ) : (
                  <div className="mt-4 space-y-2">
                    {transactions.map((transaction, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-gray-700 rounded-lg text-xs sm:text-sm lg:text-md text-white cursor-pointer hover:bg-gray-600 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0"
                        onClick={() => openTransactionModal(transaction)}
                      >
                        <div className="flex items-center justify-start space-x-2 flex-shrink-0">
                          <span className="flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8">
                            {renderTransactionLogo(transaction)}
                          </span>
                          <span className="font-semibold">
                            {`${transaction.kind} - ${transaction.action}`}
                          </span>
                        </div>

                        <div className="flex flex-wrap justify-between sm:justify-end items-center sm:space-x-4 w-full">
                          <span
                            className={`font-bold ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}
                          >
                            {transaction.amount > 0
                              ? `+$${transaction.amount}`
                              : `-$${Math.abs(transaction.amount)}`}
                          </span>
                          <span className="font-bold">${transaction.balance}</span>
                          <span className="text-gray-300">{formatDate(transaction.timestamp)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center bg-gray-900 p-8 space-y-6 rounded-lg">
            <h1 className="text-3xl font-bold text-red-600">Login Required</h1>
            <p className="text-lg text-white">You need to log in to view your transactions.</p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg"
              onClick={openLoginModal}
            >
              Login
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {transactionCount > 0 && (
          <div className="mt-4 flex justify-center items-center space-x-4 ">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-lg ${currentPage === 1
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-500'
                }`}
            >
              Previous
            </button>
            <span className="text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-lg ${currentPage === totalPages
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-500'
                }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
