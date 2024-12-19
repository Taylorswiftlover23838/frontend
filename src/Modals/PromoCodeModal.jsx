import React, { useState } from "react";
import { ImExit } from "react-icons/im";
import { toast } from "react-hot-toast";
import api from '../utils/Api/axiosConfig';

export default function PromoCodeModal({ closeModal }) {
  const [promoCode, setPromoCode] = useState("");

  const handleSubmit = async () => {
    const body = { promoCode };

    if (promoCode.trim() === "") {
      toast.error("Please enter a promo code.");
      return;
    }

    try {
      const response = await api.post("/promocode", body);
      const data = response.data; 

      if (response.status === 200) {
        toast.success(data.message);  
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 flex bg-opacity-50 bg-gray-800 items-center justify-center z-50 px-4 sm:px-6 md:px-8">
      <div className="bg-white p-8 rounded-lg w-full max-w-md relative animate-drop-from-top">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900"
          onClick={closeModal}
        >
          <ImExit />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-black">
          Enter Promo Code
        </h2>

        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter promo code"
          className="w-full px-4 py-2 mt-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
        />

        <div className="flex justify-between gap-x-2">
          <button
            type="button"
            className="flex-1 bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}