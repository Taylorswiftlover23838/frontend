import React, { useState } from "react";
import { ImExit } from "react-icons/im";
import { toast } from "react-hot-toast";
import api from "../utils/Api/axiosConfig";

export default function ResetPasswordModal({ closeModal }) {
  const [recoveryCode, setRecoveryCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateForm = () => {
    if (!recoveryCode) {
      toast.error("Recovery code is required.");
      return false;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const body = { recoveryCode, newPassword };

    if (!validateForm()) return;

    try {
      const response = await api.post("/resetpassword", body);
      const data = response.data;

      if (response.status === 200) {
        toast.success(data.message);
        closeModal();
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
            Reset Password
          </h2>

          <form>
            <div className="mb-6">
              <label
                htmlFor="recoveryCode"
                className="block text-sm font-medium text-black"
              >
                Recovery Code
              </label>
              <input
                type="text"
                id="recoveryCode"
                value={recoveryCode}
                onChange={(e) => setRecoveryCode(e.target.value)}
                placeholder="Enter your recovery code"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-black"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-black"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
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
                  handleSubmit();
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}