import React, { useState } from 'react';
import { ImExit } from "react-icons/im";
import { loadStripe } from "@stripe/stripe-js";
import api from "../utils/Api/axiosConfig";
import { toast } from "react-hot-toast";
import { FaCcStripe } from "react-icons/fa6";

const PaymentOptionsModal = ({ option, onClose }) => {

    const [amount, setAmount] = useState("");

    const makePayment = async (amount) => {
        const stripe = await loadStripe("pk_test_51QYejSF5mQZW1Wy5oBX8D2EUw6YEW6gbegoKt9PfWipespqo2VHtcU7cSw6KbiaEJf9TwlNktV41pXx5u9rlvRML00xNpbfnHs");

        try {
            const response = await api.post("/stripe/create-checkout-session", { amount });
            const { id } = response.data;

            const result = await stripe.redirectToCheckout({
                sessionId: id,
            });

            if (result.error) {
                console.error(result.error);
            }
        } catch (error) {
            console.error("Payment failed:", error);
        }
    };

    const handlePayment = () => {
        const parsedAmount = parseInt(amount, 10);
    
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            toast.error("Please enter a valid amount.");
        } else if (parsedAmount < 5) {
            toast.error("The minimum payment amount is $5.");
        } else {
            makePayment(parsedAmount);
        }
    };
    

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6 md:px-8">
            <div className="p-8 bg-white rounded-lg w-full max-w-md relative shadow-lg transform transition-all animate-drop-from-top">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl text-gray-800 hover:text-gray-600"
                >
                    <ImExit />
                </button>

                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-gray-100 rounded-full">
                        {option.icon} 
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Purchase via {option.label}
                </h2>

                <div className="space-y-4 text-sm text-gray-700 text-center">
                    <p>{option.description}</p> 
                </div>

                <div className="flex justify-center mb-4">
                    <input
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="px-4 py-2 rounded border border-gray-300 text-gray-800 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-center mb-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-200"
                        onClick={handlePayment}
                    >
                        Make Payment
                    </button>
                </div>

                <div className="flex justify-center items-center mt-4 space-x-2">
                    <p className="text-center text-xl">Powered by</p>
                    <FaCcStripe className=" text-4xl" />
                </div>
            </div>
        </div>
    );
};

export default PaymentOptionsModal;
