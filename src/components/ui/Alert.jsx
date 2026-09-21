import React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function Alert({
  type = 'info', // 'success', 'warning', 'error', 'info'
  title,
  children,
  onClose,
  className = '',
}) {
  const typeConfig = {
    success: {
      bg: 'bg-status-success-light',
      border: 'border-status-success-border',
      text: 'text-status-success-text',
      Icon: CheckCircle2,
    },
    warning: {
      bg: 'bg-status-warning-light',
      border: 'border-status-warning-border',
      text: 'text-status-warning-text',
      Icon: AlertTriangle,
    },
    error: {
      bg: 'bg-status-error-light',
      border: 'border-status-error-border',
      text: 'text-status-error-text',
      Icon: AlertCircle,
    },
    info: {
      bg: 'bg-status-info-light',
      border: 'border-status-info-border',
      text: 'text-status-info-text',
      Icon: Info,
    },
  };

  const config = typeConfig[type] || typeConfig.info;
  const { Icon } = config;

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border ${config.bg} ${config.border} ${className}`}
      role="alert"
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.text}`} />
      <div className="flex-1 text-sm">
        {title && <h4 className={`font-semibold ${config.text} mb-0.5`}>{title}</h4>}
        <div className="text-charcoal-muted leading-relaxed text-xs sm:text-sm">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md text-charcoal-light hover:bg-black/5 transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
