import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color, bgColor }) => {
  return (
    <div className={`${bgColor} border border-gray-700 rounded-lg p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-full`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;