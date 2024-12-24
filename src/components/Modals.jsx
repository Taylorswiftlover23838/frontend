import React from "react";
import useModalStore from "../utils/ZustandStore/useModalStore";
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";
import RecoverPasswordModal from "../Modals/RecoverPasswordModal";
import ResetPasswordModal from "../Modals/ResetPasswordModal";
import WalletModal from "../Modals/WalletModal";
import PromoCodeModal from "../Modals/PromoCodeModal";
import CryptoModal from "../Modals/CryptoModal";
import PaymentOptionsModal from "../Modals/PaymentOptionsModal";
import TransactionModal from "../Modals/TransactionModal";

export default function Modals() {
  const {
    selectedTransaction,
    selectedPaymentOption,

    isLoginModalOpen,
    isRegisterModalOpen,
    isRecoverPasswordModalOpen,
    isResetPasswordModalOpen,
    isWalletModalOpen,
    isPromoCodeModalOpen,
    isCryptoModalOpen,
    isPaymentOptionsModalOpen,
    isTransactionModalOpen,

    closeLoginModal,
    closeRegisterModal,
    closeRecoverPasswordModal,
    closeResetPasswordModal,
    closeWalletModal,
    closePromoCodeModal,
    closeCryptoModal,
    closePaymentOptionsModal,
    closeTransactionModal,
  } = useModalStore();

  return (
    <>
      {/* Login and Register modals */}
      {isLoginModalOpen && <LoginModal closeModal={closeLoginModal} />}
      {isRegisterModalOpen && <RegisterModal closeModal={closeRegisterModal} />}

      {/* Forgot Password Modals */}
      {isRecoverPasswordModalOpen && (
        <RecoverPasswordModal closeModal={closeRecoverPasswordModal} />
      )}

      {isResetPasswordModalOpen && (
        <ResetPasswordModal closeModal={closeResetPasswordModal} />
      )}

      {/* Wallet Modals */}
      {isWalletModalOpen && <WalletModal closeModal={closeWalletModal} />}
      {isPromoCodeModalOpen && (
        <PromoCodeModal closeModal={closePromoCodeModal} />
      )}
      {isCryptoModalOpen && <CryptoModal closeModal={closeCryptoModal} />}

      {isPaymentOptionsModalOpen && (
        <PaymentOptionsModal
          option={selectedPaymentOption}
          onClose={closePaymentOptionsModal}
        />
      )}

      {/* Transaction Modal */}
      {isTransactionModalOpen && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={closeTransactionModal}
        />
      )}
    </>
  );
}
