import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, Users, Calendar, Settings } from 'lucide-react';

export function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/attendance', label: 'Attendance', icon: Calendar },
    { to: '/students', label: 'Students', icon: Users },
    ...(user?.isAdmin ? [{ to: '/admin', label: 'Admin', icon: Settings }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gradient-to-r from-teal-500 to-teal-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center text-white font-bold text-lg">
              <Calendar className="h-6 w-6 mr-2" />
              Attendance System
            </Link>

            {/* Navigation Links */}
            {user && (
              <div className="flex items-center space-x-6">
                {navLinks.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      location.pathname === to
                        ? 'bg-white text-teal-700 shadow-md'
                        : 'text-gray-200 hover:bg-teal-600 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {label}
                  </Link>
                ))}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-200 hover:bg-red-600 hover:text-white rounded-md"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
