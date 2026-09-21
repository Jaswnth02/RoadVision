import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Select({
  label,
  options = [],
  value,
  onChange,
  helperText,
  error,
  className = '',
  id,
  ...props
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-charcoal tracking-wide"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          className={`w-full appearance-none bg-white text-charcoal border text-sm rounded-xl pl-3.5 pr-9 py-2 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
            error
              ? 'border-status-error focus:border-status-error focus:ring-status-error/20'
              : 'border-surface-border focus:border-primary'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-charcoal-light">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error ? (
        <p className="text-xs text-status-error">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-charcoal-light">{helperText}</p>
      ) : null}
    </div>
  );
}
