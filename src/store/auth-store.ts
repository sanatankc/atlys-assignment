import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, AuthCredentials, SignUpCredentials, User, StoredAccount } from '@/types';

// Predefined test accounts
const TEST_ACCOUNTS = [
  { emailOrUsername: 'demo@example.com', password: 'password123', name: 'Demo User' },
  { emailOrUsername: 'test@user.com', password: 'testpass', name: 'Test User' },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      accounts: [],

      setUser: (user: User | null) => {
        set({ user });
      },

      login: async (credentials: AuthCredentials) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { accounts } = get();
        
        // Check test accounts first
        const testAccount = TEST_ACCOUNTS.find(
          acc => acc.emailOrUsername === credentials.emailOrUsername && acc.password === credentials.password
        );
        
        // Then check stored accounts
        const storedAccount = accounts.find(
          acc => acc.emailOrUsername === credentials.emailOrUsername && acc.password === credentials.password
        );
        
        const account = testAccount || storedAccount;
        
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
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { accounts } = get();
        
        // Check if account already exists in test accounts
        const existingTestAccount = TEST_ACCOUNTS.find(
          acc => acc.emailOrUsername === credentials.emailOrUsername
        );
        
        // Check if account already exists in stored accounts
        const existingStoredAccount = accounts.find(
          acc => acc.emailOrUsername === credentials.emailOrUsername
        );
        
        if (existingTestAccount || existingStoredAccount) {
          set({ isLoading: false });
          throw new Error('An account with this email/username already exists');
        }
        
        // Create new account
        const newAccount: StoredAccount = {
          emailOrUsername: credentials.emailOrUsername,
          password: credentials.password,
          name: credentials.emailOrUsername // Use email/username as default name
        };
        
        // Add to accounts array (Zustand persist will handle localStorage)
        set({ 
          accounts: [...accounts, newAccount],
          user: {
            id: Math.random().toString(36).substr(2, 9),
            emailOrUsername: credentials.emailOrUsername,
            name: credentials.emailOrUsername
          },
          isLoading: false 
        });
        
        return true;
      },

      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        accounts: state.accounts 
      }),
    }
  )
);
