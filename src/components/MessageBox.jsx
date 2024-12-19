import React from "react";

const Message = ({ message, username, profile_image }) => {
  return (
    <div className="flex items-start text-white mb-2 p-2 rounded-lg border border-gray-700 bg-gray-800">
      <img
        src={profile_image}
        alt="Profile"
        className="w-10 h-10 rounded-full mr-3"
      />
      <div className="flex flex-col space-y-1">
        <strong className="text-sm">{username}</strong>
        <span className="text-xs">{message}</span>
      </div>
    </div>
  );
};

export default Message;