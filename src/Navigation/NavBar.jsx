import React from "react";
import useAuthStore from "../utils/ZustandStore/useAuthStore";
import useModalStore from "../utils/ZustandStore/useModalStore";
import useChatStore from "../utils/ZustandStore/useChatStore";
import logo from "../utils/images/logo.png";
import logoMark from "../utils/images/logoMark.png";
import { Link } from "react-router-dom";
import useUserData from "../utils/hooks/useUserData";
import { IoMdChatboxes } from "react-icons/io";
import { MdOutlineAttachMoney } from "react-icons/md";
import ProfileDropDown from "../components/ProfileDropDown";
import  useDropdownStore from "../utils/ZustandStore/useDropDownStore";

export default function NavBar() {
  const { loggedIn } = useAuthStore();
  const { isProfileDropDownOpen, toggleProfileDropDown } = useDropdownStore(
    (state) => state
  );
  const { toggleChat } = useChatStore();

  const { openLoginModal, openRegisterModal, openWalletModal } =
    useModalStore();

  const { data } = useUserData(loggedIn);

  return (
    <nav className="bg-gray-800 text-white fixed w-full h-20 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full relative">
        <Link
          to="/"
          className="flex items-center cursor-pointer absolute left-0"
        >
          <img
            src={logo}
            alt="logo"
            className="sm:h-14 lg:h-16 hidden sm:block"
          />
          <img src={logoMark} alt="logo" className="h-14 block sm:hidden" />
        </Link>

        {loggedIn && data && (
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
            <div className="flex items-center border-2 border-r-0 border-gray-700 text-white px-4 py-2 shadow-lg rounded-l-md">
              <MdOutlineAttachMoney className="text-xl text-white" />
              <span className="text-lg font-semibold">{data.balance}</span>
            </div>
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-3 shadow-lg font-medium rounded-r-md"
              onClick={openWalletModal}
            >
              Wallet
            </button>
          </div>
        )}

        <div className="flex items-center space-x-2 sm:space-x-4 ml-auto relative">
          {!loggedIn ? (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-400 text-sm sm:text-base px-2 sm:px-4 py-1 sm:py-2 lg:px-5 lg:py-3 rounded"
                onClick={openRegisterModal}
              >
                Register
              </button>

              <button
                className="bg-green-500 hover:bg-green-400 text-sm sm:text-base px-2 py-1 sm:py-2 sm:px-4 lg:px-5 lg:py-3 rounded"
                onClick={openLoginModal}
              >
                Login
              </button>
            </>
          ) : (
            <>
              {data && (
                <img
                  src={data.profile_image}
                  alt="profile_image"
                  className="h-12 cursor-pointer"
                  onClick={toggleProfileDropDown}
                />
              )}
            </>
          )}


          {isProfileDropDownOpen && <ProfileDropDown />}

          <button
            onClick={toggleChat}
            className="flex items-center ml-auto text-white space-x-2"
          >
            <IoMdChatboxes className="text-4xl hidden md:block" />
          </button>
        </div>
      </div>
    </nav>
  );
}