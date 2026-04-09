import React, { useState, useEffect } from 'react';
import ConfirmModal from '../components/ConfirmModal';

const PricingManager = () => {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    price: '',
    billing: '',
    features: '',
    cta: '',
    popular: false,
  });

  useEffect(() => {
    // Load pricing plans from localStorage
    const storedPlans = JSON.parse(localStorage.getItem('traceit_pricing_plans') || '[]');
    
    // Seed with default data if empty
    if (storedPlans.length === 0) {
      const defaultPlans = [
        {
          id: 1,
          name: "Free Plan",
          subtitle: "For basic users",
          price: "Free",
          billing: "",
          features: ["Report lost items", "Submit found items", "Basic item matching", "Community support"],
          cta: "Get Started",
          popular: false,
        },
        {
          id: 2,
          name: "Pro Plan",
          subtitle: "For frequent users",
          price: "$9.99",
          billing: "/mo",
          features: ["Priority matching", "Instant notifications", "Upload multiple item images", "Faster claim verification"],
          cta: "Choose Plan",
          popular: true,
        },
        {
          id: 3,
          name: "Organization Plan",
          subtitle: "For campuses, companies, and institutions",
          price: "Custom",
          billing: "",
          features: ["Dedicated lost & found dashboard", "Bulk item management", "Analytics for reported items", "Admin management tools"],
          cta: "Contact Sales",
          popular: false,
        },
      ];
      localStorage.setItem('traceit_pricing_plans', JSON.stringify(defaultPlans));
      setPlans(defaultPlans);
    } else {
      setPlans(storedPlans);
    }
  }, []);

  const handleAddPlan = () => {
    setFormData({
      name: '',
      subtitle: '',
      price: '',
      billing: '',
      features: '',
      cta: '',
      popular: false,
    });
    setEditingPlan(null);
    setIsModalOpen(true);
  };

  const handleEditPlan = (plan) => {
    setFormData({
      name: plan.name,
      subtitle: plan.subtitle,
      price: plan.price,
      billing: plan.billing,
      features: plan.features.join('\n'),
      cta: plan.cta,
      popular: plan.popular,
    });
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleDeletePlan = (plan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
    setFormData({
      name: '',
      subtitle: '',
      price: '',
      billing: '',
      features: '',
      cta: '',
      popular: false,
    });
  };

  const handleSavePlan = () => {
    const updatedPlans = editingPlan
      ? plans.map(plan => plan.id === editingPlan.id ? { ...formData, id: editingPlan.id } : plan)
      : [...plans, { 
          ...formData, 
          id: Math.max(...plans.map(p => p.id), 0) + 1 
        }];

    localStorage.setItem('traceit_pricing_plans', JSON.stringify(updatedPlans));
    setPlans(updatedPlans);
    handleModalClose();
  };

  const handleConfirmDelete = () => {
    if (editingPlan) {
      const updatedPlans = plans.filter(plan => plan.id !== editingPlan.id);
      localStorage.setItem('traceit_pricing_plans', JSON.stringify(updatedPlans));
      setPlans(updatedPlans);
      handleModalClose();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pricing Plans</h1>
          <p className="text-gray-600">Manage subscription plans and pricing</p>
        </div>
        <button
          onClick={handleAddPlan}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Plan
        </button>
      </div>

      {/* Plans Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Features
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CTA
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Popular
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {plans.map((plan) => (
              <tr key={plan.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {plan.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {plan.price}
                  {plan.billing && <span className="text-xs text-gray-400">{plan.billing}</span>}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {plan.features.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {plan.cta}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {plan.popular && (
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      RECOMMENDED
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditPlan(plan)}
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan)}
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <ConfirmModal
          isOpen={isModalOpen}
          message={`Are you sure you want to ${editingPlan ? 'delete this pricing plan?' : 'save this new pricing plan?'}`}
          onConfirm={editingPlan ? handleConfirmDelete : handleSavePlan}
          onCancel={handleModalClose}
        />
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingPlan ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
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
                  Plan Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter plan name"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter plan subtitle"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price (e.g., $9.99)"
                />
              </div>

              {/* Billing */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Billing Period
                </label>
                <input
                  type="text"
                  value={formData.billing}
                  onChange={(e) => setFormData({...formData, billing: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter billing period (e.g., /mo)"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features (one per line)
                </label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Enter features (one per line)"
                />
              </div>

              {/* CTA */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CTA Label
                </label>
                <input
                  type="text"
                  value={formData.cta}
                  onChange={(e) => setFormData({...formData, cta: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter CTA label (e.g., Get Started)"
                />
              </div>

              {/* Popular Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.popular}
                  onChange={(e) => setFormData({...formData, popular: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Popular Plan
                </label>
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
                onClick={editingPlan ? handleSavePlan : handleAddPlan}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {editingPlan ? 'Save Changes' : 'Add Plan'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default PricingManager;
