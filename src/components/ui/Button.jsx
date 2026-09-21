import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-primary text-white hover:bg-primary-dark shadow-soft-sm focus:ring-primary/40 border border-transparent',
    secondary:
      'bg-surface-muted text-charcoal hover:bg-gray-200 focus:ring-gray-300 border border-surface-border',
    outline:
      'bg-transparent text-charcoal border border-surface-border hover:bg-surface-muted hover:border-gray-300 focus:ring-primary/30',
    ghost:
      'bg-transparent text-charcoal hover:bg-surface-muted focus:ring-gray-300 border border-transparent',
    danger:
      'bg-status-error text-white hover:bg-[#B3524B] shadow-soft-sm focus:ring-status-error/40 border border-transparent',
    success:
      'bg-status-success text-white hover:bg-[#4E886A] shadow-soft-sm focus:ring-status-success/40 border border-transparent',
    sand:
      'bg-sand text-charcoal hover:bg-sand-dark hover:text-white shadow-soft-sm focus:ring-sand/40 border border-transparent',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 flex-shrink-0" />
      )}
    </button>
  );
}
