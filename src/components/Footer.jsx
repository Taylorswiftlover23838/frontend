import React from "react";
import { BiLogoDiscordAlt } from "react-icons/bi";
import { IoLogoInstagram } from "react-icons/io";
import logo from "../utils/images/logo.png";

export default function Footer() {
  return (
    <div className="flex justify-center items-center bg-gray-900 text-gray-200 py-8 px-4 sm:px-6">
      <div className="w-full max-w-screen-lg mx-auto border-2 border-gray-700 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-800">

        <div>
          <div className="mb-4 flex justify-center lg:justify-start">
            <img src={logo} alt="Logo" className="h-12" />
          </div>
          <div className="flex justify-center lg:justify-start space-x-2">
            <div className="bg-gray-700 rounded-md p-2">
              <BiLogoDiscordAlt className="cursor-pointer text-xl md:text-2xl text-white" />
            </div>
            <div className="bg-gray-700 rounded-md p-2">
              <IoLogoInstagram className="cursor-pointer text-xl md:text-2xl text-white" />
            </div>
          </div>
        </div>


        <div>
          <h3 className="font-bold mb-4 text-center lg:text-left">About</h3>
          <ul className="text-sm space-y-2 text-center lg:text-left">

          </ul>
        </div>


        <div>
          <h3 className="font-bold mb-4 text-center lg:text-left">Fairness</h3>
          <ul className="text-sm space-y-2 text-center lg:text-left">

          </ul>
        </div>


        <div>
          <h3 className="font-bold mb-4 text-center lg:text-left">Support</h3>
          <ul className="text-sm space-y-2 text-center lg:text-left">

          </ul>
        </div>
      </div>
    </div>
  );
}
