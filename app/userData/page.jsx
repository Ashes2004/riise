"use client";

import { useState, useEffect } from "react";
import { Search, Download, Loader } from "lucide-react";
import Header from "@/components/universal/Header";
import { useRouter } from "next/navigation";

export default function UserData() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [exportingUserId, setExportingUserId] = useState(null);
  const [error, setError] = useState(null);

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
  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://riise.onrender.com/api/v1/users/all-profile",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data.profiles);
        setFilteredUsers(data.profiles);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Handle export
  const handleExport = async (userEmail, userId) => {
    try {
      setExporting(true);
      setExportingUserId(userId);
      console.log("Exporting user:", userEmail);

      const response = await fetch(
        `https://riise.onrender.com/api/v1/export/admin/user/${userEmail}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to export user data");
      }

      // Get the blob directly instead of parsing as JSON
      const blob = await response.blob();

      // Create a downloadable file
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `USER_report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError(error.message);
      console.error("Error exporting user data:", error);
    } finally {
      setExporting(false);
      setExportingUserId(null);
    }
  };

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        style={{
          background: "linear-gradient(135deg, #0a0613 0%, #150d27 100%)",
        }}
      >
        <Loader className="w-12 h-12 text-purple-400 animate-spin" />
        <p className="mt-4 text-xl text-gray-300">Loading users...</p>
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
      <div className="max-w-6xl mt-24 mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">User Dashboard</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-grow">
              <input
                type="text"
                className="w-full px-4 py-2 pl-10 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border-l-4 border-red-500 text-red-300">
            <p>{error}</p>
            <button
              className="underline mt-2 hover:text-red-200"
              onClick={() => setError(null)}
            >
              Dismiss
            </button>
          </div>
        )}

        {/* User Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Verified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/30 divide-y divide-gray-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.user_id}
                    className="hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.user_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === "admin"
                            ? "bg-purple-900/50 text-purple-300 border border-purple-700"
                            : "bg-green-900/50 text-green-300 border border-green-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.is_verified ? (
                        <span className="text-green-400 font-medium">Yes</span>
                      ) : (
                        <span className="text-red-400 font-medium">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleExport(user.email, user.user_id)}
                        disabled={exporting && exportingUserId === user.user_id}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                      >
                        {exporting && exportingUserId === user.user_id ? (
                          <>
                            <Loader className="w-4 h-4 mr-2 animate-spin" />
                            Exporting...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-sm text-gray-400"
                  >
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-gray-700">
            <h3 className="text-lg font-medium text-gray-300">Total Users</h3>
            <p className="text-3xl font-bold text-blue-400">{users.length}</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-gray-700">
            <h3 className="text-lg font-medium text-gray-300">
              Verified Users
            </h3>
            <p className="text-3xl font-bold text-green-400">
              {users.filter((user) => user.is_verified).length}
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-gray-700">
            <h3 className="text-lg font-medium text-gray-300">Admin Users</h3>
            <p className="text-3xl font-bold text-purple-400">
              {users.filter((user) => user.role === "admin").length}
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-gray-700">
            <h3 className="text-lg font-medium text-gray-300">Regular Users</h3>
            <p className="text-3xl font-bold text-indigo-400">
              {users.filter((user) => user.role === "user").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
