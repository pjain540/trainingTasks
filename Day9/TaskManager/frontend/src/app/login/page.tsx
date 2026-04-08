'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/authContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  
  const { login, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    try {
      await login({ email, password });
      router.push('/'); // Redirect to home/dashboard on success
    } catch (err: any) {
      setLocalError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white p-4" style={{
      background: 'radial-gradient(circle at top right, #1a1a1e 0%, #0b0b0e 100%)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-5 rounded-5"
        style={{ maxWidth: '450px', width: '100%' }}
      >
        <div className="text-center mb-5">
          <div className="d-flex align-items-center justify-content-center mb-3">
            <div className="bg-primary rounded-circle" style={{ width: '48px', height: '48px' }}></div>
          </div>
          <h2 className="fw-bold mb-2">Welcome Back</h2>
          <p className="text-color-muted small">Access your premium task management workspace.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {localError && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="alert alert-danger border-0 rounded-3 mb-4 py-3 small text-center"
              style={{ background: 'rgba(220, 53, 69, 0.1)', color: '#ff6b6b' }}
            >
              {localError}
            </motion.div>
          )}

          <div className="mb-4">
            <label className="form-label small text-color-muted mb-2">Email Address</label>
            <input
              type="email"
              className="form-control bg-dark border-white border-opacity-10 text-white rounded-3 py-3"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              style={{ background: 'rgba(0,0,0,0.2) !important' }}
            />
          </div>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label small text-color-muted mb-0">Password</label>
            </div>
            <input
              type="password"
              className="form-control bg-dark border-white border-opacity-10 text-white rounded-3 py-3"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              style={{ background: 'rgba(0,0,0,0.2) !important' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-3 rounded-3 fw-bold mb-4 shadow-lg transition-all"
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #5D5FEF 0%, #484AC3 100%)',
              border: 'none'
            }}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : null}
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>
      </motion.div>

      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .form-control:focus {
          border-color: #5D5FEF;
          box-shadow: 0 0 0 0.25rem rgba(93, 95, 239, 0.1);
          background: rgba(0,0,0,0.3) !important;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(93, 95, 239, 0.4);
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
}
