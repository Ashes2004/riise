"use client"
import React, { useState, useEffect } from "react";

import {
  X,
  PlusCircle,
  TrendingUp,
  Users,
  ChevronRight,
  Edit,
  Eye,
} from "lucide-react";
import Header from "@/components/universal/Header";
import { useRouter } from "next/navigation";

const API_BASE_URL = "https://riise.onrender.com";

const fetchStartups = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/startups/`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      throw new Error(
        `Failed to fetch startups: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching startups:", error);
    return [];
  }
};

const addStartup = async (startupData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/startups/add-startup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(startupData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      throw new Error(
        `Failed to add startup: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding startup:", error);
    throw error;
  }
};

const updateStartup = async (startupId, startupData) => {
  try {
    const { updated_at, created_at, startup_id, ...cleanData } = startupData;

    const response = await fetch(
      `${API_BASE_URL}/api/v1/startups/update-startup/${startupId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(cleanData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Update response status:", response.status);
      console.error("Server error response:", errorText);
      throw new Error(`Failed to update startup: ${response.status}`);
    }

    const result = await response.json();

    return {
      ...cleanData,
      ...result,
      startup_id: startupId,
    };
  } catch (error) {
    console.error("Error updating startup:", error);
    throw error;
  }
};

const StartupViewModal = ({ isOpen, onClose, startup }) => {
  if (!isOpen || !startup) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-purple-500/20 rounded-lg w-full max-w-md p-6 max-h-90vh overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            {startup.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="mb-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium
              ${
                startup.status === "Idea"
                  ? "bg-gray-700 text-gray-300"
                  : startup.status === "Prototype"
                  ? "bg-blue-900 text-blue-300"
                  : startup.status === "MVP"
                  ? "bg-purple-900 text-purple-300"
                  : startup.status === "Launched"
                  ? "bg-green-900 text-green-300"
                  : "bg-indigo-900 text-indigo-300"
              }`}
            >
              {startup.status || "Unknown"}
            </span>
          </div>

          <div className="my-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">
              Stage Progress
            </h3>
            <StageProgressionStepper currentStage={startup.status} />
          </div>

          <div className="border-t border-purple-500/20 pt-4">
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-400">Industry</dt>
                <dd className="mt-1 text-sm text-gray-200">
                  {startup.industry || "Not specified"}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-400">Founder</dt>
                <dd className="mt-1 text-sm text-gray-200">
                  {startup.founder || "Not specified"}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-400">
                  Founded Date
                </dt>
                <dd className="mt-1 text-sm text-gray-200">
                  {formatDate(startup.founded_date)}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-400">
                  Description
                </dt>
                <dd className="mt-1 text-sm text-gray-200">
                  {startup.description || "No description provided"}
                </dd>
              </div>

              {startup.created_at && (
                <div>
                  <dt className="text-sm font-medium text-gray-400">
                    Record Created
                  </dt>
                  <dd className="mt-1 text-sm text-gray-200">
                    {formatDate(startup.created_at)}
                  </dd>
                </div>
              )}

              {startup.updated_at && (
                <div>
                  <dt className="text-sm font-medium text-gray-400">
                    Last Updated
                  </dt>
                  <dd className="mt-1 text-sm text-gray-200">
                    {formatDate(startup.updated_at)}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

const StartupCard = ({ startup, onEdit, onView }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 hover:bg-slate-800/70 hover:border-purple-400/30 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-white">{startup.name}</h3>
          <p className="text-gray-300">{startup.industry}</p>
          <div className="mt-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium
              ${
                startup.status === "Idea"
                  ? "bg-gray-700 text-gray-300"
                  : startup.status === "Prototype"
                  ? "bg-blue-900 text-blue-300"
                  : startup.status === "MVP"
                  ? "bg-purple-900 text-purple-300"
                  : startup.status === "Launched"
                  ? "bg-green-900 text-green-300"
                  : "bg-indigo-900 text-indigo-300"
              }`}
            >
              {startup.status || "Unknown"}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onView(startup)}
            className="text-purple-400 hover:text-purple-300 transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEdit(startup)}
            className="text-blue-400 hover:text-blue-300 transition-colors"
            title="Edit"
          >
            <Edit size={16} />
          </button>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-purple-500/20">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-300">
            <Users size={14} />
            <span>Founded by {startup.founder || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-300">
            {startup.founded_date && (
              <span>{new Date(startup.founded_date).getFullYear()}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StageProgressionStepper = ({ currentStage }) => {
  const stages = ["Idea", "Prototype", "MVP", "Launched", "Funded"];
  const currentIndex = stages.indexOf(currentStage || "Idea");

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between w-full">
        {stages.map((stage, index) => (
          <React.Fragment key={`stage-${stage}-${index}`}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center
                ${
                  index <= currentIndex
                    ? "bg-purple-600 text-white"
                    : "bg-gray-600 text-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`mt-2 text-xs font-medium
                ${index <= currentIndex ? "text-purple-400" : "text-gray-500"}`}
              >
                {stage}
              </span>
            </div>
            {index < stages.length - 1 && (
              <div
                className={`h-1 w-full 
                ${index < currentIndex ? "bg-purple-600" : "bg-gray-600"}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const StartupFormModal = ({ isOpen, onClose, onSubmit, startup = null }) => {
  const isEditMode = !!startup;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    founder: "",
    industry: "",
    founded_date: "",
    status: "Idea",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode && startup) {
      let formattedDate = "";
      if (startup.founded_date) {
        const date = new Date(startup.founded_date);
        formattedDate = date.toISOString().split("T")[0];
      }

      setFormData({
        name: startup.name || "",
        description: startup.description || "",
        founder: startup.founder || "",
        industry: startup.industry || "",
        founded_date: formattedDate,
        status: startup.status || "Idea",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        founder: "",
        industry: "",
        founded_date: "",
        status: "Idea",
      });
    }
  }, [startup, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const submissionData = { ...formData };
      console.log(
        `${isEditMode ? "Updating" : "Adding"} startup with data:`,
        submissionData
      );
      await onSubmit(submissionData);
      onClose();
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "adding"} startup:`,
        error
      );
      setError(
        `Failed to ${isEditMode ? "update" : "add"} startup: ${
          error.message || "Please try again."
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-purple-500/20 rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            {isEditMode ? "Edit Startup" : "Add New Startup"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-md border border-red-500/30">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-slate-700 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Industry
            </label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-slate-700 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-slate-700 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400"
            >
              <option value="Idea">Idea</option>
              <option value="Prototype">Prototype</option>
              <option value="MVP">MVP</option>
              <option value="Launched">Launched</option>
              <option value="Funded">Funded</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Founder
            </label>
            <input
              type="text"
              name="founder"
              value={formData.founder}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-slate-700 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Founded Date
            </label>
            <input
              type="date"
              name="founded_date"
              value={formData.founded_date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-slate-700 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full rounded-md bg-slate-700 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-slate-700 border border-purple-500/30 rounded-md hover:bg-slate-600 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                ? "Update Startup"
                : "Add Startup"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function StartupHub() {
  const [startups, setStartups] = useState([]);
  const [error, setError] = useState(null);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [startupToEdit, setStartupToEdit] = useState(null);
  const [startupToView, setStartupToView] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 
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
  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail || userEmail == 'undefined') {
      // Handle authentication
    }
    
    const getStartups = async () => {
      setIsLoading(true);
      try {
        const data = await fetchStartups();
        console.log("Fetched startups:", data);
        setStartups(data);
        setError(null);
      } catch (err) {
        setError("Failed to load startups. Please try again later.");
        console.error("Error fetching startups:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getStartups();
  }, []);

  const handleAddStartup = async (newStartup) => {
    try {
      console.log("Adding new startup:", newStartup);
      const addedStartup = await addStartup(newStartup);
      console.log("Successfully added startup:", addedStartup);
      setStartups((prevStartups) => [...prevStartups, addedStartup]);
      return addedStartup;
    } catch (error) {
      console.error("Error in handleAddStartup:", error);
      throw error;
    }
  };

  const handleUpdateStartup = async (updatedData) => {
    try {
      if (!startupToEdit?.startup_id) {
        throw new Error("Invalid startup selected for update");
      }

      const updateData = {
        ...updatedData,
        startup_id: startupToEdit.startup_id,
      };

      const updatedStartup = await updateStartup(
        startupToEdit.startup_id,
        updateData
      );

      setStartups((prevStartups) =>
        prevStartups.map((s) =>
          s.startup_id === startupToEdit.startup_id ? updatedStartup : s
        )
      );

      setStartupToEdit(null);
      setShowAddModal(false);

      return updatedStartup;
    } catch (error) {
      console.error("Error in handleUpdateStartup:", error);
      throw error;
    }
  };

  const editStartup = (startup) => {
    console.log("Editing startup:", startup);
    setStartupToEdit(startup);
  };

  const viewStartup = (startup) => {
    console.log("Viewing startup details:", startup);
    setStartupToView(startup);
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #0a0613 0%, #150d27 25%, #1a0f2e 50%, #0a0613 75%, #150d27 100%)'
      }}
    >
        <Header/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-36">
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500/30 text-red-300 rounded-md">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-300">Loading startups...</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg px-6 py-5">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-900/50 text-purple-400">
                      <TrendingUp size={24} />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-400">
                        Total Startups
                      </p>
                      <p className="text-2xl font-semibold text-white">
                        {startups.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg px-6 py-5 flex justify-center items-center">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    <PlusCircle size={20} />
                    <span>Add New Startup</span>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Your Startups
              </h2>

              {startups.length === 0 ? (
                <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg py-8 px-6 text-center">
                  <p className="text-gray-300 mb-4">
                    You don't have any startups yet. Add your first startup to
                    get started!
                  </p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    <PlusCircle size={20} />
                    <span>Add New Startup</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {startups.map((startup) => (
                    <StartupCard
                      key={`startup-${startup.startup_id}`}
                      startup={startup}
                      onEdit={editStartup}
                      onView={viewStartup}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <StartupFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddStartup}
      />

      <StartupFormModal
        isOpen={!!startupToEdit}
        onClose={() => setStartupToEdit(null)}
        onSubmit={handleUpdateStartup}
        startup={startupToEdit}
      />

      <StartupViewModal
        isOpen={!!startupToView}
        onClose={() => setStartupToView(null)}
        startup={startupToView}
      />
    </div>
  );
}

export default StartupHub;