"use client"
import React, { useState, useEffect } from 'react';
import { FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

// Component imports
import DashboardHeader from '@/components/researchComponent/DashboardHeader';
import SearchAndFilter from '@/components/researchComponent/SearchAndFilter';
import PaperCard from '@/components/researchComponent/PaperCard';
import StatsOverview from '@/components/researchComponent/StatsOverview';
import Modal from '@/components/researchComponent/Modal';
import PaperForm from '@/components/researchComponent/PaperForm';
import PaperDetails from '@/components/researchComponent/PaperDetails';
import ScholarSearch from '@/components/researchComponent/ScholarSerach';

// API service
import researchService from '../api/researchService';
import Header from '@/components/universal/Header';

const ResearchDashboard = () => {
  // State management
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch papers on component mount
  useEffect(() => {
    fetchPapers();
  }, []);

  // API Functions
  const fetchPapers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await researchService.getAllPapers();
      setPapers(response.data || response || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch papers');
      console.error('Error fetching papers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPaper = async (paperData) => {
    try {
      setIsSubmitting(true);
      const response = await researchService.addPaper(paperData);
      setPapers(prev => [...prev, response.data || response]);
      setShowModal(false);
      setSelectedPaper(null);
      showNotification('Paper added successfully!', 'success');
    } catch (err) {
      setError(err.message || 'Failed to add paper');
      showNotification('Failed to add paper', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePaper = async (paperData) => {
    try {
      setIsSubmitting(true);
      const response = await researchService.updatePaper(selectedPaper.paper_id, paperData);
      setPapers(prev => prev.map(p => 
        p.paper_id === selectedPaper.paper_id ? { ...p, ...response.data || response } : p
      ));
      setShowModal(false);
      setSelectedPaper(null);
      showNotification('Paper updated successfully!', 'success');
    } catch (err) {
      setError(err.message || 'Failed to update paper');
      showNotification('Failed to update paper', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePaper = async (paper) => {
    if (window.confirm(`Are you sure you want to delete "${paper.title}"?`)) {
      try {
        await researchService.deletePaper(paper.paper_id);
        setPapers(prev => prev.filter(p => p.paper_id !== paper.paper_id));
        showNotification('Paper deleted successfully!', 'success');
      } catch (err) {
        setError(err.message || 'Failed to delete paper');
        showNotification('Failed to delete paper', 'error');
      }
    }
  };

  const handleScholarSearch = async (searchType, searchValue) => {
    try {
      setIsSubmitting(true);
      let response;
      
      if (searchType === 'scholar') {
        response = await researchService.fetchByScholarId(searchValue);
      } else {
        response = await researchService.fetchByAuthorName(searchValue);
      }
      
      const newPapers = response.data || response || [];
      if (newPapers.length > 0) {
        setPapers(prev => {
          const existingIds = new Set(prev.map(p => p.paper_id));
          const uniqueNewPapers = newPapers.filter(p => !existingIds.has(p.paper_id));
          return [...prev, ...uniqueNewPapers];
        });
        showNotification(`Found ${newPapers.length} papers!`, 'success');
      } else {
        showNotification('No papers found', 'info');
      }
      
      setShowModal(false);
    } catch (err) {
      setError(err.message || 'Search failed');
      showNotification('Search failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter papers based on search and filters
  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.authors?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.doi?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || paper.status === statusFilter;
    const matchesSource = !sourceFilter || paper.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  // Modal handlers
  const openAddPaperModal = () => {
    setModalType('add');
    setSelectedPaper(null);
    setShowModal(true);
  };

  const openEditPaperModal = (paper) => {
    setModalType('edit');
    setSelectedPaper(paper);
    setShowModal(true);
  };

  const openViewPaperModal = (paper) => {
    setModalType('view');
    setSelectedPaper(paper);
    setShowModal(true);
  };

  const openScholarSearchModal = () => {
    setModalType('scholar');
    setSelectedPaper(null);
    setShowModal(true);
  };

  const openAuthorSearchModal = () => {
    setModalType('author');
    setSelectedPaper(null);
    setShowModal(true);
  };

  const handleImportPaper = () => {
    // Placeholder for import functionality
    alert('Import functionality would open a file picker for importing papers from files');
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPaper(null);
    setModalType('');
  };

  // Notification system (simple implementation)
  const showNotification = (message, type) => {
    // This is a simple implementation - in a real app, you'd use a proper notification library
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg text-white z-50 ${
      type === 'success' ? 'bg-green-500' :
      type === 'error' ? 'bg-red-500' :
      'bg-blue-500'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" 
           style={{ 
             background: 'linear-gradient(135deg, #0a0613 0%, #150d27 25%, #1a0f2e 50%, #0a0613 75%, #150d27 100%)'
           }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-white/70">Loading papers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6" 
         style={{ 
           background: 'linear-gradient(135deg, #0a0613 0%, #150d27 25%, #1a0f2e 50%, #0a0613 75%, #150d27 100%)',
           backgroundSize: '400% 400%',
           animation: 'gradientShift 15s ease infinite'
         }}>
      
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
       <Header/>
      <div className="max-w-7xl mx-auto pt-24">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-red-400" size={20} />
            <span className="text-red-300">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-300"
            >
              <XCircle size={16} />
            </button>
          </div>
        )}

        <DashboardHeader 
          onAddPaper={openAddPaperModal}
          onImportPaper={handleImportPaper}
          onFetchByScholar={openScholarSearchModal}
          onFetchByAuthor={openAuthorSearchModal}
        />
        
        <StatsOverview papers={papers} />
        
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sourceFilter={sourceFilter}
          setSourceFilter={setSourceFilter}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => (
            <PaperCard
              key={paper.paper_id}
              paper={paper}
              onEdit={openEditPaperModal}
              onDelete={handleDeletePaper}
              onView={openViewPaperModal}
            />
          ))}
        </div>

        {filteredPapers.length === 0 && !loading && (
          <div className="text-center py-12">
            <FileText className="mx-auto text-white/30 mb-4" size={48} />
            <p className="text-white/70 text-lg">
              {papers.length === 0 ? 'No papers found' : 'No papers match your search criteria'}
            </p>
            <p className="text-white/50 text-sm mt-2">
              {papers.length === 0 ? 'Add your first paper to get started' : 'Try adjusting your search or filters'}
            </p>
          </div>
        )}

        {/* Modals */}
        <Modal
          isOpen={showModal}
          onClose={closeModal}
          title={
            modalType === 'add' ? 'Add New Paper' : 
            modalType === 'edit' ? 'Edit Paper' :
            modalType === 'view' ? 'Paper Details' :
            modalType === 'scholar' || modalType === 'author' ? 'Search Papers' : ''
          }
          size={modalType === 'view' ? 'large' : 'default'}
        >
          {modalType === 'add' && (
            <PaperForm 
              onSave={handleAddPaper}
              onCancel={closeModal}
              isLoading={isSubmitting}
            />
          )}
          
          {modalType === 'edit' && selectedPaper && (
            <PaperForm 
              paper={selectedPaper}
              onSave={handleUpdatePaper}
              onCancel={closeModal}
              isLoading={isSubmitting}
            />
          )}
          
          {modalType === 'view' && selectedPaper && (
            <PaperDetails paper={selectedPaper} />
          )}
          
          {(modalType === 'scholar' || modalType === 'author') && (
            <ScholarSearch 
              onSearch={handleScholarSearch}
              onCancel={closeModal}
              isLoading={isSubmitting}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ResearchDashboard;