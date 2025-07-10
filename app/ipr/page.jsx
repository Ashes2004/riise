"use client"
import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import Header from '@/components/universal/Header';
import StatsCard from '@/components/iprComponent/StatsCard';
import IPRTable from '@/components/iprComponent/IPRTable';
import AddIPRModal from '@/components/iprComponent/AddIPRModal';
import SearchBar from '@/components/iprComponent/SearchBar';
import PageHeader from '@/components/iprComponent/PageHeader';
import EmptyState from '@/components/iprComponent/EmptyState';
import ErrorBanner from '@/components/iprComponent/ErrorBanner';
import LoadingSpinner from '@/components/iprComponent/LoadingSpinner';
import { useRouter } from 'next/navigation';

const IPRPage = () => {
  const [iprs, setIPRs] = useState([]);
  const [filteredIPRs, setFilteredIPRs] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const BASE_URL = 'https://riise.onrender.com/api/v1/ipr';

  
    const router = useRouter();
  
    useEffect(() => {
      // Check if 'user_session' cookie exists
      const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
      const hasSession = cookies.some((cookie) =>
        cookie.startsWith("user_session=")
      );
  
      if (!hasSession) {
        router.push("/auth"); // Redirect to /auth if no session cookie
      }
    }, []);
  function getAccessTokenFromCookie() {
    const match = document.cookie.match(/(?:^|; )access_token=([^;]*)/);
    if (match) {
      console.log("✅ access_token found in cookie:", decodeURIComponent(match[1]));
      return decodeURIComponent(match[1]);
    } else {
      console.warn("❌ access_token is not set in cookie.");
      return null;
    }
  }

  function checkCookie() {
    const token = getAccessTokenFromCookie();
    if (!token) {
      console.warn("⚠️ Cookie does not contain access_token.");
    }
  }

  useEffect(()=>{

     checkCookie()
  },[])
  const fetchIPRs = async () => {
    try {
      setLoading(true);
      const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          
        },
        credentials:'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIPRs(data);
      setFilteredIPRs(data);
    } catch (error) {
      setError('Failed to fetch IPRs: ' + error.message);
      console.error('Error fetching IPRs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIPRs();
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredIPRs(iprs);
    } else {
      const filtered = iprs.filter(ipr =>
        ipr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ipr.ipr_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ipr.ipr_number && ipr.ipr_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ipr.status && ipr.status.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredIPRs(filtered);
    }
  }, [searchTerm, iprs]);

  const handleAddIPR = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/add-ipr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        credentials:'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newIPR = await response.json();
      setIPRs([...iprs, newIPR]);
      setIsAddModalOpen(false);
      setError(null);
    } catch (error) {
      setError('Failed to add IPR: ' + error.message);
      console.error('Error adding IPR:', error);
    }
  };

  const handleEdit = async (ipr) => {
    try {
      // You can implement edit modal here or navigate to edit page
      console.log('Edit IPR:', ipr);
  
      const response = await fetch(`${BASE_URL}/update-ipr/${ipr.ipr_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          
        },
        credentials:'include',
        body: JSON.stringify(updatedData)
      });
    } catch (error) {
      setError('Failed to update IPR: ' + error.message);
    }
  };

  const handleDelete = async (ipr) => {
    if (window.confirm('Are you sure you want to delete this IPR?')) {
      try {
        const response = await fetch(`${BASE_URL}/delete-ipr/${ipr.ipr_id}`, {
          method: 'DELETE',
          headers: {
            
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setIPRs(iprs.filter(i => i.ipr_id !== ipr.ipr_id));
        setError(null);
      } catch (error) {
        setError('Failed to delete IPR: ' + error.message);
        console.error('Error deleting IPR:', error);
      }
    }
  };

  const handleView = (ipr) => {
    console.log('View IPR:', ipr);
    // Implement view functionality
  };

  const stats = {
    total: filteredIPRs.length,
    granted: filteredIPRs.filter(ipr => ipr.status === 'Granted').length,
    pending: filteredIPRs.filter(ipr => ipr.status === 'Pending').length,
    patents: filteredIPRs.filter(ipr => ipr.ipr_type === 'Patent').length
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen py-24" style={{ background: 'linear-gradient(135deg, #0a0613 0%, #150d27 100%)' }}>
      <Header />
      
      <ErrorBanner error={error} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <PageHeader onAddClick={() => setIsAddModalOpen(true)} />

        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total IPRs"
            value={stats.total}
            icon={FileText}
            color="bg-blue-600"
            bgColor="bg-gray-800"
          />
          <StatsCard
            title="Granted"
            value={stats.granted}
            icon={CheckCircle}
            color="bg-green-600"
            bgColor="bg-gray-800"
          />
          <StatsCard
            title="Pending"
            value={stats.pending}
            icon={Clock}
            color="bg-yellow-600"
            bgColor="bg-gray-800"
          />
          <StatsCard
            title="Patents"
            value={stats.patents}
            icon={TrendingUp}
            color="bg-purple-600"
            bgColor="bg-gray-800"
          />
        </div>

        {/* IPR Table or Empty State */}
        {filteredIPRs.length > 0 ? (
          <IPRTable 
            iprs={filteredIPRs} 
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        ) : (
          <EmptyState 
            hasSearchTerm={!!searchTerm}
            searchTerm={searchTerm}
            onAddClick={() => setIsAddModalOpen(true)}
          />
        )}
      </div>

      {/* Add IPR Modal */}
      <AddIPRModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddIPR}
      />
    </div>
  );
};

export default IPRPage;