import React from 'react';

export default function CircularProgress({
  score = 92,
  max = 100,
  size = 120,
  strokeWidth = 10,
  label = 'Quality Score',
  className = '',
}) {
  const percentage = Math.min(100, Math.max(0, (score / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine mild status color
  let strokeColor = '#5D9C7C'; // soft sage green
  let textColor = 'text-status-success-text';
  let badgeBg = 'bg-status-success-light';

  if (score < 70) {
    strokeColor = '#C4635C'; // soft muted red
    textColor = 'text-status-error-text';
    badgeBg = 'bg-status-error-light';
  } else if (score < 85) {
    strokeColor = '#D8A657'; // muted amber
    textColor = 'text-status-warning-text';
    badgeBg = 'bg-status-warning-light';
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold tracking-tight text-charcoal">
            {score}
          </span>
          <span className="text-[10px] uppercase font-semibold text-charcoal-light tracking-wider -mt-0.5">
            / {max}
          </span>
        </div>
      </div>

      {label && (
        <span className={`mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeBg} ${textColor}`}>
          {label}
        </span>
      )}
    </div>
  );
}
