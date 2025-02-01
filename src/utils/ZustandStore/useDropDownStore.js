import { create } from 'zustand';

const useDropdownStore = create((set) => ({
  isProfileDropDownOpen: false,
  transactionDropdownOpen: false,
  linksDropdownOpen: false,
  selectedTransaction: 'All',

  toggleProfileDropDown: () =>
    set((state) => {
      return {
        isProfileDropDownOpen: !state.isProfileDropDownOpen,
      };
    }),

  toggleTransactionDropdown: () =>
    set((state) => {
      return {
        transactionDropdownOpen: !state.transactionDropdownOpen,
      };
    }),

  toggleLinksDropdown: () =>
    set((state) => {
      return {
        linksDropdownOpen: !state.linksDropdownOpen,
      };
    }),

  setSelectedTransaction: (transaction) =>
    set((state) => ({
      selectedTransaction: transaction,
      transactionDropdownOpen: !state.linksDropdownOpen,
    })),
}));

export default useDropdownStore;
