import React from 'react';

export default function Input({
  label,
  helperText,
  error,
  icon: Icon,
  className = '',
  id,
  type = 'text',
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-charcoal tracking-wide"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal-light">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`w-full bg-white text-charcoal placeholder:text-gray-400 border text-sm rounded-xl px-3.5 py-2 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
            Icon ? 'pl-9' : ''
          } ${
            error
              ? 'border-status-error focus:border-status-error focus:ring-status-error/20'
              : 'border-surface-border focus:border-primary'
          } ${className}`}
          {...props}
        />
      </div>
      {error ? (
        <p className="text-xs text-status-error">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-charcoal-light">{helperText}</p>
      ) : null}
    </div>
  );
}
