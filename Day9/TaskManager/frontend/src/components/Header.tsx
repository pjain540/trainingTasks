'use client';

import React from 'react';
import { useAuth } from '@/context/authContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg py-5 px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div>
          <h1 className="mb-1"><span className='h3'>Project Sprint:</span> VoidPhase</h1>
          {/* <p className="text-color-muted mb-0 small">
            Manage active sprint cycles and task prioritization.
          </p> */}
        </div>


        {/* User Info */}
        <div className="d-flex align-items-center gap-4">
          <div className="d-flex align-items-center gap-3">
            <div className="text-end">
              <div className="small fw-bold text-white">{user?.name || 'Guest'}</div>
              <div className="text-color-muted" style={{ fontSize: '0.7rem' }}>{user?.email || 'guest@example.com'}</div>
            </div>
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop" alt="Profile" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
