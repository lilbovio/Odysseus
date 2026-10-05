import React from 'react';

interface CircularProgressProps {
  percentage: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
  showText?: boolean;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  color = '#5ce0b8',
  size = 64,
  strokeWidth = 4.5,
  showText = true,
  className = '',
}) => {
  const radius = 19;
  const circumference = 2 * Math.PI * radius; // 119.38
  const offset = circumference * (1 - Math.min(100, Math.max(0, percentage)) / 100);

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg
        className="-rotate-90"
        viewBox="0 0 48 48"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <circle
          cx="24"
          cy="24"
          fill="none"
          r={radius}
          stroke="#272A2E"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="24"
          cy="24"
          fill="none"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>
      {showText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-citation text-xs font-semibold text-on-surface leading-none">
            {percentage}%
          </span>
        </div>
      )}
    </div>
  );
};
