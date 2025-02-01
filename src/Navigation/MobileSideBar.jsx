import React from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoMdChatboxes } from "react-icons/io";

function MobileFooter({ toggleSidebar, toggleChat }) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 p-2 flex justify-around items-center shadow-lg z-50">
      <div
        onClick={toggleSidebar}
        className="flex flex-col items-center cursor-pointer"
      >
        <CgMenuRightAlt className="text-white text-2xl" />
        <span className="text-xs text-white">Menu</span>
      </div>
      <div
        onClick={toggleChat}
        className="flex flex-col items-center cursor-pointer"
      >
        <IoMdChatboxes className="text-white text-2xl" />
        <span className="text-xs text-white">Chat</span>
      </div>
    </div>
  );
}

export default MobileFooter;