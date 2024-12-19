import React from "react";
import  useDropdownStore from "../utils/ZustandStore/useDropDownStore";
import api from "../utils/Api/axiosConfig";
import useAuthStore from "../utils/ZustandStore/useAuthStore";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { MdOutlineSupportAgent } from "react-icons/md";

export default function ProfileDropDown() {
  const { isProfileDropDownOpen, toggleProfileDropDown } = useDropdownStore(
    (state) => state
  );
  const { setLoggedIn } = useAuthStore();
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);

  const handleLogout = async () => {
    try {
      const response = await api.post("/logout");
      toast.success(response.data.message);
      toggleProfileDropDown();
      setLoggedIn(false);
      clearAccessToken();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const handleSupportClick = () => {
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:open"]);
      toggleProfileDropDown();
    } else {
      toast.error("Support chat is not available at the moment.");
    }
  };

  return (
    <div className="absolute top-full mt-2 right-0 w-36 shadow-lg rounded">
      {isProfileDropDownOpen && (
        <div className="w-36 bg-white shadow-lg rounded animate-drop-from-top">
          <Link to="/profile">
            <button className="flex items-center px-2 py-2 text-gray-800 w-full text-sm">
              <FaUser className="mr-2 text-gray-600" />
              Profile
            </button>
          </Link>
          <hr className="border-gray-600 my-1 mx-2" />
          <button
            className="flex items-center px-2 py-2 text-gray-800 w-full text-sm"
            onClick={handleSupportClick}
          >
            <MdOutlineSupportAgent className="mr-2 text-gray-600 text-lg" />
            Support
          </button>
          <hr className="border-gray-600 my-1 mx-2" />
          <button
            onClick={handleLogout}
            className="flex items-center px-2 py-2 text-gray-800 w-full text-sm"
          >
            <ImExit className="mr-2 text-gray-600" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}