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
        transactionDropdownOpen: false,
        linksDropdownOpen: false, 
      };
    }),

  toggleTransactionDropdown: () =>
    set((state) => {
      return {
        transactionDropdownOpen: !state.transactionDropdownOpen,
        linksDropdownOpen: false, 
        isProfileDropDownOpen: false, 
      };
    }),

  toggleLinksDropdown: () =>
    set((state) => {
      return {
        linksDropdownOpen: !state.linksDropdownOpen,
        transactionDropdownOpen: false, 
        isProfileDropDownOpen: false, 
      };
    }),

  setSelectedTransaction: (transaction) =>
    set((state) => ({
      selectedTransaction: transaction,
      transactionDropdownOpen: !state.linksDropdownOpen,
    })),
}));

export default useDropdownStore;
