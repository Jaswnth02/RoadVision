import React from 'react';

export default function ProgressBar({
  value = 0,
  max = 100,
  color = 'primary', // 'primary', 'success', 'warning', 'error', 'sand'
  size = 'md', // 'sm', 'md', 'lg'
  showLabel = false,
  labelPrefix = '',
  className = '',
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  const colorStyles = {
    primary: 'bg-primary',
    success: 'bg-status-success',
    warning: 'bg-status-warning',
    error: 'bg-status-error',
    sand: 'bg-sand',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-charcoal-muted mb-1 font-medium">
          <span>{labelPrefix}</span>
          <span className="font-semibold text-charcoal">{percentage.toFixed(1)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${heightStyles[size]}`}>
        <div
          className={`h-full transition-all duration-500 ease-out rounded-full ${colorStyles[color] || colorStyles.primary}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
