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
  const [rolls, setRolls] = useState([]);
  const [latestRoll, setLatestRoll] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [multiplier, setMultiplier] = useState("2.0");
  const [winChance, setWinChance] = useState((100 / parseFloat(multiplier)).toFixed(2));

  const handlePlay = async () => {
    const body = { value, rollType, betAmount };
    setDisabled(true);

    setTimeout(async () => {
      try {
        const response = await api.post("/dice", body);
        const data = response.data;

        if (response.status === 200) {
          const audio = new Audio("/Audios/dice-roll.mp3");
          audio.play();
          setRolls((prevRolls) => [
            ...prevRolls,
            { roll: data.roll, won: data.won },
          ]);

          setLatestRoll(data.roll);
        }
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setDisabled(false);
      }
    }, 1000);
  };

  const handleToggle = useCallback(() => {
    setRollType((prev) => (prev === "over" ? "under" : "over"));
    setValue((prev) => 100 - prev);
  }, []);

  const handleValueChange = useCallback((newValue) => {
    setValue(newValue);
    const newWinChance = rollType === "over" ? 100 - newValue : newValue;
    setWinChance(newWinChance.toFixed(2));
    setMultiplier((100 / newWinChance).toFixed(4));
  }, [rollType]);

  const handleWinChanceChange = useCallback((e) => {
    const sanitizedValue = e.target.value.replace(/[^0-9.]/g, "");
    setWinChance(sanitizedValue);
  }, []);

  const handleWinChanceBlur = useCallback(() => {
    let num = parseFloat(winChance);
    if (isNaN(num) || winChance === "") num = 0.0108;
    if (num < 0.0108) num = 0.0108;
    if (num > 99) num = 99;

    setWinChance(num.toFixed(2));
    setMultiplier((100 / num).toFixed(4));
    setValue(rollType === "over" ? (100 - num).toFixed(2) : num.toFixed(2));
  }, [winChance, rollType]);

  const handleMultiplierChange = useCallback((e) => {
    const sanitizedValue = e.target.value.replace(/[^0-9.]/g, "");
    setMultiplier(sanitizedValue);
  }, []);

  const handleMultiplierBlur = useCallback(() => {
    let num = parseFloat(multiplier);
    if (isNaN(num) || multiplier === "") num = 1.0108;
    if (num < 1.0108) num = 1.0108;
    if (num > 9400) num = 9400;

    setMultiplier(num.toFixed(4));
    setWinChance((100 / num).toFixed(2));
    setValue(rollType === "over" ? (100 - 100 / num).toFixed(2) : (100 / num).toFixed(2));
  }, [multiplier, rollType]);

  return (
<div className="min-h-screen px-4 sm:px-6 flex flex-col items-center">
  <Header title="Dice" icon={<FaDiceFive />} />

  <div className="w-full max-w-screen-lg mx-auto mt-8 p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 rounded-xl bg-gray-800">
    <div className="flex-1 p-6 bg-gray-900 rounded-xl shadow-inner flex flex-col gap-6 items-center justify-start order-2 md:order-1 h-[500px]">
      <div className="relative w-full">
        <input
          className="w-full bg-gray-700 text-white p-4 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter amount"
          aria-label="Enter Amount"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value.replace(/[^0-9.]/g, ""))}
        />
        <MdOutlineAttachMoney className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
      </div>

      <button
        className={`w-full font-semibold py-4 px-6 rounded-lg 
        ${loggedIn
            ? disabled
              ? "bg-blue-600 opacity-50 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-2"
            : "bg-blue-600 opacity-50 cursor-not-allowed"
          }`}
        aria-label="Play"
        disabled={disabled || !loggedIn}
        onClick={handlePlay}
      >
        Play
      </button>
      <FairnessFooter />
    </div>

    <div className="flex-[2] p-6 bg-gray-900 rounded-xl shadow-inner flex flex-col justify-between order-1 md:order-2 relative">
      <div className="flex-grow flex items-center justify-center py-24">
        <CustomSlider
          value={value}
          onChange={handleValueChange}
          rollType={rollType}
          latestRoll={latestRoll}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div>
          <label className="text-gray-300 mb-2 text-sm font-medium">
            {`Roll ${rollType === "over" ? "Over" : "Under"}`}
          </label>
          <div className="relative">
            <input
              className="w-full bg-gray-700 text-white p-3 rounded-lg opacity-80 cursor-not-allowed"
              value={value}
              disabled
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400"
              onClick={handleToggle}
            >
              <RiRecycleLine className="text-xl" />
            </button>
          </div>
        </div>

        <div>
          <label className="text-gray-300 mb-2 text-sm font-medium">Win Chance</label>
          <div className="relative">
            <input
              className="w-full bg-gray-700 text-white p-3 pr-8 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={winChance}
              onChange={handleWinChanceChange}
              onBlur={handleWinChanceBlur}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 text-lg">%</span>
          </div>
        </div>

        <div>
          <label className="text-gray-300 mb-2 text-sm font-medium">Multiplier</label>
          <div className="relative">
            <input
              className="w-full bg-gray-700 text-white p-3 pr-8 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={multiplier}
              onChange={handleMultiplierChange}
              onBlur={handleMultiplierBlur}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 text-lg">X</span>
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-2 flex gap-2 max-w-full">
        {rolls.slice(-5).map((rollData, index) => (
          <div
            key={index}
            className={`w-10 h-6 sm:h-8 sm:w-12 flex items-center justify-center text-white text-xs rounded-md font-semibold 
              ${rollData.won ? "bg-green-500" : "bg-red-500"}`}
          >
            {rollData.roll.toFixed(2)}
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

  );
}
