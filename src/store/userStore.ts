import { create } from 'zustand';
import { User } from '../types';

interface UserState {
  users: User[];
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  toggleAdminStatus: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [
    {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      isAdmin: true,
      createdAt: new Date(),
      lastLogin: new Date(),
    },
  ],
  addUser: (userData) =>
    set((state) => ({
      users: [
        ...state.users,
        {
          ...userData,
          id: Date.now().toString(),
          createdAt: new Date(),
        },
      ],
    })),
  updateUser: (id, updates) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updates } : user
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  toggleAdminStatus: (id) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, isAdmin: !user.isAdmin } : user
      ),
    })),
}));