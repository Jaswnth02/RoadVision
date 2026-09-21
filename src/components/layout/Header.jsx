import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  ScanSearch,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Shield,
  X,
  LogOut,
  User,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const ROUTE_INFO = {
  '/dashboard': { title: 'Inspection Dashboard', breadcrumb: 'Overview' },
  '/analysis': { title: 'Material Analysis', breadcrumb: 'Live Inspection' },
  '/results': { title: 'Inspection Results', breadcrumb: 'Detailed Assessment' },
  '/history': { title: 'Analysis History', breadcrumb: 'Records' },
  '/reports': { title: 'Inspection Reports', breadcrumb: 'Certificates' },
  '/about': { title: 'About RoadVision AI', breadcrumb: 'Documentation' },
  '/settings': { title: 'System Settings', breadcrumb: 'Configuration' },
};

export default function Header({ onOpenMobile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentInfo = ROUTE_INFO[location.pathname] || {
    title: 'RoadVision AI',
    breadcrumb: 'System',
  };

  const sampleNotifications = [
    {
      id: 1,
      title: 'Batch PKG-NH48 Inspected',
      desc: '20 mm Coarse Aggregate classified with 96.4% confidence (Suitable).',
      time: '12m ago',
      type: 'success',
    },
    {
      id: 2,
      title: 'Borrow Pit Soil Rejection Alert',
      desc: 'High moisture and foreign debris flagged at Chainage 18+200.',
      time: '2h ago',
      type: 'warning',
    },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur border-b border-surface-border px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-xl text-charcoal hover:bg-surface-muted transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-charcoal-light">
            <span>RoadVision</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-primary font-semibold">{currentInfo.breadcrumb}</span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-charcoal tracking-tight">
            {currentInfo.title}
          </h2>
        </div>
      </div>

      {/* Right: Actions, Status & Notifications */}
      <div className="flex items-center gap-3">
        {/* System Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-muted border border-surface-border text-xs text-charcoal-muted">
          <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
          <span className="font-medium text-[11px]">AI Model Ready (Demo)</span>
        </div>

        {/* Quick Start Analysis CTA */}
        {location.pathname !== '/analysis' && (
          <Button
            size="sm"
            variant="primary"
            icon={ScanSearch}
            onClick={() => navigate('/analysis')}
            className="hidden md:inline-flex"
          >
            New Analysis
          </Button>
        )}

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-surface-muted transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-status-warning" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-surface-border shadow-soft-lg p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-border">
                <span className="text-xs font-bold text-charcoal">
                  Inspection Alerts
                </span>
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-charcoal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {sampleNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-2.5 rounded-xl bg-surface-subtle border border-surface-border text-left"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {notif.type === 'success' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-status-warning" />
                      )}
                      <span className="text-xs font-semibold text-charcoal">
                        {notif.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-charcoal-light leading-snug">
                      {notif.desc}
                    </p>
                    <span className="text-[10px] text-gray-400 block mt-1">
                      {notif.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quality Inspector Avatar & Session Dropdown */}
        <div className="relative pl-2 border-l border-surface-border">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-muted transition-colors text-left focus:outline-none"
            aria-label="User profile menu"
          >
            <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
              {user?.initials || 'QA'}
            </div>
            <div className="hidden lg:block text-left">
              <span className="text-xs font-semibold text-charcoal block leading-none truncate max-w-[130px]">
                {user?.name || 'Er. R. Sharma'}
              </span>
              <span className="text-[10px] text-charcoal-light leading-none block mt-0.5 truncate max-w-[130px]">
                {user?.role || 'Senior QA/QC'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden lg:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-surface-border shadow-soft-lg p-3 z-50 animate-in fade-in zoom-in-95 text-left">
              <div className="p-2 border-b border-surface-border mb-2">
                <div className="text-xs font-bold text-charcoal truncate">
                  {user?.name || 'Er. R. Sharma'}
                </div>
                <div className="text-[11px] text-charcoal-light truncate font-mono">
                  {user?.email || 'inspector@roadvision.ai'}
                </div>
                <div className="mt-1.5 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary-light text-primary-dark">
                  {user?.role || 'Senior QA/QC Inspector'}
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-status-error hover:bg-status-error/10 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
