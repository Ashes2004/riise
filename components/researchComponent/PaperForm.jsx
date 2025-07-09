import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

const PaperForm = ({ paper, onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    authors: '',
    publication_date: '',
    doi: '',
    status: 'Draft',
    citations: 0,
    scholar_id: '',
    source: 'manual'
  });

  useEffect(() => {
    if (paper) {
      setFormData({
        title: paper.title || '',
        abstract: paper.abstract || '',
        authors: paper.authors || '',
        publication_date: paper.publication_date || '',
        doi: paper.doi || '',
        status: paper.status || 'Draft',
        citations: paper.citations || 0,
        scholar_id: paper.scholar_id || '',
        source: paper.source || 'manual'
      });
    }
  }, [paper]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const isEditing = !!paper;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-background border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Enter paper title"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white mb-2">
            Abstract *
          </label>
          <textarea
            name="abstract"
            value={formData.abstract}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 bg-background border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            placeholder="Enter paper abstract"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white mb-2">
            Authors *
          </label>
          <input
            type="text"
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-background border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Enter authors (comma-separated)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Publication Date
          </label>
          <input
            type="date"
            name="publication_date"
            value={formData.publication_date}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-background border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            DOI
          </label>
          <input
            type="text"
            name="doi"
            value={formData.doi}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-background border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="10.1234/journal.2024.001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-background border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="Draft">Draft</option>
            <option value="Under Review">Under Review</option>
            <option value="Published">Published</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Citations
          </label>
          <input
            type="number"
            name="citations"
            value={formData.citations}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 bg-background border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Scholar ID
          </label>
          <input
            type="text"
            name="scholar_id"
            value={formData.scholar_id}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-background border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="scholar123"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Source
          </label>
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-background border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="manual">Manual</option>
            <option value="scholarly">Scholarly</option>
            <option value="imported">Imported</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
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
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primaryDark rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={16} />
          {isLoading ? 'Saving...' : isEditing ? 'Update Paper' : 'Add Paper'}
        </button>
      </div>
    </form>
  );
};

export default PaperForm;