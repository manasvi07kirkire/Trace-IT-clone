import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Hardcoded credentials validation
    if (email === 'admin' && password === 'traceit@admin123') {
      localStorage.setItem('traceit_admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center px-4">
      {/* Back to TraceIT Link */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-white hover:text-blue-200 transition-colors"
        >
          <span className="mr-2">←</span>
          <span>Back to TraceIT</span>
        </button>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">TraceIT</h1>
            <p className="text-lg text-gray-600">Admin Panel</p>
          </div>
          
          {/* Admin Access Badge */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full flex items-center">
              <span className="mr-1">🔒</span>
              Secured Admin Access
            </div>
          </div>

          {/* Admin Note */}
          <p className="text-sm text-gray-500 text-center mb-6">
            This area is for administrators only. If you are a regular user, go back to homepage.
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a6 6 0 0 6 6m0 0a4 4 0 0 0 4 4m0-6s2.5 4 4 0 0 0 4 4s2.5 4 0 0 0 4 4s1 4 0 0 0 4 0-2.5 4 0 0 0 4 0z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a6 6 0 0 6 6m0 0a4 4 0 0 0 4 4m0-6s2.5 4 0 0 4 4s1 4 0 0 4 0-2.5 4 0 0 4 0z" />
                      <path d="M1.5 9a4.5 4 0 0 6 4m0 0a4 4 0 0 0 0 4 4m0-6s1.5 4 0 0 0 4 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
