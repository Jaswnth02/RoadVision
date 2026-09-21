import React from 'react';

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
}) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
    lg: 'text-sm px-3 py-1.5 font-medium',
  };

  const variantStyles = {
    success: 'bg-status-success-light text-status-success-text border border-status-success-border',
    warning: 'bg-status-warning-light text-status-warning-text border border-status-warning-border',
    error: 'bg-status-error-light text-status-error-text border border-status-error-border',
    info: 'bg-status-info-light text-status-info-text border border-status-info-border',
    neutral: 'bg-surface-muted text-charcoal-muted border border-surface-border',
    primary: 'bg-primary-light text-primary-dark border border-primary/20',
  };

  const dotColors = {
    success: 'bg-status-success',
    warning: 'bg-status-warning',
    error: 'bg-status-error',
    info: 'bg-status-info',
    neutral: 'bg-charcoal-light',
    primary: 'bg-primary',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || 'bg-current'}`} />
      )}
      {children}
    </span>
  );
}

/**
 * Utility badge helper based on recommendation text
 */
export function RecommendationBadge({ recommendation, className = '', size = 'md' }) {
  if (!recommendation) return null;
  const lower = recommendation.toLowerCase();

  if (lower.includes('suitable') && !lower.includes('not')) {
    return (
      <Badge variant="success" dot size={size} className={className}>
        {recommendation}
      </Badge>
    );
  }
  if (lower.includes('review') || lower.includes('warning') || lower.includes('pending')) {
    return (
      <Badge variant="warning" dot size={size} className={className}>
        {recommendation}
      </Badge>
    );
  }
  return (
    <Badge variant="error" dot size={size} className={className}>
      {recommendation}
    </Badge>
  );
}
