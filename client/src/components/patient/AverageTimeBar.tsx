import React from 'react';

interface AverageTimeBarProps {
  value: number; // seconds
  max?: number;
}

export default function AverageTimeBar({ value, max = 60 }: AverageTimeBarProps) {
  const percent = Math.max(0, Math.min(1, value / max));
  return (
    <div className="relative w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
        style={{ width: '100%' }}
      />
      <div
        className="absolute top-0 h-full bg-blue-600 rounded-full"
        style={{ left: `${percent * 100}%`, width: 4, minWidth: 4 }}
      />
      <div className="absolute right-0 top-0 h-full w-1 bg-gray-400 opacity-30" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-gray-700 font-semibold select-none">
        {isNaN(value) ? '-' : `${Math.round(value)}s`}
      </span>
    </div>
  );
} 