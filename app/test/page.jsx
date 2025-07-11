"use client";
import React, { useEffect, useState } from "react";

const IPRTest = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const BASE_URL = "https://riise.onrender.com/api/v1/ipr";

  useEffect(() => {
    const fetchIPRs = async () => {
      try {
        const response = await fetch("https://riise.onrender.com/api/v1/ipr", {
          method: "GET",
          credentials: "include", // Needed if you're using cookies/session
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
        console.error("❌ Fetch error:", err);
      }
    };

    fetchIPRs();
  }, []);

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-xl font-bold mb-4">CORS Test for IPR API</h1>
      {error && (
        <p className="text-red-500">
          <strong>Error:</strong> {error}
        </p>
      )}
      {data ? (
        <div>
          <p className="text-green-400">✅ Data fetched successfully!</p>
          <pre className="bg-gray-800 p-4 mt-2 rounded text-sm overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ) : (
        !error && <p>🔄 Loading...</p>
      )}
    </div>
  );
};

export default IPRTest;
