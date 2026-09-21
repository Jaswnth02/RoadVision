import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Home, ScanSearch } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <div className="w-16 h-16 rounded-2xl bg-surface-muted border border-surface-border flex items-center justify-center text-primary mb-4 shadow-soft">
        <AlertCircle className="w-8 h-8 text-status-warning" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
        404 — Page Not Found
      </h1>
      <p className="text-sm text-charcoal-light mt-2 max-w-md leading-relaxed">
        The road material inspection route you requested does not exist or has been relocated.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Button
          variant="primary"
          icon={Home}
          onClick={() => navigate('/dashboard')}
        >
          Return to Dashboard
        </Button>
        <Button
          variant="outline"
          icon={ScanSearch}
          onClick={() => navigate('/analysis')}
        >
          New Analysis
        </Button>
      </div>
    </div>
  );
}
