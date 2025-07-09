import React from 'react';
import { Plus, Upload } from 'lucide-react';

const DashboardHeader = ({ onAddPaper, onImportPaper, onFetchByScholar, onFetchByAuthor }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Research Papers</h1>
          <p className="text-white/70">Manage your research publications and track citations</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onFetchByScholar}
            className="flex items-center gap-2 px-4 py-2 bg-surface border border-white/10 rounded-lg text-white/80 hover:bg-surfaceAlt transition-colors"
          >
            🎓 Scholar ID
          </button>
          <button
            onClick={onFetchByAuthor}
            className="flex items-center gap-2 px-4 py-2 bg-surface border border-white/10 rounded-lg text-white/80 hover:bg-surfaceAlt transition-colors"
          >
            👤 Author Name
          </button>
          <button
            onClick={onImportPaper}
            className="flex items-center gap-2 px-4 py-2 bg-surface border border-white/10 rounded-lg text-white/80 hover:bg-surfaceAlt transition-colors"
          >
            <Upload size={18} />
            Import
          </button>
          <button
            onClick={onAddPaper}
            className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primaryDark rounded-lg text-white font-medium transition-colors"
            style={{ boxShadow: '0 0 20px rgba(155, 135, 245, 0.2)' }}
          >
            <Plus size={18} />
            Add Paper
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;