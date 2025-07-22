"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Award,
  BookOpen,
  LogOut,
  Check,
  AlertCircle,
  X,
  Plus,
  RefreshCw,
  Lightbulb,
  FileText,
  Briefcase,
  Zap,
  Shield,
  Download,
  User2Icon,
} from "lucide-react";
import Header from "@/components/universal/Header";

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [scholarId, setScholarId] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminSuccess, setAdminSuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Check if 'user_session' cookie exists
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const hasSession = cookies.some((cookie) =>
      cookie.startsWith("user_session=")
    );

    if (!hasSession) {
      router.push("/"); // Redirect to /auth if no session cookie
    }
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://riise.onrender.com/api/v1/users/profile",
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log(data);
        setProfile(data.profile);
        if (data.profile.scholar_id) {
          setScholarId(data.profile.scholar_id);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const clearAllCookies = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

      // Expire the cookie at root path
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;

      // Expire at current domain
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${location.hostname}`;
    }

    // Optional: manually target specific cookies from different domains/subdomains if needed
    // These will only work if running under that exact domain
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=riise.koyeb.app; secure; SameSite=None";
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://riise.onrender.com/api/v1/users/logout",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Clear client-side storage
      if (typeof window !== "undefined") {
        sessionStorage.clear();
        localStorage.clear();
        clearAllCookies();
      }

      router.push("/auth");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);

      // Even if the API call fails, still clear client-side data
      if (typeof window !== "undefined") {
        sessionStorage.clear();
        localStorage.clear();
        clearAllCookies();
      }

      router.push("/");
    }
  };

  const handleExportReport = async () => {
    try {
      setIsExporting(true);

      const response = await fetch(
        "https://riise.onrender.com/api/v1/export/user",
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${profile.name}_report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setError("");
  };

  const openAdminModal = () => {
    setShowAdminModal(true);
    setSecretKey("");
    setAdminError("");
    setAdminSuccess(false);
  };

  const closeAdminModal = () => {
    setShowAdminModal(false);
    setSecretKey("");
    setAdminError("");
  };

  const handleScholarIdChange = (e) => {
    setScholarId(e.target.value);
  };

  const handleSecretKeyChange = (e) => {
    setSecretKey(e.target.value);
  };

  const handleSubmit = async () => {
    if (!scholarId.trim()) {
      setError("Scholar ID cannot be empty");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        "https://riise.onrender.com/api/v1/users/update_profile_field",
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ scholar_id: scholarId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update Scholar ID");
      }

      setProfile((prev) => ({
        ...prev,
        scholar_id: scholarId,
      }));

      closeModal();

      // Fetch updated profile
      const updatedResponse = await fetch(
        "https://riise.onrender.com/api/v1/users/profile",
        {
          credentials: "include",
        }
      );
      const data = await updatedResponse.json();
      setProfile(data.profile);
    } catch (error) {
      console.error("Failed to update Scholar ID:", error);
      setError(error.message || "Failed to update Scholar ID");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminSubmit = async () => {
    if (!secretKey.trim()) {
      setAdminError("Secret key cannot be empty");
      return;
    }

    setIsSubmitting(true);
    setAdminError("");
    setAdminSuccess(false);

    try {
      if (secretKey === "S3cREt") {
        const response = await fetch(
          "https://riise.onrender.com/api/v1/users/update_profile",
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: "admin" }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update user role");
        }

        setProfile((prev) => ({
          ...prev,
          role: "admin",
        }));

        setAdminSuccess(true);

        // Fetch updated profile
        const updatedResponse = await fetch(
          "https://riise.onrender.com/api/v1/users/profile",
          {
            credentials: "include",
          }
        );
        const data = await updatedResponse.json();
        setProfile(data.profile);

        setTimeout(() => {
          closeAdminModal();
        }, 2000);
      } else {
        setAdminError("Invalid secret key");
      }
    } catch (error) {
      console.error("Failed to update user role:", error);
      setAdminError(error.message || "Failed to update user role");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Stats card component for consistent styling
  const StatCard = ({ icon, label, value, bgColor, textColor }) => {
    const Icon = icon;
    return (
      <div
        className={`${bgColor} rounded-xl p-4 shadow-lg transition-transform hover:scale-105 border border-purple-500/20`}
      >
        <div className="flex items-center mb-2">
          <div
            className={`p-2 rounded-full ${textColor} bg-white bg-opacity-20`}
          >
            <Icon size={20} />
          </div>
          <span className="ml-2 text-sm font-medium text-white">{label}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold text-white">{value}</p>
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center ${textColor} bg-white bg-opacity-20`}
          >
            {value > 0 ? <Zap size={16} /> : <X size={16} />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen pb-8"
      style={{
        background: "linear-gradient(135deg, #0a0613 0%, #150d27 100%)",
      }}
    >
      <Header />
      <div className="h-24"></div>
      <div className="max-w-md mx-auto bg-gray-900/80 backdrop-blur-md rounded-xl justify-center shadow-2xl overflow-hidden md:max-w-2xl border border-purple-500/20">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">User Profile</h1>

            <div className="flex gap-2">
              {profile &&
                profile.role === "admin" &&
                profile.is_verified == false && (
                  <button
                    onClick={openAdminModal}
                    className="flex items-center gap-1 bg-amber-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-amber-600 transition-colors"
                  >
                    <Shield size={16} />
                    Admin Verification
                  </button>
                )}
              {profile &&
                profile.role === "admin" &&
                profile.is_verified == true && (
                  <button
                    onClick={() => router.push("/userData")}
                    className="flex items-center gap-1 bg-amber-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-amber-600 transition-colors"
                  >
                    <User2Icon size={16} />
                    Users Data
                  </button>
                )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-white text-purple-600 px-3 py-1 rounded-md text-sm font-semibold hover:bg-purple-50 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {profile && (
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="bg-purple-900/50 backdrop-blur-sm rounded-full p-4 shadow-lg border border-purple-500/30">
                <User size={36} className="text-purple-400" />
              </div>
              <div className="ml-4 flex-grow">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    {profile.name}
                  </h2>
                  <button
                    onClick={handleExportReport}
                    disabled={isExporting}
                    className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-green-700 transition-colors"
                  >
                    {isExporting ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <Download size={16} />
                    )}
                    {isExporting ? "Exporting..." : "Export Report"}
                  </button>
                </div>
                <div className="flex items-center text-sm text-gray-400 mt-1">
                  <span
                    className={`capitalize ${
                      profile.role === "admin"
                        ? "text-amber-400 font-semibold"
                        : "text-gray-300"
                    }`}
                  >
                    {profile.role}
                    {profile.role === "admin" && (
                      <Shield size={14} className="ml-1 inline" />
                    )}
                  </span>
                  {profile.is_verified ? (
                    <div className="flex items-center ml-2 text-green-400">
                      <Check size={16} />
                      <span className="ml-1">Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center ml-2 text-amber-400">
                      <AlertCircle size={16} />
                      <span className="ml-1">Not Verified</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-purple-500/20">
                <Mail size={20} className="text-purple-400" />
                <span className="ml-3 text-gray-300">{profile.email}</span>
              </div>

              {/* Academic Stats Section */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                  <Award size={18} className="mr-2 text-purple-400" />
                  Research Metrics
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <StatCard
                    icon={BookOpen}
                    label="Citations"
                    value={profile.total_citations}
                    bgColor="bg-gradient-to-br from-blue-600 to-blue-800"
                    textColor="text-blue-400"
                  />
                  <StatCard
                    icon={Award}
                    label="h-index"
                    value={profile.h_index}
                    bgColor="bg-gradient-to-br from-purple-600 to-purple-800"
                    textColor="text-purple-400"
                  />
                  <StatCard
                    icon={Award}
                    label="i10-index"
                    value={profile.i10_index}
                    bgColor="bg-gradient-to-br from-indigo-600 to-indigo-800"
                    textColor="text-indigo-400"
                  />
                </div>
              </div>

              {/* Professional Stats Section */}
              {profile.stats && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                    <Briefcase size={18} className="mr-2 text-purple-400" />
                    Professional Portfolio
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard
                      icon={Lightbulb}
                      label="Innovations"
                      value={profile.stats.innovations}
                      bgColor="bg-gradient-to-br from-amber-600 to-amber-800"
                      textColor="text-amber-400"
                    />
                    <StatCard
                      icon={FileText}
                      label="IPR"
                      value={profile.stats.ipr}
                      bgColor="bg-gradient-to-br from-emerald-600 to-emerald-800"
                      textColor="text-emerald-400"
                    />
                    <StatCard
                      icon={BookOpen}
                      label="Research"
                      value={profile.stats.research}
                      bgColor="bg-gradient-to-br from-cyan-600 to-cyan-800"
                      textColor="text-cyan-400"
                    />
                    <StatCard
                      icon={Briefcase}
                      label="Startups"
                      value={profile.stats.startups}
                      bgColor="bg-gradient-to-br from-fuchsia-600 to-fuchsia-800"
                      textColor="text-fuchsia-400"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-row gap-x-4 mt-6">
                {profile.scholar_id ? (
                  <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg w-2/3 shadow-lg border border-purple-500/20">
                    <div className="flex items-center text-gray-400 text-sm mb-1">
                      <BookOpen size={16} className="mr-1 text-purple-400" />
                      Scholar ID
                    </div>
                    <p className="text-white font-medium">
                      {profile.scholar_id}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg w-2/3 border border-dashed border-purple-500/30">
                    <p className="text-gray-400 text-center">
                      No Scholar ID connected
                    </p>
                  </div>
                )}

                {profile.scholar_id ? (
                  <button
                    onClick={openModal}
                    className="flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-700 w-1/3 text-white px-3 py-3 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-indigo-800 transition-all duration-200 shadow-lg"
                  >
                    <RefreshCw size={20} className="animate-pulse" />
                    <span>Update ID</span>
                  </button>
                ) : (
                  <button
                    onClick={openModal}
                    className="flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-700 w-1/3 text-white px-3 py-3 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-800 transition-all duration-200 shadow-lg"
                  >
                    <Plus size={20} />
                    <span>Add ID</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for adding/updating Scholar ID */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900/90 backdrop-blur-md rounded-lg shadow-2xl p-6 w-96 max-w-full mx-4 border border-purple-500/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                {profile?.scholar_id ? "Update Scholar ID" : "Add Scholar ID"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <label
                htmlFor="scholarId"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Google Scholar ID
              </label>
              <input
                type="text"
                id="scholarId"
                value={scholarId}
                onChange={handleScholarIdChange}
                className="w-full px-3 py-2 bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                placeholder="Enter your Scholar ID"
              />
              {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700/50 backdrop-blur-sm rounded-md hover:bg-gray-600/50 border border-gray-600/50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                  isSubmitting
                    ? "bg-purple-500/50"
                    : "bg-purple-600 hover:bg-purple-700"
                } transition-colors duration-200`}
              >
                {isSubmitting
                  ? "Saving..."
                  : profile?.scholar_id
                  ? "Update"
                  : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Admin Mode */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900/90 backdrop-blur-md rounded-lg shadow-2xl p-6 w-96 max-w-full mx-4 border border-amber-500/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Shield size={20} className="mr-2 text-amber-400" />
                Admin Authentication
              </h3>
              <button
                onClick={closeAdminModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <label
                htmlFor="secretKey"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Secret Key
              </label>
              <input
                type="password"
                id="secretKey"
                value={secretKey}
                onChange={handleSecretKeyChange}
                className="w-full px-3 py-2 bg-gray-800/50 backdrop-blur-sm border border-amber-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400"
                placeholder="Enter administrator secret key"
              />
              {adminError && (
                <p className="mt-2 text-sm text-red-400">{adminError}</p>
              )}
              {adminSuccess && (
                <div className="mt-2 p-2 bg-green-900/50 backdrop-blur-sm border border-green-500/30 text-green-400 rounded-md flex items-center">
                  <Check size={16} className="mr-1" />
                  Admin access granted! Updating role...
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeAdminModal}
                className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700/50 backdrop-blur-sm rounded-md hover:bg-gray-600/50 border border-gray-600/50"
              >
                Cancel
              </button>
              <button
                onClick={handleAdminSubmit}
                disabled={isSubmitting || adminSuccess}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                  isSubmitting || adminSuccess
                    ? "bg-amber-500/50"
                    : "bg-amber-500 hover:bg-amber-600"
                } transition-colors duration-200 flex items-center`}
              >
                {isSubmitting ? (
                  <>Verifying...</>
                ) : adminSuccess ? (
                  <>
                    <Check size={16} className="mr-1" />
                    Success
                  </>
                ) : (
                  <>Verify</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
