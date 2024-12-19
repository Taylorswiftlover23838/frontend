import React from "react";
import Header from "../components/header";
import { TbCoinFilled } from "react-icons/tb";

export default function CoinFlip() {
  return (
    <>
      <div className="min-h-screen bg-gray-900 px-4 sm:px-6"> {/* Added padding for consistency */}
        {/* Header Section */}
        <div className="w-full mt-6">
          <Header title="CoinFlip" icon={<TbCoinFilled />} />
        </div>

        {/* CoinFlip Section */}
        <div className="w-full max-w-screen-lg mx-auto mt-4 p-6 flex justify-center items-center border-2 border-gray-700 rounded-lg bg-gray-800">
          {/* Add content for CoinFlip here */}
        </div>
      </div>
    </>
  );
}