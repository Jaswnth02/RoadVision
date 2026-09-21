import React from 'react';
import { Ruler, CheckCircle2 } from 'lucide-react';
import { AGGREGATE_SIZES } from '../../data/mockData';

export default function AggregateSizeSelector({
  selectedSize = '20 mm',
  onSelectSize = null,
  interactive = false,
  className = '',
}) {
  return (
    <div className={`space-y-2 text-left ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-charcoal flex items-center gap-1.5">
          <Ruler className="w-3.5 h-3.5 text-primary" />
          <span>Aggregate Size Classification</span>
        </label>
        <span className="text-[11px] text-charcoal-light font-mono">
          IRC / MoRTH Sieve Range
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {AGGREGATE_SIZES.map((item) => {
          const isSelected =
            selectedSize?.toLowerCase().includes(item.code.toLowerCase()) ||
            selectedSize === item.id;

          return (
            <div
              key={item.id}
              onClick={() => interactive && onSelectSize && onSelectSize(item.code)}
              className={`p-3 rounded-xl border transition-all duration-150 ${
                interactive ? 'cursor-pointer' : ''
              } ${
                isSelected
                  ? 'bg-primary-light/60 border-primary/40 shadow-soft-sm ring-1 ring-primary/30'
                  : 'bg-white border-surface-border hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-xs font-bold ${
                    isSelected ? 'text-primary-dark' : 'text-charcoal'
                  }`}
                >
                  {item.label}
                </span>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                )}
              </div>
              <p className="text-[10px] text-charcoal-light leading-snug line-clamp-2">
                {item.purpose}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
