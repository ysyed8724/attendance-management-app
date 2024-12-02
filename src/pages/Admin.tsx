import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plus, Edit2, Trash2, Shield, ShieldOff } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { UserModal } from '../components/UserModal';
import { toast } from 'react-hot-toast';
import { User } from '../types';

export function Admin() {
  const { users, addUser, updateUser, deleteUser, toggleAdminStatus } = useUserStore();
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddUser = (userData: { email: string; name: string; isAdmin: boolean }) => {
    addUser(userData);
    setIsAddingUser(false);
    toast.success('User added successfully');
  };

  const handleEditUser = (userData: { email: string; name: string; isAdmin: boolean }) => {
    if (editingUser) {
      updateUser(editingUser.id, userData);
      setEditingUser(null);
      toast.success('User updated successfully');
    }
  };

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
    toast.success('User deleted successfully');
  };

  const handleToggleAdmin = (id: string) => {
    toggleAdminStatus(id);
    toast.success('User admin status updated');
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-gray-200 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-800">User Management</h1>
        <button
          onClick={() => setIsAddingUser(true)}
          className="flex items-center px-5 py-2 bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:from-teal-500 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Created</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Last Login</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs font-semibold leading-5 rounded-full ${
                      user.isAdmin ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(user.createdAt), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastLogin
                    ? format(new Date(user.lastLogin), 'MMM d, yyyy HH:mm')
                    : 'Never'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleToggleAdmin(user.id)}
                      className="text-gray-500 hover:text-gray-700"
                      title={user.isAdmin ? 'Remove admin rights' : 'Make admin'}
                    >
                      {user.isAdmin ? <ShieldOff className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={() => setEditingUser(user)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserModal
        isOpen={isAddingUser}
        onClose={() => setIsAddingUser(false)}
        onSave={handleAddUser}
      />

      <UserModal
        user={editingUser || undefined}
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleEditUser}
      />
    </div>
  );
}
