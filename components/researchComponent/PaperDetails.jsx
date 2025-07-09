import React from 'react';
import { Calendar, Users, ExternalLink, FileText, Tag, TrendingUp } from 'lucide-react';

const PaperDetails = ({ paper }) => {
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Title</h3>
        <p className="text-white/90 text-base leading-relaxed">{paper.title}</p>
      </div>

      {/* Abstract */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Abstract</h3>
        <p className="text-white/80 leading-relaxed">{paper.abstract}</p>
      </div>

      {/* Authors */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <Users size={18} />
          Authors
        </h3>
        <p className="text-white/80">{paper.authors}</p>
      </div>

      {/* Publication Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            <Calendar size={18} />
            Publication Date
          </h3>
          <p className="text-white/80">{formatDate(paper.publication_date)}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            <Tag size={18} />
            Status
          </h3>
          <span className={`inline-flex px-3 py-1 rounded-full text-sm border ${getStatusColor(paper.status)}`}>
            {paper.status}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            <TrendingUp size={18} />
            Citations
          </h3>
          <p className="text-white/80">{paper.citations || 0}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            <FileText size={18} />
            Source
          </h3>
          <p className="text-white/80">
            {getSourceIcon(paper.source)} {paper.source}
          </p>
        </div>
      </div>

      {/* DOI */}
      {paper.doi && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            <ExternalLink size={18} />
            DOI
          </h3>
          <a
            href={`https://doi.org/${paper.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-primary transition-colors underline"
          >
            {paper.doi}
          </a>
        </div>
      )}

      {/* Scholar ID */}
      {paper.scholar_id && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Scholar ID</h3>
          <p className="text-white/80">{paper.scholar_id}</p>
        </div>
      )}

      {/* Metadata */}
      <div className="pt-4 border-t border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Metadata</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-white/50">Paper ID</p>
            <p className="text-white/80">{paper.paper_id}</p>
          </div>
          <div>
            <p className="text-white/50">Created</p>
            <p className="text-white/80">{formatDateTime(paper.created_at)}</p>
          </div>
          <div>
            <p className="text-white/50">Last Updated</p>
            <p className="text-white/80">{formatDateTime(paper.updated_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperDetails;