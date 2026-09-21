import React from 'react';
import {
  Camera,
  Cpu,
  ScanSearch,
  Ruler,
  Eye,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Image Capture', icon: Camera },
  { id: 2, title: 'Preprocessing', icon: Cpu },
  { id: 3, title: 'Material Recognition', icon: ScanSearch },
  { id: 4, title: 'Size Classification', icon: Ruler },
  { id: 5, title: 'Visual Quality', icon: Eye },
  { id: 6, title: 'Quality Assessment', icon: ShieldCheck },
  { id: 7, title: 'Final Recommendation', icon: CheckCircle },
];

export default function WorkflowStepper({ currentStep = 1, isAnalyzing = false }) {
  return (
    <div className="w-full bg-white border border-surface-border rounded-2xl p-4 sm:p-5 shadow-soft-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-charcoal uppercase tracking-wider">
          Proposed 7-Step Inspection Pipeline
        </span>
        <span className="text-[11px] text-charcoal-light font-mono">
          Step {Math.min(currentStep, 7)} of 7
        </span>
      </div>

      {/* Stepper horizontal list */}
      <div className="relative flex items-center justify-between overflow-x-auto py-2 no-scrollbar">
        {/* Connecting track line */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-[2px] bg-gray-100 -z-0 hidden md:block" />

        {STEPS.map((step) => {
          const Icon = step.icon;
          const isPassed = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center flex-1 min-w-[80px] sm:min-w-[90px] px-1 group"
            >
              {/* Step Circle */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCurrent
                    ? 'bg-primary text-white ring-4 ring-primary/20 scale-105 shadow-soft-sm'
                    : isPassed
                    ? 'bg-status-success text-white'
                    : 'bg-surface-muted text-gray-400 border border-surface-border'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Step Label */}
              <span
                className={`mt-2 text-[11px] text-center font-medium leading-tight transition-colors ${
                  isCurrent
                    ? 'text-primary font-bold'
                    : isPassed
                    ? 'text-charcoal font-semibold'
                    : 'text-gray-400'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
