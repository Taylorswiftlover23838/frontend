import React, { useState } from "react";
import Header from "../components/header";
import { IoIosHome } from "react-icons/io";
import { loadStripe } from "@stripe/stripe-js";
import api from "../utils/Api/axiosConfig";

const makePayment = async (amount) => {
    const stripe = await loadStripe("pk_test_51QYejSF5mQZW1Wy5oBX8D2EUw6YEW6gbegoKt9PfWipespqo2VHtcU7cSw6KbiaEJf9TwlNktV41pXx5u9rlvRML00xNpbfnHs");

    try {
        const response = await api.post("/create-checkout-session", { amount });
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

export default function Home() {
    const [amount, setAmount] = useState("");

    const handlePayment = () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }
        makePayment(parseFloat(amount));
    };

    return (
        <div className="min-h-screen bg-gray-900 px-4 sm:px-6">
            <div className="w-full mt-6">
                <Header title="Home" icon={<IoIosHome />} />
            </div>

            <div className="w-full max-w-screen-lg mx-auto mt-4 p-6 flex flex-col items-center border-2 border-gray-700 rounded-lg bg-gray-800">
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mb-4 px-4 py-2 rounded bg-gray-700 text-white w-full max-w-xs"
                />
                <button
                    className="bg-white text-black px-4 py-2 rounded"
                    onClick={handlePayment}
                >
                    Make Payment
                </button>
            </div>
        </div>
    );
}
