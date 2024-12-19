import { create } from "zustand";

const useChatStore = create((set) => ({
  isChatOpen: false,
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
}));

export default useChatStore;