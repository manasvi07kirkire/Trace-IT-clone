import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    pricingPlans: 0,
    blogPosts: 0,
    newInquiries: 0,
    testimonials: 0,
    communityStats: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load statistics from localStorage with error handling
    try {
      const pricingPlans = JSON.parse(localStorage.getItem('traceit_pricing_plans') || '[]');
      const blogPosts = JSON.parse(localStorage.getItem('traceit_blogs') || '[]');
      const contacts = JSON.parse(localStorage.getItem('traceit_contacts') || '[]');
      const testimonials = JSON.parse(localStorage.getItem('traceit_testimonials') || '[]');
      const communityStats = JSON.parse(localStorage.getItem('traceit_community_stats') || '[]');

      const newInquiriesCount = contacts.filter(contact => contact.status === 'New').length;

      setStats({
        pricingPlans: pricingPlans.length,
        blogPosts: blogPosts.length,
        newInquiries: newInquiriesCount,
        testimonials: testimonials.length,
        communityStats: communityStats.length,
      });

      // Get recent 5 inquiries
      const sortedInquiries = contacts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

      setRecentInquiries(sortedInquiries);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Set default values on error
      setStats({
        pricingPlans: 0,
        blogPosts: 0,
        newInquiries: 0,
        testimonials: 0,
        communityStats: 0,
      });
      setRecentInquiries([]);
    }
  }, []);

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleQuickAction = (path) => {
    window.location.href = path;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome to TraceIT Admin Panel</p>
        </div>
        <div className="text-sm text-gray-500">
            {today}
          </div>
        </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {/* Pricing Plans */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Pricing Plans</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.pricingPlans}</p>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">📝</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Blog Posts</h3>
              <p className="text-2xl font-bold text-green-600">{stats.blogPosts}</p>
            </div>
          </div>
        </div>

        {/* New Inquiries */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full">
              <span className="text-2xl">📩</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">New Inquiries</h3>
              <p className={`text-2xl font-bold ${stats.newInquiries > 0 ? 'text-red-600' : 'text-gray-600'}`}>
                {stats.newInquiries}
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">💬</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Testimonials</h3>
              <p className="text-2xl font-bold text-purple-600">{stats.testimonials}</p>
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Community Stats</h3>
              <p className="text-2xl font-bold text-orange-600">{stats.communityStats}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => handleQuickAction('/admin/pricing')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          + Add Pricing Plan
        </button>
        <button
          onClick={() => handleQuickAction('/admin/blogs')}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          + New Blog Post
        </button>
        <button
          onClick={() => handleQuickAction('/admin/testimonials')}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          + Add Testimonial
        </button>
      </div>

      {/* View Live Site Button */}
      <div className="text-center">
        <button
          onClick={() => window.open('https://trace-it-ten.vercel.app/', '_blank')}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          View Live Site →
        </button>
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Inquiries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {inquiry.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {inquiry.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {inquiry.message.length > 60 
                      ? `${inquiry.message.substring(0, 60)}...` 
                      : inquiry.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      inquiry.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      inquiry.status === 'Replied' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => {
                        // TODO: Implement view modal
                      }}
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
