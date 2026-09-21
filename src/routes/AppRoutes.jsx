import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from '../components/auth/ProtectedRoute';
import AppLayout from '../components/layout/AppLayout';

import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';

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
      {/* Public Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Engineering Workspace Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
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
