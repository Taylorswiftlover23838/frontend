import React from "react";
import { ImExit } from "react-icons/im";


export default function CryptoModal({ closeModal }) {


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 sm:px-6 md:px-8 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md relative animate-drop-from-top">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900"
          onClick={closeModal}
        >
          <ImExit />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-black">
          Purchase via Crypto
        </h2>
      </div>
    </div>
  );
}