import React, { useState, useEffect } from 'react';
import ConfirmModal from '../components/ConfirmModal';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    // Load contacts from localStorage
    const storedContacts = JSON.parse(localStorage.getItem('traceit_contacts') || '[]');
    
    // Seed with default data if empty
    if (storedContacts.length === 0) {
      const defaultContacts = [
        {
          id: 1,
          name: "Riya Sharma",
          email: "riya@example.com",
          message: "I lost my phone near the library. Can you help?",
          date: "2026-04-01",
          status: "New",
        },
        {
          id: 2,
          name: "Arjun Mehta",
          email: "arjun@example.com",
          message: "Found a wallet near the cafeteria. How do I submit?",
          date: "2026-04-02",
          status: "Replied",
        },
        {
          id: 3,
          name: "Priya Nair",
          email: "priya@example.com",
          message: "I want to use TraceIT for our college fest event.",
          date: "2026-04-03",
          status: "New",
        },
      ];
      localStorage.setItem('traceit_contacts', JSON.stringify(defaultContacts));
      setContacts(defaultContacts);
    } else {
      setContacts(storedContacts);
    }
  }, []);

  const filteredContacts = contacts.filter(contact => {
    if (statusFilter === 'All') return true;
    if (statusFilter === 'New') return contact.status === 'New';
    if (statusFilter === 'Replied') return contact.status === 'Replied';
    if (statusFilter === 'Archived') return contact.status === 'Archived';
    return false;
  });

  const getFilterCount = (status) => {
    return contacts.filter(contact => contact.status === status).length;
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const handleStatusChange = (contactId, newStatus) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === contactId ? { ...contact, status: newStatus } : contact
    );
    localStorage.setItem('traceit_contacts', JSON.stringify(updatedContacts));
    setContacts(updatedContacts);
  };

  const handleDeleteContact = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedContact) {
      const updatedContacts = contacts.filter(contact => contact.id !== selectedContact.id);
      localStorage.setItem('traceit_contacts', JSON.stringify(updatedContacts));
      setContacts(updatedContacts);
      handleModalClose();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Replied': return 'bg-green-100 text-green-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Contact Inquiries 
            {filter !== 'All' && (
              <span className="ml-2 px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                {getFilterCount(filter)}
              </span>
            )}
          </h1>
          <p className="text-gray-600">Manage customer contact requests and support</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6">
        {['All', 'New', 'Replied', 'Archived'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {status}
            {getFilterCount(status) > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                {getFilterCount(status)}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Contacts Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
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
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {contact.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {contact.message.length > 80 
                    ? `${contact.message.substring(0, 80)}...` 
                      : contact.message}
                  </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewContact(contact)}
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact)}
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

      {/* View/Edit Modal */}
      {isModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
              <button
                onClick={handleModalClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={selectedContact.name}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={selectedContact.email}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="text"
                  value={selectedContact.date}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={selectedContact.message}
                  readOnly
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={selectedContact.status}
                  onChange={(e) => handleStatusChange(selectedContact.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="New">New</option>
                  <option value="Replied">Replied</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleStatusChange}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default ContactManager;
