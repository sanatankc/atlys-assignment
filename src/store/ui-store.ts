import { create } from 'zustand';
import type { UIState } from '@/types';

export const useUIStore = create<UIState>((set) => ({
  authModal: {
    isOpen: false,
    mode: 'signin',
  },

  openAuthModal: (mode) => set({
    authModal: { isOpen: true, mode }
  }),

  closeAuthModal: () => set(state => ({
    authModal: { ...state.authModal, isOpen: false }
  })),
}));
