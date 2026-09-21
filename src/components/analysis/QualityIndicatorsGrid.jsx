import React from 'react';
import { Check, X, ShieldCheck, Droplets, Sparkles, Shapes, Trash2 } from 'lucide-react';

export default function QualityIndicatorsGrid({
  condition = 'Clean', // Clean vs Dusty
  moisture = 'Dry', // Dry vs Wet
  distribution = 'Uniform Size', // Uniform Size vs Mixed Size
  foreignObjects = 'Absent', // Absent vs Present
  className = '',
}) {
  const indicators = [
    {
      id: 'condition',
      label: 'Visual Condition',
      value: condition,
      isPass: condition?.toLowerCase().includes('clean'),
      passText: 'Clean',
      failText: 'Dusty',
      icon: Sparkles,
      criteria: 'Surface silts < 1.0%',
    },
    {
      id: 'moisture',
      label: 'Moisture Level',
      value: moisture,
      isPass: moisture?.toLowerCase().includes('dry'),
      passText: 'Dry',
      failText: 'Wet',
      icon: Droplets,
      criteria: 'Free moisture < 2.0%',
    },
    {
      id: 'distribution',
      label: 'Size Distribution',
      value: distribution,
      isPass: distribution?.toLowerCase().includes('uniform'),
      passText: 'Uniform Size',
      failText: 'Mixed Size',
      icon: Shapes,
      criteria: 'Flakiness index compliant',
    },
    {
      id: 'foreignObjects',
      label: 'Foreign Objects',
      value: foreignObjects,
      isPass:
        foreignObjects === false ||
        foreignObjects?.toString().toLowerCase().includes('absent'),
      passText: 'Absent',
      failText: 'Present',
      icon: Trash2,
      criteria: 'Zero organic/clay debris',
    },
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 text-left ${className}`}>
      {indicators.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
              item.isPass
                ? 'bg-status-success-light/40 border-status-success-border'
                : 'bg-status-error-light/40 border-status-error-border'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  item.isPass
                    ? 'bg-status-success/15 text-status-success-text'
                    : 'bg-status-error/15 text-status-error-text'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-charcoal block">
                  {item.label}
                </span>
                <span className="text-[10px] text-charcoal-light">
                  {item.criteria}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 pl-2">
              <span
                className={`text-xs font-bold ${
                  item.isPass
                    ? 'text-status-success-text'
                    : 'text-status-error-text'
                }`}
              >
                {item.value}
              </span>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  item.isPass
                    ? 'bg-status-success text-white'
                    : 'bg-status-error text-white'
                }`}
              >
                {item.isPass ? (
                  <Check className="w-3 h-3 stroke-[3]" />
                ) : (
                  <X className="w-3 h-3 stroke-[3]" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
