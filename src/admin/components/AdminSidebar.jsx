import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [newInquiriesCount, setNewInquiriesCount] = useState(0);

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('traceit_contacts') || '[]');
    const newCount = contacts.filter(contact => contact.status === 'New').length;
    setNewInquiriesCount(newCount);
  }, []);

  const navigation = [
    { path: '/admin', icon: '🏠', label: 'Dashboard' },
    { path: '/admin/pricing', icon: '💰', label: 'Pricing Plans' },
    { path: '/admin/contacts', icon: '📩', label: 'Contact Inquiries', badge: newInquiriesCount },
    { path: '/admin/blogs', icon: '📝', label: 'Blog Posts' },
    { path: '/admin/testimonials', icon: '💬', label: 'Testimonials' },
    { path: '/admin/community', icon: '📊', label: 'Community Impact' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('traceit_admin_auth');
    navigate('/admin/login');
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold">🛡️</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">TraceIT Admin</h1>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-gray-800 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
            {item.badge > 0 && (
              <span className="ml-auto bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t border-gray-800 my-4"></div>

      {/* Bottom Actions */}
      <div className="mt-auto p-4 space-y-2">
        <button
          onClick={() => window.open('/', '_blank')}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-gray-300 hover:text-white transition-colors rounded-lg"
        >
          <span>←</span>
          <span>View Live Site</span>
        </button>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white transition-colors rounded-lg"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
