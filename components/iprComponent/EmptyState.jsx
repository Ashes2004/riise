import React from 'react';
import { FileText } from 'lucide-react';

const EmptyState = ({ hasSearchTerm, searchTerm, onAddClick }) => {
  return (
    <div className="text-center py-12">
      <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-white mb-2">
        {hasSearchTerm ? 'No IPRs found matching your search' : 'No IPRs found'}
      </h3>
      <p className="text-gray-400 mb-4">
        {hasSearchTerm ? 'Try adjusting your search terms' : 'Add your first IPR to get started'}
      </p>
      {!hasSearchTerm && (
        <button 
          onClick={onAddClick}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Add IPR
        </button>
      )}
    </div>
  );
};

export default EmptyState;