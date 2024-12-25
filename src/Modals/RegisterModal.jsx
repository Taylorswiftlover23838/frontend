import React, { useState } from "react";
import { ImExit } from "react-icons/im";
import { toast } from "react-hot-toast";
import useAuthStore from "../utils/ZustandStore/useAuthStore";
import api from "../utils/Api/axiosConfig";

const RegisterModal = ({ closeModal }) => {
  const { setLoggedIn } = useAuthStore();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateUsername = (username) => username.length >= 3;
  const validatePassword = (password) => password.length >= 8;

  const validateForm = () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!validateUsername(username)) {
      toast.error("Username must be at least 3 characters long.");
      return false;
    }
    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters long.");
      return false;
    }
    return true;
  };

  const registerUser = async () => {
    if (!validateForm()) return;

    const body = { email, username, password };

    try {
      const response = await api.post("/account/register", body);
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
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur flex items-center justify-center z-50 px-4 sm:px-6 md:px-8">
        <div className="bg-white p-8 rounded-lg w-full max-w-md relative animate-drop-from-top">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900"
          >
            <ImExit />
          </button>

          <h2 className="text-2xl font-semibold mb-4 text-black">Register</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-black"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12)
                  )
                }
                placeholder="Enter your username"
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                />
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              By signing up, you agree to the{" "}
              <span className="underline text-black">terms and conditions</span>
            </p>

            <div className="mt-4 flex justify-center items-center">
              <button
                type="button"
                onClick={registerUser}
                className="w-1/2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;