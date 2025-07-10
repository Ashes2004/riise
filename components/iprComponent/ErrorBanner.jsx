import React from 'react';

const ErrorBanner = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 mx-6 rounded-lg">
      <div className="flex items-center">
        <span className="mr-2">⚠</span>
        {error}
      </div>
    </div>
  );
};

export default ErrorBanner;