import React from 'react';
import { Scan, Sparkles, CheckCircle2, AlertTriangle, Ruler } from 'lucide-react';

export default function AIInspectionOverlay({
  active = true,
  result = null,
  material = 'Coarse Aggregate',
  confidence = 94.7,
  size = '20 mm',
  quality = 'Suitable for Use',
}) {
  if (!active) return null;

  const isSuitable = quality?.toLowerCase().includes('suitable') && !quality?.toLowerCase().includes('not');

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      {/* Precision Scanning Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Primary Detection Bounding Region */}
      <div className="absolute top-[18%] left-[15%] right-[15%] bottom-[22%] border-2 border-primary/80 rounded-lg shadow-[0_0_15px_rgba(74,111,165,0.3)]">
        {/* Corner Reticles */}
        <span className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-white" />
        <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-white" />
        <span className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-white" />
        <span className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-white" />

        {/* Floating AI Classification Tag */}
        <div className="absolute -top-3.5 left-3 bg-charcoal/90 text-white text-[11px] font-mono px-2 py-0.5 rounded shadow-sm flex items-center gap-1.5 backdrop-blur-sm border border-white/20">
          <Sparkles className="w-3 h-3 text-sand" />
          <span className="font-semibold">{material}</span>
          <span className="text-primary-light text-[10px]">({confidence}% conf)</span>
        </div>

        {/* Aggregate Sizing Caliper Line */}
        <div className="absolute bottom-3 right-3 bg-charcoal/90 text-white text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1.5 border border-white/20">
          <Ruler className="w-3 h-3 text-sand" />
          <span>EST. SIZE: {size}</span>
        </div>

        {/* Feature Segmentation Anchor Points */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-status-success animate-ping" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-status-success" />
        <div className="absolute top-2/3 left-1/3 w-2 h-2 rounded-full bg-primary" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-sand" />
      </div>

      {/* Top Banner Status */}
      <div className="absolute top-3 right-3 bg-charcoal/80 backdrop-blur-sm text-white text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
        <span>CV INFERENCE: ACTIVE</span>
      </div>

      {/* Bottom Compliance Watermark */}
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-charcoal text-[10px] font-semibold px-2.5 py-1 rounded-md border border-surface-border shadow-soft-sm flex items-center gap-1.5">
        {isSuitable ? (
          <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
        ) : (
          <AlertTriangle className="w-3.5 h-3.5 text-status-error" />
        )}
        <span>{quality}</span>
      </div>
    </div>
  );
}
