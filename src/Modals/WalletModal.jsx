import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { ImExit } from "react-icons/im";
import { CiBarcode } from "react-icons/ci";
import { BsWechat } from "react-icons/bs";
import { SiCashapp } from "react-icons/si";
import { FaCreditCard } from "react-icons/fa6";
import { FaCcAmazonPay } from "react-icons/fa";
import { GrBitcoin } from "react-icons/gr";
import useModalStore from "../utils/ZustandStore/useModalStore";

const WalletModal = ({ closeModal }) => {
  const {
    openPromoCodeModal,
    openCryptoModal,
    openPaymentOptionsModal,
  } = useModalStore();

  const paymentOptions = [
    { icon: <FaCreditCard className="text-3xl text-gray-800" />, label: "Card" },
    { icon: <BsWechat className="text-3xl text-gray-800" />, label: "WeChat" },
    { icon: <FaCcAmazonPay className="text-3xl text-gray-800" />, label: "Amazon Pay" },
    { icon: <SiCashapp className="text-3xl text-gray-800" />, label: "Cash App" },
  ];

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6 md:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl w-full max-w-md relative shadow-lg transform transition-all animate-drop-from-top">
        <div className="flex justify-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Wallet</h2>
        </div>

        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ImExit />
        </button>

        <div className="mb-6">
          <Tabs>
            <TabList className="flex gap-4">
              <Tab
                className="px-4 py-2 text-gray-600 cursor-pointer rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                selectedClassName="bg-blue-100 text-blue-600 font-medium"
              >
                Purchase
              </Tab>
              <Tab
                className="px-4 py-2 text-gray-600 cursor-pointer rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                selectedClassName="bg-blue-100 text-blue-600 font-medium"
              >
                Redeem
              </Tab>
            </TabList>

            <TabPanel>
              <div className="mt-6 text-gray-600">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Other Methods
                </h3>

                <div className="flex flex-wrap gap-4 mb-4">
                  <button
                    onClick={openPromoCodeModal}
                    className="flex-1 flex items-center justify-between border border-gray-300 hover:bg-gray-100 focus:outline-none rounded-lg px-4 py-3 bg-white text-gray-700 font-medium shadow-sm focus:ring-2 focus:ring-blue-400"
                  >
                    <div className="flex items-center gap-3">
                      <CiBarcode className="text-3xl text-gray-800" />
                      <span>Promo Code</span>
                    </div>
                  </button>

                  <button
                    onClick={openCryptoModal}
                    className="flex-1 flex items-center justify-between border border-gray-300 hover:bg-gray-100 focus:outline-none rounded-lg px-4 py-3 bg-white text-gray-700 font-medium shadow-sm focus:ring-2 focus:ring-blue-400"
                  >
                    <div className="flex items-center gap-3">
                      <GrBitcoin className="text-3xl text-gray-800" />
                      <span>Crypto</span>
                    </div>
                  </button>
                </div>

                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Purchase
                </h3>

                <div className="flex flex-wrap gap-4">
                  {paymentOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => openPaymentOptionsModal(option)}
                      className="flex-auto flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-100 focus:outline-none rounded-lg px-4 py-3 bg-white text-gray-700 font-medium shadow-sm focus:ring-2 focus:ring-blue-400"
                    >
                      {option.icon}
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="mt-6 text-gray-600">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Redeem
                </h3>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
