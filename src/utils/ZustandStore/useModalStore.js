import { create } from "zustand";

const useModalStore = create((set) => ({
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isRecoverPasswordModalOpen: false,
  isResetPasswordModalOpen: false,
  isWalletModalOpen: false,
  isPromoCodeModalOpen: false,

  openLoginModal: () => 
    set((state) => ({
      isLoginModalOpen: !state.isLoginModalOpen,
    })),

  closeLoginModal: () => 
    set((state) => ({
      isLoginModalOpen: !state.isLoginModalOpen,
    })),

  openRegisterModal: () => 
    set((state) => ({
      isRegisterModalOpen: !state.isRegisterModalOpen,
    })),

  closeRegisterModal: () => 
    set((state) => ({
      isRegisterModalOpen: !state.isRegisterModalOpen,
    })),

  openRecoverPasswordModal: () => 
    set((state) => ({
      isRecoverPasswordModalOpen: !state.isRecoverPasswordModalOpen,
      isLoginModalOpen: false
    })),

  closeRecoverPasswordModal: () => 
    set((state) => ({
      isRecoverPasswordModalOpen: !state.isRecoverPasswordModalOpen,
      isLoginModalOpen: true
    })),

  openResetPasswordModal: () => 
    set((state) => ({
      isResetPasswordModalOpen: !state.isResetPasswordModalOpen,
      isRecoverPasswordModalOpen: false
    })),

  closeResetPasswordModal: () => 
    set((state) => ({
      isResetPasswordModalOpen: !state.isResetPasswordModalOpen,
      isRecoverPasswordModalOpen: true
    })),

  openWalletModal: () => 
    set((state) => ({
      isWalletModalOpen: !state.isWalletModalOpen,
    })),

  closeWalletModal: () => 
    set((state) => ({
      isWalletModalOpen: !state.isWalletModalOpen,
    })),

  openPromoCodeModal: () => 
    set((state) => ({
      isPromoCodeModalOpen: !state.isPromoCodeModalOpen,
      isWalletModalOpen: false
    })),

  closePromoCodeModal: () => 
    set((state) => ({
      isPromoCodeModalOpen: !state.isPromoCodeModalOpen,
      isWalletModalOpen: true
    })),
}));

export default useModalStore;
