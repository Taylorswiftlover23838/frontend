import React, { useState } from "react";
import { ImExit } from "react-icons/im";
import { toast } from "react-hot-toast";
import useAuthStore from "../utils/ZustandStore/useAuthStore";
import api from "../utils/Api/axiosConfig";
import useModalStore from "../utils/ZustandStore/useModalStore";

const LoginModal = ({ closeModal }) => {
  const { setLoggedIn } = useAuthStore();
  const { openRecoverPasswordModal } = useModalStore();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  // UseStates
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    const body = { emailOrUsername, password };

    try {
      const response = await api.post("/login", body);
      const data = response.data;

      if (response.status === 200) {
        toast.success(data.message);
        setAccessToken(data.accessToken);
        setLoggedIn(true);
        closeModal(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur flex items-center justify-center z-50 px-4 sm:px-6 md:px-8">
      <div className="bg-white p-8 rounded-lg w-full max-w-md relative animate-drop-from-top">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900"
        >
          <ImExit />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-black">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="emailOrUsername"
              className="block text-sm font-medium text-black"
            >
              Username or E-mail
            </label>
            <input
              type="text"
              id="emailOrUsername"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="Enter your username or email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value.slice(0, 25))}
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>
          </div>

          <div className="text-sm text-blue-500 hover:text-blue-700 mb-4">
            <button
              type="button"
              className="text-sm text-blue-500 hover:text-blue-700"
              onClick={() => openRecoverPasswordModal()}
            >
              Forgot password?
            </button>

          </div>

          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={loginUser}
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Privacy Policy and Terms of Service apply.
        </p>
      </div>
    </div>
  );
};

export default LoginModal;