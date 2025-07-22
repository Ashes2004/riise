"use client";
import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Calendar,
  User,
  Building,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import Header from "@/components/universal/Header";
import { useRouter } from "next/navigation";
import RIISEBotWidget from "@/components/universal/RiiseBot";

const InnovationTrackingDashboard = () => {
  const [innovations, setInnovations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [domainFilter, setDomainFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedInnovation, setSelectedInnovation] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    domain: "",
    level: "",
    status: "draft",
  });

  const router = useRouter();

  useEffect(() => {
    // Check if 'user_session' cookie exists
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const hasSession = cookies.some((cookie) =>
      cookie.startsWith("user_session=")
    );
    const userRoleCookie = cookies.find((cookie) =>
      cookie.startsWith("user_role=")
    );

    const userRole = userRoleCookie
      ? decodeURIComponent(userRoleCookie.split("=")[1])
      : null;

    if (userRole !== "user") {
      setIsAdmin(true);
    }

    console.log("userRole:", userRole);

    if (!hasSession) {
      router.push("/"); // Redirect to /auth if no session cookie
    }
  }, []);
  const API_BASE = "https://riise.onrender.com/api/v1/innovations";

  // Status configurations
  const statusConfig = {
    draft: { color: "bg-gray-500", icon: Edit, label: "Draft" },
    submitted: { color: "bg-yellow-500", icon: Clock, label: "Submitted" },
    approved: { color: "bg-green-500", icon: CheckCircle, label: "Approved" },
    rejected: { color: "bg-red-500", icon: AlertCircle, label: "Rejected" },
  };

  const domains = [
    "Technology",
    "Healthcare",
    "Education",
    "Environment",
    "Agriculture",
    "Energy",
    "Social",
  ];
  const levels = ["institute", "state", "national", "international"];

  useEffect(() => {
    fetchInnovations();
  }, []);

  const fetchInnovations = async () => {
    try {
      // Replace with your auth implementation
      const response = await fetch(`${API_BASE}/`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setInnovations(data);
      }
    } catch (error) {
      console.error("Error fetching innovations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddInnovation = async () => {
    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/add-innovation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchInnovations();
        setShowAddModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error adding innovation:", error);
    }
  };

  const handleUpdateInnovation = async () => {
    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/update-innovation/${selectedInnovation.innovation_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        fetchInnovations();
        setShowEditModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error updating innovation:", error);
    }
  };

  const handleDeleteInnovation = async (innovationId) => {
    if (!window.confirm("Are you sure you want to delete this innovation?"))
      return;

    try {
      const response = await fetch(
        `${API_BASE}/delete-innovation/${innovationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        fetchInnovations();
      }
    } catch (error) {
      console.error("Error deleting innovation:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      domain: "",
      level: "",
      status: "draft",
    });
    setSelectedInnovation(null);
  };

  const openEditModal = (innovation) => {
    setSelectedInnovation(innovation);
    setFormData({
      title: innovation.title,
      description: innovation.description || "",
      domain: innovation.domain || "",
      level: innovation.level || "",
      status: innovation.status || "draft",
    });
    setShowEditModal(true);
  };

  const openViewModal = (innovation) => {
    setSelectedInnovation(innovation);
    setShowViewModal(true);
  };

  const filteredInnovations = innovations.filter((innovation) => {
    const matchesSearch =
      innovation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      innovation.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || innovation.status === statusFilter;
    const matchesDomain =
      domainFilter === "all" || innovation.domain === domainFilter;

    return matchesSearch && matchesStatus && matchesDomain;
  });

  const getStatusStats = () => {
    const stats = {
      total: innovations.length,
      draft: innovations.filter((i) => i.status === "draft").length,
      submitted: innovations.filter((i) => i.status === "submitted").length,
      approved: innovations.filter((i) => i.status === "approved").length,
      rejected: innovations.filter((i) => i.status === "rejected").length,
    };
    return stats;
  };

  const stats = getStatusStats();

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #0a0613 0%, #150d27 100%)",
        }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(135deg, #0a0613 0%, #150d27 100%)",
      }}
    >
      <Header />
      <div className="max-w-7xl mx-auto pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Innovation Tracking
          </h1>
          <p className="text-gray-300">
            Manage your research innovations and track their progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Innovations</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <Building className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Draft</p>
                <p className="text-2xl font-bold text-white">{stats.draft}</p>
              </div>
              <Edit className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Submitted</p>
                <p className="text-2xl font-bold text-white">
                  {stats.submitted}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Approved</p>
                <p className="text-2xl font-bold text-white">
                  {stats.approved}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Rejected</p>
                <p className="text-2xl font-bold text-white">
                  {stats.rejected}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search innovations..."
                  className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <select
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              {/* Domain Filter */}
              <select
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
              >
                <option value="all">All Domains</option>
                {domains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Innovation
            </button>
          </div>
        </div>

        {/* Innovations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInnovations.map((innovation) => {
            const StatusIcon = statusConfig[innovation.status]?.icon || Edit;
            return (
              <div
                key={innovation.innovation_id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white line-clamp-2">
                    {innovation.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs text-white ${
                        statusConfig[innovation.status]?.color || "bg-gray-500"
                      }`}
                    >
                      {statusConfig[innovation.status]?.label ||
                        innovation.status}
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {innovation.description || "No description available"}
                </p>

                <div className="space-y-2 mb-4">
                  {innovation.domain && (
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">
                        {innovation.domain}
                      </span>
                    </div>
                  )}
                  {innovation.level && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300 capitalize">
                        {innovation.level}
                      </span>
                    </div>
                  )}
                  {innovation.submitted_on && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">
                        {new Date(innovation.submitted_on).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <StatusIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {innovation.updated_at
                        ? `Updated ${new Date(
                            innovation.updated_at
                          ).toLocaleDateString()}`
                        : "No updates"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openViewModal(innovation)}
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => openEditModal(innovation)}
                        className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                    {isAdmin && (
                      <button
                        onClick={() =>
                          handleDeleteInnovation(innovation.innovation_id)
                        }
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredInnovations.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No innovations found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filters, or add a new innovation.
            </p>
          </div>
        )}
      </div>

      {/* Add Innovation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              Add New Innovation
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Domain
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.domain}
                    onChange={(e) =>
                      setFormData({ ...formData, domain: e.target.value })
                    }
                  >
                    <option value="">Select Domain</option>
                    {domains.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Level
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value })
                    }
                  >
                    <option value="">Select Level</option>
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="submitted">Submitted</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddInnovation}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Add Innovation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Innovation Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              Edit Innovation
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Domain
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.domain}
                    onChange={(e) =>
                      setFormData({ ...formData, domain: e.target.value })
                    }
                  >
                    <option value="">Select Domain</option>
                    {domains.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Level
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value })
                    }
                  >
                    <option value="">Select Level</option>
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="submitted">Submitted</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateInnovation}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Update Innovation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Innovation Modal */}
      {showViewModal && selectedInnovation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Innovation Details
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm text-white ${
                  statusConfig[selectedInnovation.status]?.color ||
                  "bg-gray-500"
                }`}
              >
                {statusConfig[selectedInnovation.status]?.label ||
                  selectedInnovation.status}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {selectedInnovation.title}
                </h3>
                <p className="text-gray-300">
                  {selectedInnovation.description || "No description available"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Domain
                  </label>
                  <p className="text-white">
                    {selectedInnovation.domain || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Level
                  </label>
                  <p className="text-white capitalize">
                    {selectedInnovation.level || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Submitted On
                  </label>
                  <p className="text-white">
                    {selectedInnovation.submitted_on
                      ? new Date(
                          selectedInnovation.submitted_on
                        ).toLocaleDateString()
                      : "Not submitted"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Last Updated
                  </label>
                  <p className="text-white">
                    {selectedInnovation.updated_at
                      ? new Date(
                          selectedInnovation.updated_at
                        ).toLocaleDateString()
                      : "No updates"}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Innovation ID
                </label>
                <p className="text-white font-mono">
                  {selectedInnovation.innovation_id}
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(selectedInnovation);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Edit Innovation
              </button>
            </div>
          </div>
        </div>
      )}

      <RIISEBotWidget/>
    </div>
  );
};

export default InnovationTrackingDashboard;
