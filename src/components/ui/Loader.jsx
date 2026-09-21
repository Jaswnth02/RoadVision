import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loader({
  size = 'md',
  message = 'Processing...',
  subtext,
  className = '',
}) {
  const sizeStyles = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex flex-col items-center justify-center py-8 text-center ${className}`}>
      <Loader2 className={`${sizeStyles[size]} text-primary animate-spin mb-3`} />
      {message && <p className="text-sm font-medium text-charcoal">{message}</p>}
      {subtext && <p className="text-xs text-charcoal-light mt-1 max-w-sm">{subtext}</p>}
    </div>
  );
}
