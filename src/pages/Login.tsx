import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login({
        id: '1',
        email,
        name: 'Admin User',
        isAdmin: true,
      });
      navigate('/');
      toast.success('Logged in successfully');
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-6 relative overflow-hidden">
      {/* Main headline outside the form container */}
      <h1 className="text-6xl font-extrabold text-gray-900 text-center mb-10">
        Welcome Back to Your Dashboard!
      </h1>

      {/* Animated icons */}
      <div className="absolute top-10 left-10 animate-bounce text-blue-500">
        <svg className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="6" x2="12" y2="12" />
          <line x1="12" y1="12" x2="16" y2="16" />
        </svg>
      </div>
      <div className="absolute top-16 right-10 animate-pulse text-indigo-500">
        <svg className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v12" />
          <path d="M12 20h0" />
        </svg>
      </div>
      <div className="absolute bottom-16 left-1/4 animate-spin text-pink-500">
        <svg className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v4" />
          <path d="M12 18v4" />
        </svg>
      </div>

      {/* Login Form */}
      <div className="max-w-md w-full bg-white p-10 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600">
            Sign in to continue to your dashboard.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                type="email"
                id="email"
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                type="password"
                id="password"
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <a
            href="/register"
            className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
