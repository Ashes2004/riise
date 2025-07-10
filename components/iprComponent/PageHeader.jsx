import React from 'react';
import { Plus, Upload } from 'lucide-react';

const PageHeader = ({ onAddClick }) => {
  return (
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
          onClick={onAddClick}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add IPR</span>
        </button>
      </div>
    </div>
  );
};

export default PageHeader;