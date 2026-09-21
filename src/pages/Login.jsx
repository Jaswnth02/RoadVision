import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Layers,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ScanSearch,
  Ruler,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  // If already authenticated, redirect to dashboard
  const destination = location.state?.from?.pathname || '/dashboard';

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Status & Validation States
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};
    const emailTrimmed = email.trim();

    if (!emailTrimmed) {
      newErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailTrimmed)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await login(email, password, rememberMe);
      navigate(destination, { replace: true });
    } catch (err) {
      setAuthError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center relative overflow-hidden font-sans text-charcoal select-none">
      {/* Dynamic Background Computer Vision Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-sand/15 blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 z-10 my-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN — Project Branding & Engineering Context                     */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-charcoal to-slate-800 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Top scanning reticle motif */}
            <div className="absolute top-6 right-6 opacity-30 flex items-center gap-1 font-mono text-[10px] text-primary-light">
              <span className="w-2 h-2 rounded-full bg-status-success animate-ping" />
              <span>CV FRAMEWORK v1.0</span>
            </div>

            {/* Header / Logo */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-light shadow-soft-sm">
                  <Layers className="w-6 h-6 text-sand" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                      RoadVision <span className="text-sand font-mono">AI</span>
                    </h1>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-primary-light border border-white/10">
                      MoRTH / IRC
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono tracking-wide">
                    Civil Infrastructure Quality Assurance
                  </p>
                </div>
              </div>

              {/* Research Title & Subtitle */}
              <div className="space-y-2 border-l-2 border-primary/60 pl-4 py-1">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  AI Road Material Recognition
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  AI-powered computer vision for automated road construction material and aggregate size analysis.
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="space-y-2.5 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 hover:bg-white/10 transition-colors">
                  <div className="p-2 rounded-lg bg-primary/20 text-primary-light mt-0.5">
                    <Ruler className="w-4 h-4 text-sand" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">
                      Aggregate Size Classification
                    </h3>
                    <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                      10 mm (Surface Seal), 20 mm (DBM), 40 mm (GSB), and 150 mm (Heavy Boulder / Specimen Core).
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 hover:bg-white/10 transition-colors">
                  <div className="p-2 rounded-lg bg-primary/20 text-primary-light mt-0.5">
                    <ScanSearch className="w-4 h-4 text-primary-light" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">
                      Road Material Recognition
                    </h3>
                    <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                      Coarse aggregates, Zone-II sand, VG-30 bitumen, cement, and subgrade soil classification.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 hover:bg-white/10 transition-colors">
                  <div className="p-2 rounded-lg bg-primary/20 text-primary-light mt-0.5">
                    <Cpu className="w-4 h-4 text-sand" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">
                      AI-Based Image Analysis
                    </h3>
                    <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                      7-stage computer vision inference pipeline with bilateral filtering and deep feature extraction.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 hover:bg-white/10 transition-colors">
                  <div className="p-2 rounded-lg bg-primary/20 text-primary-light mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-status-success" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">
                      Quality Assessment Support
                    </h3>
                    <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                      Automated engineering compliance scoring against IRC:111-2009 and MoRTH Section 500 standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Research Footer */}
            <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-[11px] text-gray-400">
              <span>National Highway Materials Research</span>
              <span className="font-mono text-gray-500">IRC:111 / IS 383:2016</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN — Login Card & Authentication Form                          */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-white text-charcoal">
            <div>
              {/* Header */}
              <div className="space-y-1.5 text-left mb-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-light text-primary-dark text-[11px] font-semibold">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span>Authorized Engineering Access</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal">
                  Welcome Back
                </h2>
                <p className="text-xs sm:text-sm text-charcoal-light">
                  Sign in to continue to your analysis dashboard.
                </p>
              </div>

              {/* Authentication Error Alert */}
              {authError && (
                <div
                  role="alert"
                  className="mb-4 p-3 rounded-xl bg-status-error/10 border border-status-error/30 text-status-error-text flex items-start gap-2.5 text-xs text-left animate-in fade-in"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-status-error" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="login-email"
                    className="block text-xs font-semibold text-charcoal"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-light">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                      placeholder="Enter your email address"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`w-full bg-white text-charcoal placeholder:text-gray-400 border text-sm rounded-xl pl-10 pr-3.5 py-2.5 transition-all duration-150 focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-status-error focus:border-status-error focus:ring-status-error/20 bg-red-50/20'
                          : 'border-surface-border focus:border-primary focus:ring-primary/20'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="text-xs text-status-error">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="login-password"
                    className="block text-xs font-semibold text-charcoal"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-light">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({ ...errors, password: null });
                      }}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                      className={`w-full bg-white text-charcoal placeholder:text-gray-400 border text-sm rounded-xl pl-10 pr-10 py-2.5 transition-all duration-150 focus:outline-none focus:ring-2 ${
                        errors.password
                          ? 'border-status-error focus:border-status-error focus:ring-status-error/20 bg-red-50/20'
                          : 'border-surface-border focus:border-primary focus:ring-primary/20'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-charcoal-light hover:text-charcoal transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 rounded"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p id="password-error" className="text-xs text-status-error">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-primary rounded border-surface-border focus:ring-primary"
                    />
                    <span className="text-xs text-charcoal-muted">Remember me</span>
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-primary hover:text-primary-dark hover:underline transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    className="w-full shadow-soft-sm font-semibold text-sm py-3"
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </Button>
                </div>
              </form>
            </div>

            {/* Bottom Registration CTA */}
            <div className="pt-6 border-t border-surface-border mt-6 text-center text-xs text-charcoal-light">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="font-bold text-primary hover:text-primary-dark hover:underline transition-colors ml-1"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
