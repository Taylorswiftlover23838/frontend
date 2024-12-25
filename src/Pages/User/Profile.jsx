import React from "react";
import useUserData from "../../utils/hooks/useUserData";
import useAuthStore from "../../utils/ZustandStore/useAuthStore";
import Header from '../../components/Header'
import { IoSettingsSharp } from "react-icons/io5";
import useModalStore from "../../utils/ZustandStore/useModalStore";

export default function Profile() {
  const { loggedIn } = useAuthStore();
  const { data } = useUserData(loggedIn);
  const { openLoginModal } = useModalStore();

  const links = [
    { linkText: "General", linkUrl: "/profile" },
    { linkText: "Transactions", linkUrl: "/profile/transactions" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 px-4 sm:px-6">
      <div className="w-full mt-6">
        <Header title="Profile" icon={<IoSettingsSharp />} links={links} />
      </div>

      <div className="w-full max-w-screen-lg mx-auto mt-4 p-6 flex flex-col border-2 border-gray-700 rounded-lg bg-gray-800">
        {loggedIn ? (
          <>
            <div className="mb-6 text-center">
              <img
                src={data?.profile_image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
              <p className="mt-2 text-lg text-white font-semibold">
                {data?.username}
              </p>
            </div>

            {data && (
              <div className="flex space-x-6">
                <div className="p-4 border-2 border-gray-700 rounded-lg">
                  <p className="text-lg text-white">
                    <strong>Joined:</strong> {data.createdAt}
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center bg-gray-900 p-8 space-y-6 rounded-lg">
            <h1 className="text-3xl font-bold text-red-600">Login Required</h1>
            <p className="text-lg text-white">
              You need to log in to view your Profile.
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg"
              onClick={openLoginModal}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}