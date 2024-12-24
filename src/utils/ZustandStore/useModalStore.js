import { create } from "zustand";

const useModalStore = create((set) => ({
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isRecoverPasswordModalOpen: false,
  isResetPasswordModalOpen: false,
  isWalletModalOpen: false,
  isPromoCodeModalOpen: false,
  isCryptoModalOpen: false,
  isPaymentOptionsModalOpen: false,
  isTransactionModalOpen: false,

  selectedTransaction: null,
  selectedPaymentOption: null,

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
      isLoginModalOpen: false,
    })),

  closeRecoverPasswordModal: () =>
    set((state) => ({
      isRecoverPasswordModalOpen: !state.isRecoverPasswordModalOpen,
      isLoginModalOpen: true,
    })),

  openResetPasswordModal: () =>
    set((state) => ({
      isResetPasswordModalOpen: !state.isResetPasswordModalOpen,
      isRecoverPasswordModalOpen: false,
    })),

  closeResetPasswordModal: () =>
    set((state) => ({
      isResetPasswordModalOpen: !state.isResetPasswordModalOpen,
      isRecoverPasswordModalOpen: true,
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
      isWalletModalOpen: false,
    })),

  closePromoCodeModal: () =>
    set((state) => ({
      isPromoCodeModalOpen: !state.isPromoCodeModalOpen,
      isWalletModalOpen: true,
    })),

  openCryptoModal: () =>
    set((state) => ({
      isCryptoModalOpen: !state.isCryptoModalOpen,
      isWalletModalOpen: false,
    })),

  closeCryptoModal: () =>
    set((state) => ({
      isCryptoModalOpen: !state.isCryptoModalOpen,
      isWalletModalOpen: true,
    })),

  openPaymentOptionsModal: (option) =>
    set({
      isPaymentOptionsModalOpen: true,
      selectedPaymentOption: option,
      isWalletModalOpen: false,
    }),

  closePaymentOptionsModal: () =>
    set({
      isPaymentOptionsModalOpen: false,
      selectedPaymentOption: null,
      isWalletModalOpen: true,
    }),

  openTransactionModal: (transaction) =>
    set({
      isTransactionModalOpen: true,
      selectedTransaction: transaction,
    }),
    
  closeTransactionModal: () =>
    set({
      isTransactionModalOpen: false,
      selectedTransaction: null,
    }),
}));

export default useModalStore;
