import React, { useState, useCallback } from "react";
import Header from "../../components/Header";
import { toast } from "react-hot-toast";
import { FaDiceFive } from "react-icons/fa6";
import CustomSlider from "../../components/CustomSlider";
import { RiRecycleLine } from "react-icons/ri";
import useAuthStore from "../../utils/ZustandStore/useAuthStore";
import { MdOutlineAttachMoney } from "react-icons/md";
import api from "../../utils/Api/axiosConfig";
import FairnessFooter from "../../components/FairnessFooter";


export default function Dice() {
  const { loggedIn } = useAuthStore();

  const [value, setValue] = useState(50);
  const [rollType, setRollType] = useState("over");
  const [betAmount, setBetAmount] = useState("");

  const handlePlay = async () => {
    if (betAmount < 1) return;

    const body = { value, rollType, betAmount };

    try {
      const response = await api.post("/dice", body);
      const data = response.data;

      if (response.status === 200) {
        toast.success(data.roll);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleToggle = useCallback(() => {
    setRollType((prev) => (prev === "over" ? "under" : "over"));
    setValue((prev) => 100 - prev);
  }, []);

  const handleValueChange = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  const handleInputChange = useCallback((e) => {
    const sanitizedValue = e.target.value.replace(/[^0-9.]/g, "");
    setBetAmount(sanitizedValue);
  }, []);

  return (
    <div className="min-h-screen px-4 sm:px-6 flex flex-col items-center">
      <Header title="Dice" icon={<FaDiceFive />} />

      <div className="w-full max-w-screen-lg mx-auto mt-8 p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 rounded-xl min-h-[600px] bg-gray-800">
        <div className="flex-1 p-6 bg-gray-900 rounded-xl shadow-inner flex flex-col gap-6 items-center justify-start order-2 md:order-1">
          <div className="relative w-full">
            <input
              className="w-full bg-gray-700 text-white p-4 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter amount"
              aria-label="Enter Amount"
              value={betAmount}
              onChange={handleInputChange}
            />
            <MdOutlineAttachMoney className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
          </div>

          <button
            className={`w-full font-semibold py-4 px-6 rounded-lg transition transform
      ${loggedIn
                ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 hover:scale-105"
                : "bg-blue-600 opacity-50 cursor-not-allowed"
              }`}
            aria-label="Play"
            disabled={!loggedIn}
            onClick={handlePlay}
          >
            Play
          </button>

          <FairnessFooter />

        </div>


        <div className="flex-[2] p-6 bg-gray-900 rounded-xl shadow-inner flex flex-col justify-between order-1 md:order-2">
          <div className="flex-grow flex items-center justify-center py-10 sm:py-12">
            <CustomSlider
              value={value}
              onChange={handleValueChange}
              rollType={rollType}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300 mb-2 text-sm font-medium">
              {`Roll ${rollType === "over" ? "Over" : "Under"}`}
            </label>
            <div className="relative">
              <input
                className="w-full bg-gray-700 text-white p-3 sm:p-4 rounded-lg pr-12 opacity-80 cursor-not-allowed focus:ring-2 focus:ring-blue-500 transition"
                value={value.toFixed(2)}
                disabled
                aria-disabled="true"
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 transition"
                onClick={handleToggle}
                aria-label="Toggle Roll Over/Under"
              >
                <RiRecycleLine className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
