import React, { useState, useEffect, useRef } from "react";
import useChatStore from "../utils/ZustandStore/useChatStore";
import useAuthStore from "../utils/ZustandStore/useAuthStore";
import useModalStore from "../utils/ZustandStore/useModalStore";
import useUserData from "../utils/hooks/useUserData";
import useMobileStore from "../utils/ZustandStore/useMobileStore";
import Message from "../components/MessageBox";
import { emitMessage, onMessage, offMessage } from "../utils/socket";
import toast from "react-hot-toast";
import api from "../utils/Api/axiosConfig";

export default function ChatWindow() {
  const isOpen = useChatStore((state) => state.isChatOpen);
  const { loggedIn } = useAuthStore();
  const { openLoginModal } = useModalStore();
  const { data } = useUserData(loggedIn);
  const { isMobile, initResizeListener } = useMobileStore();

  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const cleanup = initResizeListener();
    return () => cleanup();
  }, [initResizeListener]);

  useEffect(() => {
    const messageHandler = (messageData) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          username: messageData.username,
          message: messageData.messageInput,
          profile_image: messageData.profile_image,
        },
      ]);
    };

    const allMessagesHandler = (allMessages) => {
      setMessages(allMessages); 
    };
    
    onMessage("receiveMessage", messageHandler); 
    onMessage("allMessages", allMessagesHandler); 

    return () => {
      offMessage("receiveMessage"); 
      offMessage("allMessages");   
    };
  }, [loggedIn]);

  const handleSendMessage = async () => {
    const username = data.username;
    const profile_image = data.profile_image;
    const body = { messageInput, username, profile_image };

    if (data) {
      try {
        emitMessage("sendMessage", body);
        await api.post("/sendMessage", body);
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (messageInput.trim().length === 0) {
        toast.error("Enter a message");
        return;
      }
      e.preventDefault();
      handleSendMessage();
      setMessageInput("");
    }
  };

  return (
    <div
      className={`fixed top-20 right-0 bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out z-30 ${
        isMobile
          ? isOpen
            ? "translate-x-0 w-64 h-[calc(100vh-8em)]"
            : "translate-x-full w-64 h-[calc(100vh-8em)]"
          : isOpen
          ? "translate-x-0 w-64 h-[calc(100vh-4em)]"
          : "translate-x-full w-64 h-[calc(100vh-4em)]"
      }`}
    >
      <div className="flex flex-col h-full ">
        {/* Messages Section */}
        <div
          className="overflow-y-auto p-4 flex-1 space-y-2 "
          ref={messagesEndRef}
        >
          {messages.map((msg, index) => (
            <Message
              key={index}
              message={msg.message}
              username={msg.username}
              profile_image={msg.profile_image}
            />
          ))}
        </div>

        {/* Login Prompt or Input Section */}
        {!loggedIn ? (
          <div className="p-4">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              onClick={openLoginModal}
            >
              Login
            </button>
          </div>
        ) : (
          <div className="p-4 flex items-center gap-3 border-t border-gray-700 bg-gray-850">
            <input
              type="text"
              className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
        )}
      </div>
    </div>
  );
}