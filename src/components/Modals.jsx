import React from "react";
import useModalStore from "../utils/ZustandStore/useModalStore";
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";
import RecoverPasswordModal from "../Modals/RecoverPasswordModal";
import ResetPasswordModal from "../Modals/ResetPasswordModal";
import WalletModal from "../Modals/WalletModal";
import PromoCodeModal from "../Modals/PromoCodeModal";

export default function Modals() {
  const {
    isLoginModalOpen,
    isRegisterModalOpen,
    isRecoverPasswordModalOpen,
    isResetPasswordModalOpen,
    isWalletModalOpen,
    isPromoCodeModalOpen,
    closeLoginModal,
    closeRegisterModal,
    closeRecoverPasswordModal,
    closeResetPasswordModal,
    closeWalletModal,
    closePromoCodeModal,
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
    </>
  );
}