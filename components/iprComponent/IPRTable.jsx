import React from 'react';
import { FileText, Edit, Trash2, Eye } from 'lucide-react';

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

export default IPRTable;