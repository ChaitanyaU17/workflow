import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import type { UserRole } from '../../features/store/authSlice';

interface RequireAuthProps {
  children: React.ReactNode;
  role: UserRole | UserRole[];
  redirectTo: string;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, role, redirectTo }) => {
  const { isAuthenticated, currentUser } = useSelector((s: RootState) => s.auth);
  const location = useLocation();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  const allowedRoles = Array.isArray(role) ? role : [role];

  const hasAccess =
    allowedRoles.includes(currentUser.role) ||
    currentUser.role === 'superadmin';

  if (!hasAccess) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;