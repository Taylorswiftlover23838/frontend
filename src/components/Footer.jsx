import React from "react";
import { BiLogoDiscordAlt } from "react-icons/bi";
import { IoLogoInstagram } from "react-icons/io";
import logo from "../utils/images/logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex justify-center items-center text-gray-200 py-8 px-4 md:px-6 pb-20 md:pb-8">
      <div className="w-full max-w-screen-lg mx-auto border-2 border-gray-700 rounded-lg p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-gray-800">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-4 flex justify-center md:justify-start">
            <img src={logo} alt="Logo" className="h-10 md:h-12" />
          </div>
          <div className="flex justify-center md:justify-start space-x-2">
            <div className="bg-gray-700 rounded-md p-2">
              <BiLogoDiscordAlt className="cursor-pointer text-lg md:text-xl lg:text-2xl text-white" />
            </div>
            <div className="bg-gray-700 rounded-md p-2">
              <IoLogoInstagram className="cursor-pointer text-lg md:text-xl lg:text-2xl text-white" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-2 md:mb-4 text-center md:text-left">About</h3>
          <ul className="text-xs md:text-sm space-y-1 md:space-y-2 text-center md:text-left">

    
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2 md:mb-4 text-center md:text-left">Fairness</h3>
          <ul className="text-xs md:text-sm space-y-1 md:space-y-2 text-center md:text-left">
          <li>
              <Link to="/fairness/mines" className="hover:underline text-blue-400">Mines</Link>
            </li>
            <li>
              <Link to="/fairness/blackjack" className="hover:underline text-blue-400">BlackJack</Link>
            </li>
            <li>
              <Link to="/fairness/limbo" className="hover:underline text-blue-400">Limbo</Link>
            </li>
            <li>
              <Link to="/fairness/dice" className="hover:underline text-blue-400">Dice</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2 md:mb-4 text-center md:text-left">Support</h3>
          <ul className="text-xs md:text-sm space-y-1 md:space-y-2 text-center md:text-left">


          </ul>
        </div>
      </div>
    </div>
  );
}
