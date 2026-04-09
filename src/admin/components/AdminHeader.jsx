import React from 'react';
import { useLocation } from 'react-router-dom';

const AdminHeader = () => {
  const location = useLocation();
  
  const getPageTitle = (pathname) => {
    const pathMap = {
      '/admin': 'Dashboard',
      '/admin/pricing': 'Pricing Plans',
      '/admin/contacts': 'Contact Inquiries',
      '/admin/blogs': 'Blog Posts',
      '/admin/testimonials': 'Testimonials',
      '/admin/community': 'Community Impact',
    };
    
    return pathMap[pathname] || 'Dashboard';
  };

  const handleLogout = () => {
    localStorage.removeItem('traceit_admin_auth');
    window.location.href = '/admin/login';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Page Title */}
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900">
              {getPageTitle(location.pathname)}
            </h1>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">👤 Admin</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
