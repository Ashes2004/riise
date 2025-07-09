import React, { useState } from 'react';
import { Search, User, X } from 'lucide-react';

const ScholarSearch = ({ onSearch, isLoading, onCancel }) => {
  const [searchType, setSearchType] = useState('scholar'); // 'scholar' or 'author'
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchType, searchValue.trim());
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Search Type
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSearchType('scholar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              searchType === 'scholar'
                ? 'bg-primary text-white border-primary'
                : 'bg-background text-white/80 border-white/20 hover:bg-white/10'
            }`}
          >
            🎓 Scholar ID
          </button>
          <button
            type="button"
            onClick={() => setSearchType('author')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              searchType === 'author'
                ? 'bg-primary text-white border-primary'
                : 'bg-background text-white/80 border-white/20 hover:bg-white/10'
            }`}
          >
            <User size={16} />
            Author Name
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            {searchType === 'scholar' ? 'Google Scholar ID' : 'Author Name'}
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={
                searchType === 'scholar' 
                  ? 'Enter Google Scholar ID (e.g., scholar123)' 
                  : 'Enter author name (e.g., John Smith)'
              }
              className="w-full pl-10 pr-4 py-2 bg-background border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={16} />
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || !searchValue.trim()}
            className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primaryDark rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search size={16} />
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {searchType === 'scholar' && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h4 className="text-blue-400 font-medium mb-2">About Scholar ID Search</h4>
          <p className="text-white/70 text-sm">
            This will fetch papers associated with a specific Google Scholar profile ID. 
            The system will import all papers from that profile.
          </p>
        </div>
      )}

      {searchType === 'author' && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <h4 className="text-green-400 font-medium mb-2">About Author Name Search</h4>
          <p className="text-white/70 text-sm">
            This will search for papers by a specific author name across multiple sources. 
            Results may include papers from different publications and databases.
          </p>
        </div>
      )}
    </div>
  );
};

export default ScholarSearch;