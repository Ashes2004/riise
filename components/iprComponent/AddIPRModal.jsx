import React, { useState } from 'react';

const AddIPRModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    ipr_type: '',
    ipr_number: '',
    filing_date: '',
    status: '',
    related_startup_id: ''
  });

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      title: '',
      ipr_type: '',
      ipr_number: '',
      filing_date: '',
      status: '',
      related_startup_id: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-white mb-4">Add New IPR</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">IPR Type</label>
            <select
              required
              value={formData.ipr_type}
              onChange={(e) => setFormData({...formData, ipr_type: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="Patent">Patent</option>
              <option value="Trademark">Trademark</option>
              <option value="Copyright">Copyright</option>
              <option value="Design">Design</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">IPR Number</label>
            <input
              type="text"
              value={formData.ipr_number}
              onChange={(e) => setFormData({...formData, ipr_number: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Filing Date</label>
            <input
              type="date"
              value={formData.filing_date}
              onChange={(e) => setFormData({...formData, filing_date: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Status</option>
              <option value="Filed">Filed</option>
              <option value="Pending">Pending</option>
              <option value="Granted">Granted</option>
              <option value="Published">Published</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Related Startup ID</label>
            <input
              type="number"
              value={formData.related_startup_id}
              onChange={(e) => setFormData({...formData, related_startup_id: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add IPR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIPRModal;