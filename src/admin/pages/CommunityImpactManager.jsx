import React, { useState, useEffect } from 'react';
import ConfirmModal from '../components/ConfirmModal';

const CommunityImpactManager = () => {
  const [stats, setStats] = useState([]);
  const [settings, setSettings] = useState({
    sectionTitle: 'Community Impact',
    sectionSubtitle: 'See how TraceIT is making a difference in communities worldwide with real-time statistics and success metrics.',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState(null);
  const [editingSettings, setEditingSettings] = useState(false);
  const [formData, setFormData] = useState({
    value: '',
    label: '',
    description: '',
  });

  useEffect(() => {
    // Load stats from localStorage
    const storedStats = JSON.parse(localStorage.getItem('traceit_community_stats') || '[]');
    
    // Seed with default data if empty
    if (storedStats.length === 0) {
      const defaultStats = [
        {
          id: 1,
          value: "85%",
          label: "Items Recovered",
          description: "Of all reported items are successfully recovered",
        },
        {
          id: 2,
          value: "92%",
          label: "Active Users",
          description: "Users actively engaged with platform monthly",
        },
        {
          id: 3,
          value: "78%",
          label: "Success Rate",
          description: "Overall success rate in item reunification",
        },
        {
          id: 4,
          value: "95%",
          label: "User Satisfaction",
          description: "Users rate their experience as excellent",
        },
      ];
      localStorage.setItem('traceit_community_stats', JSON.stringify(defaultStats));
      setStats(defaultStats);
    } else {
      setStats(storedStats);
    }

    // Load settings from localStorage
    const storedSettings = JSON.parse(localStorage.getItem('traceit_community_settings') || '{}');
    if (Object.keys(storedSettings).length > 0) {
      setSettings(storedSettings);
    }
  }, []);

  const handleAddStat = () => {
    setFormData({
      value: '',
      label: '',
      description: '',
    });
    setEditingStat(null);
    setIsModalOpen(true);
  };

  const handleEditStat = (stat) => {
    setFormData({
      value: stat.value,
      label: stat.label,
      description: stat.description,
    });
    setEditingStat(stat);
    setIsModalOpen(true);
  };

  const handleDeleteStat = (stat) => {
    setEditingStat(stat);
    setIsModalOpen(true);
  };

  const handleEditSettings = () => {
    setEditingSettings(true);
    setIsModalOpen(true);
    setFormData({
      sectionTitle: settings.sectionTitle,
      sectionSubtitle: settings.sectionSubtitle,
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingStat(null);
    setEditingSettings(false);
    setFormData({
      value: '',
      label: '',
      description: '',
    });
  };

  const handleSaveStat = () => {
    const updatedStats = editingStat
      ? stats.map(stat => stat.id === editingStat.id ? { ...formData, id: editingStat.id } : stat)
      : [...stats, { 
          ...formData, 
          id: Math.max(...stats.map(s => s.id), 0) + 1 
        }];

    localStorage.setItem('traceit_community_stats', JSON.stringify(updatedStats));
    setStats(updatedStats);
    handleModalClose();
  };

  const handleSaveSettings = () => {
    const updatedSettings = {
      ...settings,
      ...formData,
    };
    localStorage.setItem('traceit_community_settings', JSON.stringify(updatedSettings));
    setSettings(updatedSettings);
    handleModalClose();
  };

  const handleConfirmDelete = () => {
    if (editingStat) {
      const updatedStats = stats.filter(stat => stat.id !== editingStat.id);
      localStorage.setItem('traceit_community_stats', JSON.stringify(updatedStats));
      setStats(updatedStats);
      handleModalClose();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Impact</h1>
          <p className="text-gray-600">Manage community statistics and section settings</p>
        </div>
        <button
          onClick={handleAddStat}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Stat
        </button>
      </div>

      {/* Section Settings Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Section Settings</h2>
          <button
            onClick={handleEditSettings}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Edit Settings
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title
            </label>
            <input
              type="text"
              value={formData.sectionTitle}
              onChange={(e) => setFormData({...formData, sectionTitle: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter section title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Subtitle
            </label>
            <textarea
              value={formData.sectionSubtitle}
              onChange={(e) => setFormData({...formData, sectionSubtitle: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Enter section subtitle"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={handleModalClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
          <div className="bg-white p-4 rounded border border-gray-200">
            <h4 className="text-lg font-medium text-gray-900 mb-2">{settings.sectionTitle}</h4>
            <p className="text-gray-600 mb-4">{settings.sectionSubtitle}</p>
            
            {/* Stats Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="text-center mb-2">
                    <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{stat.label}</h3>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditStat(stat)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteStat(stat)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && !editingSettings && (
        <ConfirmModal
          isOpen={isModalOpen}
          message="Are you sure you want to delete this statistic?"
          onConfirm={handleConfirmDelete}
          onCancel={handleModalClose}
        />
      )}

      {/* Settings Modal */}
      {isModalOpen && editingSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Section Settings</h3>
              <button
                onClick={handleModalClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Title
                </label>
                <input
                  type="text"
                  value={formData.sectionTitle}
                  onChange={(e) => setFormData({...formData, sectionTitle: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter section title"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subtitle
                </label>
                <textarea
                  value={formData.sectionSubtitle}
                  onChange={(e) => setFormData({...formData, sectionSubtitle: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter section subtitle"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleModalClose}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save Settings
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

export default CommunityImpactManager;
