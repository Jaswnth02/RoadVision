import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanSearch,
  ClipboardCheck,
  History,
  FileText,
  Info,
  Settings,
  ShieldCheck,
  Layers,
  Sparkles,
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/analysis', label: 'Material Analysis', icon: ScanSearch, highlight: true },
  { path: '/results', label: 'Inspection Results', icon: ClipboardCheck },
  { path: '/history', label: 'Analysis History', icon: History },
  { path: '/reports', label: 'Inspection Reports', icon: FileText },
  { path: '/about', label: 'About RoadVision', icon: Info },
  { path: '/settings', label: 'System Settings', icon: Settings },
];

export default function Sidebar({ onCloseMobile }) {
  return (
    <aside className="w-64 bg-white border-r border-surface-border flex flex-col h-full flex-shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-surface-border">
        <NavLink
          to="/dashboard"
          onClick={onCloseMobile}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
            <Layers className="w-5 h-5 transition-transform group-hover:scale-105" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base text-charcoal tracking-tight">
                RoadVision
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-primary-light text-primary-dark">
                AI
              </span>
            </div>
            <p className="text-[11px] text-charcoal-light line-clamp-1 leading-tight mt-0.5">
              Material Quality AI
            </p>
          </div>
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold text-charcoal-light uppercase tracking-wider">
          Inspection Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-primary-light text-primary-dark font-semibold shadow-soft-sm'
                    : 'text-charcoal-muted hover:bg-surface-muted hover:text-charcoal'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-sand" />
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Specifications & Standards Pill */}
      <div className="p-3 mx-3 mb-3 rounded-xl bg-surface-muted border border-surface-border">
        <div className="flex items-center gap-2 text-xs font-semibold text-charcoal mb-1">
          <ShieldCheck className="w-3.5 h-3.5 text-status-success" />
          <span>MoRTH & IRC Standards</span>
        </div>
        <p className="text-[11px] text-charcoal-light leading-relaxed">
          Automated aggregate sieve and quality compliance monitoring.
        </p>
      </div>

      {/* System Status Footer */}
      <div className="p-4 border-t border-surface-border bg-surface-subtle/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success"></span>
          </span>
          <span className="text-[11px] font-medium text-charcoal-muted">
            Vision System Active
          </span>
        </div>
        <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-surface-border text-charcoal-light">
          v1.0-demo
        </span>
      </div>
    </aside>
  );
}
