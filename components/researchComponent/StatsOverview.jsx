import React from 'react';
import { FileText, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const StatsOverview = ({ papers }) => {
  const totalPapers = papers.length;
  const publishedPapers = papers.filter(p => p.status === 'Published').length;
  const totalCitations = papers.reduce((sum, p) => sum + (p.citations || 0), 0);
  const underReview = papers.filter(p => p.status === 'Under Review').length;

  const stats = [
    { 
      label: 'Total Papers', 
      value: totalPapers, 
      icon: FileText, 
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30'
    },
    { 
      label: 'Published', 
      value: publishedPapers, 
      icon: CheckCircle, 
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    },
    { 
      label: 'Under Review', 
      value: underReview, 
      icon: Clock, 
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30'
    },
    { 
      label: 'Total Citations', 
      value: totalCitations, 
      icon: TrendingUp, 
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className={`bg-surface border ${stat.borderColor} rounded-lg p-4 ${stat.bgColor}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
            <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.borderColor} border`}>
              <stat.icon className={`${stat.color}`} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;