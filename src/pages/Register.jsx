import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Layers,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShieldCheck,
  Briefcase,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Senior QA/QC Inspector',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Password Validation Criteria
  const pwd = formData.password;
  const passwordCriteria = [
    { label: 'Minimum 8 characters', valid: pwd.length >= 8 },
    { label: 'At least one uppercase letter', valid: /[A-Z]/.test(pwd) },
    { label: 'At least one lowercase letter', valid: /[a-z]/.test(pwd) },
    { label: 'At least one number', valid: /[0-9]/.test(pwd) },
    { label: 'At least one special character', valid: /[^A-Za-z0-9]/.test(pwd) },
  ];

  const allCriteriaPassed = passwordCriteria.every((c) => c.valid);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (!allCriteriaPassed) {
      newErrors.password = 'Please satisfy all password complexity requirements.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms & Conditions and Privacy Policy.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      setSuccessMessage(res.message || 'Account created successfully. Please sign in.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setServerError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center relative overflow-hidden font-sans text-charcoal select-none py-8">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-sand/15 blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl mx-auto p-4 sm:p-6 z-10 my-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-10 text-left">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-surface-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-charcoal tracking-tight">
                  Create Engineering Account
                </h1>
                <p className="text-xs text-charcoal-light">
                  RoadVision AI Materials QA/QC Portal
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-muted border border-surface-border text-charcoal-light">
              Registration
            </span>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-status-success/10 border border-status-success/30 text-status-success-text flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-status-success flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Server Error Message */}
          {serverError && (
            <div className="mb-4 p-3 rounded-xl bg-status-error/10 border border-status-error/30 text-status-error-text flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 text-status-error flex-shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="reg-name" className="block text-xs font-semibold text-charcoal">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-light">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="reg-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter your full name (e.g. Er. Rajesh Sharma)"
                  className={`w-full bg-white text-charcoal placeholder:text-gray-400 border text-sm rounded-xl pl-10 pr-3.5 py-2.5 transition-all focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-status-error focus:ring-status-error/20 bg-red-50/20'
                      : 'border-surface-border focus:border-primary focus:ring-primary/20'
                  }`}
                />
              </div>
              {errors.name && <p className="text-xs text-status-error">{errors.name}</p>}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label htmlFor="reg-email" className="block text-xs font-semibold text-charcoal">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-light">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="reg-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Enter your official email address"
                  className={`w-full bg-white text-charcoal placeholder:text-gray-400 border text-sm rounded-xl pl-10 pr-3.5 py-2.5 transition-all focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-status-error focus:ring-status-error/20 bg-red-50/20'
                      : 'border-surface-border focus:border-primary focus:ring-primary/20'
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs text-status-error">{errors.email}</p>}
            </div>

            {/* Engineering Role */}
            <div className="space-y-1.5">
              <label htmlFor="reg-role" className="block text-xs font-semibold text-charcoal">
                Designation / Engineering Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-light">
                  <Briefcase className="w-4 h-4" />
                </div>
                <select
                  id="reg-role"
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-full bg-white text-charcoal border border-surface-border text-sm rounded-xl pl-10 pr-3.5 py-2.5 transition-all focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary/20 appearance-none"
                >
                  <option value="Senior QA/QC Inspector">Senior QA/QC Inspector</option>
                  <option value="Project Materials Engineer">Project Materials Engineer</option>
                  <option value="MoRTH Quality Auditor">MoRTH Quality Auditor</option>
                  <option value="Field Site Supervisor">Field Site Supervisor</option>
                  <option value="Highway Testing Researcher">Highway Testing Researcher</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="reg-password" className="block text-xs font-semibold text-charcoal">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-light">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Create a password"
                  className={`w-full bg-white text-charcoal placeholder:text-gray-400 border text-sm rounded-xl pl-10 pr-10 py-2.5 transition-all focus:outline-none focus:ring-2 ${
                    errors.password
                      ? 'border-status-error focus:ring-status-error/20 bg-red-50/20'
                      : 'border-surface-border focus:border-primary focus:ring-primary/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-charcoal-light hover:text-charcoal transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-status-error">{errors.password}</p>}
            </div>

            {/* Password Requirements Checklist (Live Dynamic Ticks) */}
            <div className="p-3 rounded-xl bg-surface-subtle border border-surface-border space-y-1 text-xs">
              <span className="font-semibold text-charcoal block text-[11px] mb-1">
                Password Requirements:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {passwordCriteria.map((crit, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-1.5 text-[11px] transition-colors ${
                      crit.valid ? 'text-status-success font-medium' : 'text-charcoal-light'
                    }`}
                  >
                    {crit.valid ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-status-success flex-shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-gray-300 inline-block flex-shrink-0" />
                    )}
                    <span>{crit.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label htmlFor="reg-confirm" className="block text-xs font-semibold text-charcoal">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-light">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="reg-confirm"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  className={`w-full bg-white text-charcoal placeholder:text-gray-400 border text-sm rounded-xl pl-10 pr-10 py-2.5 transition-all focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? 'border-status-error focus:ring-status-error/20 bg-red-50/20'
                      : 'border-surface-border focus:border-primary focus:ring-primary/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-charcoal-light hover:text-charcoal transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-status-error">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-charcoal-muted">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-surface-border focus:ring-primary mt-0.5"
                />
                <span>
                  I agree to the{' '}
                  <span className="text-primary font-semibold hover:underline">
                    Terms & Conditions
                  </span>{' '}
                  and{' '}
                  <span className="text-primary font-semibold hover:underline">
                    Privacy Policy
                  </span>{' '}
                  for civil engineering telemetry.
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-xs text-status-error mt-1">{errors.agreeTerms}</p>
              )}
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
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </form>

          {/* Footer Back to Login */}
          <div className="pt-6 border-t border-surface-border mt-6 text-center text-xs text-charcoal-light">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-primary hover:text-primary-dark hover:underline transition-colors ml-1"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
