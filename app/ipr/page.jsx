"use client"
import React, { useState, useEffect } from 'react';
import { FileText, Plus, Upload, Calendar, CheckCircle, Clock, TrendingUp, Edit, Trash2, Eye } from 'lucide-react';
import Header from '@/components/universal/Header';




// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, color, bgColor }) => {
  return (
    <div className={`${bgColor} border border-gray-700 rounded-lg p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-full`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

// IPR Table Component
const IPRTable = ({ iprs, onEdit, onDelete, onView }) => {
  const getStatusBadge = (status) => {
    const statusColors = {
      'Filed': 'bg-blue-100 text-blue-800',
      'Granted': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Published': 'bg-purple-100 text-purple-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const getIPRTypeBadge = (type) => {
    const typeColors = {
      'Patent': 'bg-indigo-100 text-indigo-800',
      'Trademark': 'bg-pink-100 text-pink-800',
      'Copyright': 'bg-cyan-100 text-cyan-800',
      'Design': 'bg-orange-100 text-orange-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[type] || 'bg-gray-100 text-gray-800'}`}>
        {type}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                IPR Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                IPR Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Filing Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {iprs.map((ipr) => (
              <tr key={ipr.ipr_id} className="hover:bg-gray-750">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-white">{ipr.title}</p>
                      <p className="text-xs text-gray-400">ID: {ipr.ipr_id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getIPRTypeBadge(ipr.ipr_type)}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-300">{ipr.ipr_number || '-'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-300">{formatDate(ipr.filing_date)}</span>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(ipr.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onView(ipr)}
                      className="text-blue-400 hover:text-blue-300 p-1"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(ipr)}
                      className="text-green-400 hover:text-green-300 p-1"
                      title="Edit IPR"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(ipr)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Delete IPR"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Add IPR Modal Component
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

// Main IPR Page Component
const IPRPage = () => {
  const [iprs, setIPRs] = useState([]);
  const [filteredIPRs, setFilteredIPRs] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const BASE_URL = 'http://localhost:3000/api/v1/ipr';

  // Fetch IPRs from API
  const fetchIPRs = async () => {
    try {
      setLoading(true);
      const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIPRs(data);
      setFilteredIPRs(data);
    } catch (error) {
      setError('Failed to fetch IPRs: ' + error.message);
      console.error('Error fetching IPRs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIPRs();
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredIPRs(iprs);
    } else {
      const filtered = iprs.filter(ipr =>
        ipr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ipr.ipr_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ipr.ipr_number && ipr.ipr_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ipr.status && ipr.status.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredIPRs(filtered);
    }
  }, [searchTerm, iprs]);

  const handleAddIPR = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/add-ipr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newIPR = await response.json();
      setIPRs([...iprs, newIPR]);
      setIsAddModalOpen(false);
      setError(null);
    } catch (error) {
      setError('Failed to add IPR: ' + error.message);
      console.error('Error adding IPR:', error);
    }
  };

  const handleEdit = async (ipr) => {
    try {
      // You can implement edit modal here or navigate to edit page
      console.log('Edit IPR:', ipr);
      // Example API call for update:
      // const response = await fetch(`${BASE_URL}/update-ipr/${ipr.ipr_id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      //   },
      //   body: JSON.stringify(updatedData)
      // });
    } catch (error) {
      setError('Failed to update IPR: ' + error.message);
    }
  };

  const handleDelete = async (ipr) => {
    if (window.confirm('Are you sure you want to delete this IPR?')) {
      try {
        const response = await fetch(`${BASE_URL}/delete-ipr/${ipr.ipr_id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setIPRs(iprs.filter(i => i.ipr_id !== ipr.ipr_id));
        setError(null);
      } catch (error) {
        setError('Failed to delete IPR: ' + error.message);
        console.error('Error deleting IPR:', error);
      }
    }
  };

  const handleView = (ipr) => {
    console.log('View IPR:', ipr);
    // Implement view functionality
  };

  const stats = {
    total: filteredIPRs.length,
    granted: filteredIPRs.filter(ipr => ipr.status === 'Granted').length,
    pending: filteredIPRs.filter(ipr => ipr.status === 'Pending').length,
    patents: filteredIPRs.filter(ipr => ipr.ipr_type === 'Patent').length
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0613 0%, #150d27 100%)' }}>
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 " style={{ background: 'linear-gradient(135deg, #0a0613 0%, #150d27 100%)' }}>
      <Header />
      
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 mx-6  rounded-lg">
          <div className="flex items-center">
            <span className="mr-2">⚠</span>
            {error}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Intellectual Property Rights</h1>
            <p className="text-gray-400 mt-2">Manage your IP portfolio and track applications</p>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>Add IPR</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search IPRs by title, type, number, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total IPRs"
            value={stats.total}
            icon={FileText}
            color="bg-blue-600"
            bgColor="bg-gray-800"
          />
          <StatsCard
            title="Granted"
            value={stats.granted}
            icon={CheckCircle}
            color="bg-green-600"
            bgColor="bg-gray-800"
          />
          <StatsCard
            title="Pending"
            value={stats.pending}
            icon={Clock}
            color="bg-yellow-600"
            bgColor="bg-gray-800"
          />
          <StatsCard
            title="Patents"
            value={stats.patents}
            icon={TrendingUp}
            color="bg-purple-600"
            bgColor="bg-gray-800"
          />
        </div>

        {/* IPR Table */}
        {filteredIPRs.length > 0 ? (
          <IPRTable 
            iprs={filteredIPRs} 
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              {searchTerm ? 'No IPRs found matching your search' : 'No IPRs found'}
            </h3>
            <p className="text-gray-400 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Add your first IPR to get started'}
            </p>
            {!searchTerm && (
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Add IPR
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add IPR Modal */}
      <AddIPRModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddIPR}
      />
    </div>
  );
};

export default IPRPage;