import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem("accessToken") || null,
  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
    set({ accessToken: token });
  },
  clearAccessToken: () => {
    localStorage.removeItem("accessToken");
    set({ accessToken: null });
  },
  loggedIn: !!localStorage.getItem("accessToken"),
  setLoggedIn: (value) => set({ loggedIn: value }),
}));

export default useAuthStore;