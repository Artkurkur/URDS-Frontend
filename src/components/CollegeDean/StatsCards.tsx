"use client";

import React from 'react';

type FilterType = 'All' | 'Pending' | 'Approved' | 'Rejected';

interface StatsCardsProps {
  totalSubmissions: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  activeFilter: FilterType;
  onFilterClick: (filter: FilterType) => void;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  totalSubmissions,
  pendingCount,
  approvedCount,
  rejectedCount,
  activeFilter,
  onFilterClick
}) => {
  const cards = [
    {
      filter: 'All' as FilterType,
      count: totalSubmissions,
      label: 'Total Submissions',
      bgColor: 'bg-gray-900',
      ringColor: 'ring-gray-600'
    },
    {
      filter: 'Pending' as FilterType,
      count: pendingCount,
      label: 'SFR Evaluator Review',
      bgColor: 'bg-blue-400',
      ringColor: 'ring-blue-600'
    },
    {
      filter: 'Approved' as FilterType,
      count: approvedCount,
      label: 'SFR Approved',
      bgColor: 'bg-orange-400',
      ringColor: 'ring-orange-600'
    },
    {
      filter: 'Rejected' as FilterType,
      count: rejectedCount,
      label: 'SFR Rejected',
      bgColor: 'bg-red-400',
      ringColor: 'ring-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <button
          key={card.filter}
          onClick={() => onFilterClick(card.filter)}
          className={`${card.bgColor} text-white rounded-3xl p-6 text-center transition-all hover:scale-105 cursor-pointer ${
            activeFilter === card.filter ? `ring-4 ${card.ringColor}` : ''
          }`}
        >
          <div className="text-4xl font-bold mb-2">{card.count}</div>
          <div className="text-sm font-medium">{card.label}</div>
        </button>
      ))}
    </div>
  );
};

export default StatsCards;