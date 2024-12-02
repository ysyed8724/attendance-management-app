import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  register: (user: User) => void; // Added register method
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Retrieve stored user and authentication state from localStorage
  const storedUser = localStorage.getItem('user');
  const storedAuthStatus = localStorage.getItem('isAuthenticated');
  
  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: storedAuthStatus === 'true',
    login: (user) => {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      set({ user, isAuthenticated: true });
    },
    register: (user) => {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      set({ user, isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      set({ user: null, isAuthenticated: false });
    },
  };
});
