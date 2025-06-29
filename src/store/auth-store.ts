import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, AuthCredentials, SignUpCredentials, User } from '@/types';

// Predefined test accounts
const TEST_ACCOUNTS = [
  { emailOrUsername: 'demo@example.com', password: 'password123', name: 'Demo User' },
  { emailOrUsername: 'test@user.com', password: 'testpass', name: 'Test User' },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,

      login: async (credentials: AuthCredentials) => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const account = TEST_ACCOUNTS.find(
          acc => acc.emailOrUsername === credentials.emailOrUsername && acc.password === credentials.password
        );
        
        if (account) {
          const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            emailOrUsername: account.emailOrUsername,
            name: account.name
          };
          set({ user, isLoading: false });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      register: async (credentials: SignUpCredentials) => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if email already exists
        const existingAccount = TEST_ACCOUNTS.find(acc => acc.emailOrUsername === credentials.emailOrUsername);
        if (existingAccount) {
          set({ isLoading: false });
          return false;
        }
        
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          emailOrUsername: credentials.emailOrUsername,
        };
        
        set({ user, isLoading: false });
        return true;
      },

      logout: () => {
        set({ 
          user: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
