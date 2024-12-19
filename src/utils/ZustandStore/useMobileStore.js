import { create } from "zustand";

const useMobileStore = create((set) => ({
  isMobile: window.innerWidth <= 768,
  setIsMobile: (value) => set({ isMobile: value }),
  initResizeListener: () => {
    const handleResize = () => {
      set({ isMobile: window.innerWidth <= 768 });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  },
}));

export default useMobileStore;