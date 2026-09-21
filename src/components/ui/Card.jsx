import React from 'react';

export default function Card({
  children,
  variant = 'default',
  className = '',
  onClick,
  ...props
}) {
  const variantStyles = {
    default: 'bg-white border border-surface-border shadow-soft-sm',
    elevated: 'bg-white border border-surface-border shadow-soft',
    subtle: 'bg-surface-subtle border border-surface-border shadow-none',
    interactive:
      'bg-white border border-surface-border shadow-soft-sm hover:shadow-soft hover:border-gray-300 transition-all duration-150 cursor-pointer',
  };

  return (
    <div
      className={`rounded-xl ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`px-5 py-4 border-b border-surface-border ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`font-semibold text-charcoal tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '' }) {
  return (
    <p className={`text-xs text-charcoal-light mt-1 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`px-5 py-3.5 bg-surface-subtle/50 border-t border-surface-border rounded-b-xl flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
}
