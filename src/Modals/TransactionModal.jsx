import React from 'react';
import { ImExit } from "react-icons/im";

export default function TransactionModal({ transaction, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6 md:px-8">
      <div className="p-8 bg-white rounded-lg w-full max-w-md relative animate-drop-from-top shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900"
        >
          <ImExit />
        </button>

        <h2 className="text-3xl font-semibold mb-6 text-center text-black">Transaction Details</h2>
        
        <div className="space-y-4 text-sm text-black">
          <p><strong>ID:</strong> {transaction.transaction_id}</p>
          <p><strong>Kind:</strong> {transaction.kind}</p>
          <p><strong>Action:</strong> {transaction.action}</p>
          <p><strong>Amount:</strong> {transaction.amount}</p>
          <p><strong>Balance:</strong> {transaction.balance}</p>
          <p><strong>Date:</strong> {transaction.timestamp}</p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
