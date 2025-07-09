import React from 'react';
import { Edit, Trash2, Eye, Calendar, Users, ExternalLink } from 'lucide-react';

const PaperCard = ({ paper, onEdit, onDelete, onView }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Under Review':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Draft':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'Accepted':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-white/10 text-white/70 border-white/20';
    }
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case 'scholarly':
        return '🎓';
      case 'imported':
        return '📥';
      default:
        return '✏️';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-surface border border-white/10 rounded-lg p-6 hover:bg-surfaceAlt transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            {paper.title}
          </h3>
          <p className="text-white/70 text-sm mb-3 line-clamp-2">
            {paper.abstract}
          </p>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onView(paper)}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="View details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEdit(paper)}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Edit paper"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(paper)}
            className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            title="Delete paper"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
        <div className="flex items-center gap-1">
          <Users size={14} />
          <span>{paper.authors}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{formatDate(paper.publication_date)}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(paper.status)}`}>
            {paper.status}
          </span>
          <span className="text-xs text-white/50">
            {getSourceIcon(paper.source)} {paper.source}
          </span>
          <span className="text-xs text-white/50">
            📈 {paper.citations || 0} citations
          </span>
        </div>
        
        {paper.doi && (
          <a
            href={`https://doi.org/${paper.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-accent hover:text-primary transition-colors"
          >
            <ExternalLink size={12} />
            DOI
          </a>
        )}
      </div>
      
      {paper.scholar_id && (
        <div className="mt-2 text-xs text-white/40">
          Scholar ID: {paper.scholar_id}
        </div>
      )}
    </div>
  );
};

export default PaperCard;