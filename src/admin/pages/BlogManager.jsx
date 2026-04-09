import React, { useState, useEffect } from 'react';
import ConfirmModal from '../components/ConfirmModal';

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    author: 'Admin',
    category: 'Product',
    tags: '',
    coverImage: '',
    content: '',
    status: 'Draft',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    // Load blog posts from localStorage
    const storedPosts = JSON.parse(localStorage.getItem('traceit_blogs') || '[]');
    
    // Seed with default data if empty
    if (storedPosts.length === 0) {
      const defaultPosts = [
        {
          id: 1,
          title: "How TraceIT is Changing Campus Lost & Found",
          slug: "traceit-changing-campus-lost-found",
          author: "Admin",
          category: "Product",
          tags: "campus, lost, found",
          coverImage: "",
          content: "TraceIT is revolutionizing how campuses handle lost and found items...",
          status: "Published",
          date: "2026-03-15",
        },
        {
          id: 2,
          title: "5 Tips to Keep Track of Your Belongings",
          slug: "5-tips-track-belongings",
          author: "Admin",
          category: "Tips",
          tags: "tips, belongings, campus",
          coverImage: "",
          content: "Losing your belongings can be stressful. Here are 5 tips...",
          status: "Draft",
          date: "2026-04-01",
        },
      ];
      localStorage.setItem('traceit_blogs', JSON.stringify(defaultPosts));
      setPosts(defaultPosts);
    } else {
      setPosts(storedPosts);
    }
  }, []);

  const handleAddPost = () => {
    setFormData({
      title: '',
      slug: '',
      author: 'Admin',
      category: 'Product',
      tags: '',
      coverImage: '',
      content: '',
      status: 'Draft',
      date: new Date().toISOString().split('T')[0],
    });
    setEditingPost(null);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleEditPost = (post) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      author: post.author,
      category: post.category,
      tags: post.tags,
      coverImage: post.coverImage,
      content: post.content,
      status: post.status,
      date: post.date,
    });
    setEditingPost(post);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeletePost = (post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingPost(null);
    setIsEditing(false);
    setFormData({
      title: '',
      slug: '',
      author: 'Admin',
      category: 'Product',
      tags: '',
      coverImage: '',
      content: '',
      status: 'Draft',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleSavePost = () => {
    const updatedPosts = editingPost
      ? posts.map(post => post.id === editingPost.id ? { ...formData, id: editingPost.id } : post)
      : [...posts, { 
          ...formData, 
          id: Math.max(...posts.map(p => p.id), 0) + 1 
        }];

    localStorage.setItem('traceit_blogs', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    handleModalClose();
  };

  const handleConfirmDelete = () => {
    if (editingPost) {
      const updatedPosts = posts.filter(post => post.id !== editingPost.id);
      localStorage.setItem('traceit_blogs', JSON.stringify(updatedPosts));
      setPosts(updatedPosts);
      handleModalClose();
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/^-+/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '');
  };

  const handleTitleChange = (title) => {
    const slug = generateSlug(title);
    setFormData({...formData, title, slug});
  };

  const getStatusColor = (status) => {
    return status === 'Published' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600">Manage blog content and articles</p>
        </div>
        <button
          onClick={isEditing ? handleModalClose : handleAddPost}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {isEditing ? 'Cancel' : '+ New Blog Post'}
        </button>
      </div>

      {/* Content */}
      {!isEditing ? (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post)}
                        className="text-red-600 hover:text-red-800 text-xs font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Full-width Editor Form */
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h3>
            <button
              onClick={handleModalClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog post title"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="blog-post-url"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Product">Product</option>
                <option value="Tips">Tips</option>
                <option value="News">News</option>
                <option value="Tutorial">Tutorial</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="campus, lost, found"
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image URL
              </label>
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={10}
                placeholder="Write your blog post content here..."
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
              onClick={editingPost ? handleSavePost : handleAddPost}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {editingPost ? 'Save Changes' : 'Publish Post'}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Delete Confirmation Modal */}
    {isModalOpen && (
      <ConfirmModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this blog post?"
        onConfirm={handleConfirmDelete}
        onCancel={handleModalClose}
      />
    )}
  </div>
);

export default BlogManager;
