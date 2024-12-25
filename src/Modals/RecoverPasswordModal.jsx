import React, { useState } from "react";
import api from "../utils/Api/axiosConfig";
import { ImExit } from "react-icons/im";
import { toast } from "react-hot-toast";
import useModalStore from "../utils/ZustandStore/useModalStore";

const RecoverPasswordModal = ({ closeModal }) => {
  const [email, setEmail] = useState("");

  const { openResetPasswordModal } = useModalStore();


  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const sendRecoveryCode = async () => {
    const body = { email };

    if (!validateForm()) return;

    try {
      const response = await api.post("/account/recoveryCode", body);
      const data = response.data;

      if (response.status === 200) {
        toast.success(data.message);
        openResetPasswordModal();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
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

          <h2 className="text-2xl font-semibold mb-4 text-black">
            Recover Password
          </h2>
          <form>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your e-mail"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>

            <div className="flex justify-between gap-x-2">
              <button
                type="button"
                className="flex-1 bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                onClick={(e) => {
                  e.preventDefault();
                  sendRecoveryCode();
                }}
              >
                Send Code
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RecoverPasswordModal;