import React from 'react';
import { Search } from 'lucide-react';

const SearchAndFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter, 
  sourceFilter, 
  setSourceFilter 
}) => {
  return (
    <div className="mb-6 p-4 bg-surface rounded-lg border border-white/10">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
            <input
              type="text"
              placeholder="Search papers by title, authors, or DOI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="">All Status</option>
            <option value="Published">Published</option>
            <option value="Under Review">Under Review</option>
            <option value="Draft">Draft</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
          
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-2  border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="">All Sources</option>
            <option value="manual">Manual</option>
            <option value="scholarly">Scholarly</option>
            <option value="imported">Imported</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;