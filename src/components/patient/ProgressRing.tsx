import React from 'react';

interface ProgressRingProps {
  value: number; // 0 to 1
  size?: number;
  stroke?: number;
  color?: string;
}

export default function ProgressRing({ value, size = 40, stroke = 4, color = '#4f46e5' }: ProgressRingProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, value));
  const offset = circumference * (1 - progress);
  return (
    <svg width={size} height={size} className="block" style={{ minWidth: size, minHeight: size }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.4s' }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.35em"
        fontSize={size * 0.32}
        fill="#222"
        fontWeight={600}
      >
        {Math.round(progress * 100)}%
      </text>
    </svg>
  );
} 