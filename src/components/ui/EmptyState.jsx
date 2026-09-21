import React from 'react';
import { PackageOpen } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = PackageOpen,
  title = 'No records found',
  description = 'There are no items matching your criteria at this time.',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-surface-border bg-surface-subtle/50 ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-white border border-surface-border flex items-center justify-center text-charcoal-light shadow-soft-sm mb-3">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h4 className="text-base font-semibold text-charcoal">{title}</h4>
      <p className="text-xs text-charcoal-light mt-1 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-4">
          <Button variant="secondary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
