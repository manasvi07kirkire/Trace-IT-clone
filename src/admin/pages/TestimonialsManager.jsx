import React, { useState, useEffect } from 'react';
import ConfirmModal from '../components/ConfirmModal';

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    avatar: '',
    review: '',
    rating: 5,
    featured: false,
  });

  useEffect(() => {
    // Load testimonials from localStorage
    const storedTestimonials = JSON.parse(localStorage.getItem('traceit_testimonials') || '[]');
    
    // Seed with default data if empty
    if (storedTestimonials.length === 0) {
      const defaultTestimonials = [
        {
          id: 1,
          name: "Sarah Johnson",
          role: "Campus Administrator",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
          review: "TraceIT revolutionized our campus lost & found system. Students can now report and find items within minutes instead of days.",
          rating: 5,
          featured: true,
        },
        {
          id: 2,
          name: "Michael Chen",
          role: "Student",
          avatar: "https://randomuser.me/api/portraits/men/2.jpg",
          review: "The smart search feature is incredible. I found my lost laptop within hours of reporting it. The mobile app is fantastic.",
          rating: 5,
          featured: true,
        },
        {
          id: 3,
          name: "Emily Rodriguez",
          role: "IT Director",
          avatar: "https://randomuser.me/api/portraits/women/3.jpg",
          review: "Implementing TraceIT was seamless. The platform is intuitive and our staff needed minimal training to get started.",
          rating: 5,
          featured: false,
        },
        {
          id: 4,
          name: "David Kim",
          role: "Graduate Student",
          avatar: "https://randomuser.me/api/portraits/men/4.jpg",
          review: "The photo matching feature is game-changing. I was able to identify my lost backpack from detailed photos uploaded.",
          rating: 5,
          featured: false,
        },
        {
          id: 5,
          name: "Lisa Anderson",
          role: "Student Affairs Coordinator",
          avatar: "https://randomuser.me/api/portraits/women/5.jpg",
          review: "TraceIT's notification system keeps everyone informed. We've seen a 90% increase in successful item returns.",
          rating: 5,
          featured: true,
        },
        {
          id: 6,
          name: "Jennifer Martinez",
          role: "Operations Manager",
          avatar: "https://randomuser.me/api/portraits/women/6.jpg",
          review: "The platform's analytics help us track lost item patterns and improve our campus services.",
          rating: 5,
          featured: false,
        },
        {
          id: 7,
          name: "Robert Taylor",
          role: "Security Officer",
          avatar: "https://randomuser.me/api/portraits/men/7.jpg",
          review: "As a security officer, TraceIT makes my job easier. The centralized system helps us manage found items efficiently.",
          rating: 4,
          featured: false,
        },
        {
          id: 8,
          name: "Amanda White",
          role: "Undergraduate Student",
          avatar: "https://randomuser.me/api/portraits/women/8.jpg",
          review: "The mobile app is fantastic. I can report lost items right from my phone and get instant notifications.",
          rating: 5,
          featured: false,
        },
        {
          id: 9,
          name: "James Wilson",
          role: "Facilities Manager",
          avatar: "https://randomuser.me/api/portraits/men/9.jpg",
          review: "TraceIT has transformed how we handle lost property. The time savings alone has made it worth every penny.",
          rating: 5,
          featured: false,
        },
      ];
      localStorage.setItem('traceit_testimonials', JSON.stringify(defaultTestimonials));
      setTestimonials(defaultTestimonials);
    } else {
      setTestimonials(storedTestimonials);
    }
  }, []);

  const featuredCount = testimonials.filter(t => t.featured).length;
  const totalCount = testimonials.length;

  const handleAddTestimonial = () => {
    setFormData({
      name: '',
      role: '',
      avatar: '',
      review: '',
      rating: 5,
      featured: false,
    });
    setEditingTestimonial(null);
    setIsModalOpen(true);
  };

  const handleEditTestimonial = (testimonial) => {
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      avatar: testimonial.avatar,
      review: testimonial.review,
      rating: testimonial.rating,
      featured: testimonial.featured,
    });
    setEditingTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleDeleteTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
    setFormData({
      name: '',
      role: '',
      avatar: '',
      review: '',
      rating: 5,
      featured: false,
    });
  };

  const handleSaveTestimonial = () => {
    const updatedTestimonials = editingTestimonial
      ? testimonials.map(t => t.id === editingTestimonial.id ? { ...formData, id: editingTestimonial.id } : t)
      : [...testimonials, { 
          ...formData, 
          id: Math.max(...testimonials.map(t => t.id), 0) + 1 
        }];

    localStorage.setItem('traceit_testimonials', JSON.stringify(updatedTestimonials));
    setTestimonials(updatedTestimonials);
    handleModalClose();
  };

  const handleConfirmDelete = () => {
    if (editingTestimonial) {
      const updatedTestimonials = testimonials.filter(t => t.id !== editingTestimonial.id);
      localStorage.setItem('traceit_testimonials', JSON.stringify(updatedTestimonials));
      setTestimonials(updatedTestimonials);
      handleModalClose();
    }
  };

  const handleToggleFeatured = (testimonial) => {
    const updatedTestimonials = testimonials.map(t =>
      t.id === testimonial.id ? { ...t, featured: !t.featured } : t
    );
    localStorage.setItem('traceit_testimonials', JSON.stringify(updatedTestimonials));
    setTestimonials(updatedTestimonials);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600">
            {totalCount} Testimonials · {featuredCount} Featured
          </p>
        </div>
        <button
          onClick={handleAddTestimonial}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Testimonial
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow">
            {/* Avatar and Info */}
            <div className="flex items-start space-x-4 mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover"
                onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
                <div className="flex items-center mb-2">
                  {renderStars(testimonial.rating)}
                  {testimonial.featured && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Review */}
            <div className="mb-4">
              <p className="text-gray-700 line-clamp-3">
                {testimonial.review.length > 120 
                  ? `${testimonial.review.substring(0, 120)}...` 
                  : testimonial.review}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEditTestimonial(testimonial)}
                className="text-blue-600 hover:text-blue-800 text-xs font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleToggleFeatured(testimonial)}
                className="text-yellow-600 hover:text-yellow-800 text-xs font-medium"
              >
                {testimonial.featured ? 'Unfeature' : 'Feature'}
              </button>
              <button
                onClick={() => handleDeleteTestimonial(testimonial)}
                className="text-red-600 hover:text-red-800 text-xs font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Add/Edit Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md mx-4 w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h3>
            <button
              onClick={handleModalClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter customer name"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter role (e.g., Student, CEO)"
              />
            </div>

            {/* Avatar URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar URL
              </label>
              <input
                type="text"
                value={formData.avatar}
                onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            {/* Review */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review
              </label>
              <textarea
                value={formData.review}
                onChange={(e) => setFormData({...formData, review: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Enter customer review"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating (1-5)
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({...formData, rating: star})}
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      formData.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    <span className="text-lg">★</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">
                Featured Testimonial
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h3>
              <button
                onClick={handleModalClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter customer name"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter role (e.g., Student, CEO)"
                />
              </div>

              {/* Avatar URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar URL
                </label>
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              {/* Review */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review
                </label>
                <textarea
                  value={formData.review}
                  onChange={(e) => setFormData({...formData, review: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Enter customer review"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (1-5)
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({...formData, rating: star})}
                      className={`w-8 h-8 flex items-center justify-center rounded ${
                        formData.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <span className="text-lg">★</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Featured Testimonial
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleModalClose}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingTestimonial ? handleSaveTestimonial : handleAddTestimonial}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingTestimonial ? 'Save Changes' : 'Add Testimonial'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default TestimonialsManager;
