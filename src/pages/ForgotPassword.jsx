import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmittedMessage('');

    const emailTrimmed = email.trim();
    if (!emailTrimmed) {
      setError('Email address is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await forgotPassword(emailTrimmed);
      setSubmittedMessage(
        res.message ||
          'If an account exists for this email, password reset instructions have been sent.'
      );
    } catch (err) {
      setError(err.message || 'Failed to send reset instructions. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center relative overflow-hidden font-sans text-charcoal select-none p-4">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md mx-auto z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 text-left">
          {/* Logo Header */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-base text-charcoal tracking-tight">
              RoadVision <span className="text-sand font-mono">AI</span>
            </span>
          </div>

          <div className="space-y-1.5 mb-6">
            <h1 className="text-2xl font-bold text-charcoal tracking-tight">
              Forgot your password?
            </h1>
            <p className="text-xs text-charcoal-light leading-relaxed">
              Enter your registered email address and we&apos;ll send you instructions to reset your password.
            </p>
          </div>

          {/* Feedback Messages */}
          {submittedMessage && (
            <div className="mb-4 p-3 rounded-xl bg-status-success/10 border border-status-success/30 text-status-success-text flex items-start gap-2.5 text-xs animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-status-success flex-shrink-0 mt-0.5" />
              <span>{submittedMessage}</span>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-status-error/10 border border-status-error/30 text-status-error-text flex items-start gap-2.5 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-status-error flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="reset-email" className="block text-xs font-semibold text-charcoal">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-light">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  className={`w-full bg-white text-charcoal placeholder:text-gray-400 border text-sm rounded-xl pl-10 pr-3.5 py-2.5 transition-all focus:outline-none focus:ring-2 ${
                    error
                      ? 'border-status-error focus:ring-status-error/20 bg-red-50/20'
                      : 'border-surface-border focus:border-primary focus:ring-primary/20'
                  }`}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              loading={isSubmitting}
              className="w-full shadow-soft-sm font-semibold text-sm py-3"
            >
              {isSubmitting ? 'Sending Instructions...' : 'Send Reset Link'}
            </Button>
          </form>

          {/* Back to Login Link */}
          <div className="pt-6 border-t border-surface-border mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
