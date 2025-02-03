import React, { useState, useEffect } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";

const BalanceNotification = ({ amount }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!amount || !show) return null; 

  return (
    <div className="flex items-center border-2 border-r-0 border-gray-700 text-white px-4 py-2 shadow-lg rounded-l-md bg-gray-900 transition-opacity duration-500">
      <MdOutlineAttachMoney className="text-xl text-white" />
      <span className={`text-lg font-semibold ${amount < 0 ? "text-red-500" : "text-green-500"}`}>
        {amount > 0 ? `+${amount}` : amount}
      </span>
    </div>
  );
};

export default BalanceNotification;
