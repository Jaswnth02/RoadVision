import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AppLayout from '../components/layout/AppLayout';
import Dashboard from '../pages/Dashboard';
import Analysis from '../pages/Analysis';
import Results from '../pages/Results';
import History from '../pages/History';
import Reports from '../pages/Reports';
import About from '../pages/About';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="analysis" element={<Analysis />} />
        <Route path="results" element={<Results />} />
        <Route path="history" element={<History />} />
        <Route path="reports" element={<Reports />} />
        <Route path="about" element={<About />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
