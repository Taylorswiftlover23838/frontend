import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { CgMenuRightAlt } from "react-icons/cg";
import { FaDiceFive } from "react-icons/fa6";
import { TbCoinFilled } from "react-icons/tb";
import { GiPokerHand } from "react-icons/gi";
import useChatStore from "../utils/ZustandStore/useChatStore";
import useMobileStore from "../utils/ZustandStore/useMobileStore";
import useSideBarStore from "../utils/ZustandStore/useSideBarStore";
import MobileFooter from "./MobileSideBar";

function SideBar({ children }) {
  const { toggleChat } = useChatStore();
  const { isMobile, initResizeListener } = useMobileStore();
  const { isSideBarOpen, toggleSideBar } = useSideBarStore();

  useEffect(() => {
    const cleanup = initResizeListener();
    return () => cleanup();
  }, [initResizeListener]);

  const menuItem = [
    { path: "/", name: "Home", icon: <IoIosHome /> },
    { path: "/coinflip", name: "CoinFlip", icon: <TbCoinFilled /> },
    { path: "/dice", name: "Dice", icon: <FaDiceFive /> },
    { path: "/blackjack", name: "BlackJack", icon: <GiPokerHand/>}
  ];

  return (
    <div className="flex">
      {/* Sidebar for Larger Screens */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 mt-20 shadow-lg transition-all duration-300 z-30 ${
          isMobile
            ? isSideBarOpen
              ? "w-44 h-[calc(100vh-8em)]"
              : "w-0 overflow-hidden h-[calc(100vh-8em)]"
            : isSideBarOpen
            ? "w-44"
            : "w-16"
        }`}
      >
        {/* Sidebar Content */}
        <div
          className="flex items-center p-4 cursor-pointer hover:bg-gray-700 transition-all"
          onClick={toggleSideBar}
        >
          <p
            className={`text-white ml-2 ${isSideBarOpen ? "block" : "hidden"}`}
          >
            MENU
          </p>
          <div className={`ml-auto ${isSideBarOpen ? "ml-16" : "ml-0"}`}>
            {/* Remove onClick here from this icon */}
            <CgMenuRightAlt className="text-white text-2xl" />
          </div>
        </div>

        <div className="mt-2">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="flex items-center px-4 py-2 text-white hover:bg-gray-600 rounded-lg transition-all"
            >
              <div className="flex items-center justify-center text-xl w-10 h-10 ">
                {item.icon}
              </div>
              <div className={`ml-4 ${isSideBarOpen ? "block" : "hidden"}`}>
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      {/* Mobile Footer */}
      {isMobile && (
        <MobileFooter toggleSidebar={toggleSideBar} toggleChat={toggleChat} />
      )}

      <main className="flex-1">{children}</main>
    </div>
  );
}

export default SideBar;