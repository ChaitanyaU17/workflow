import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './app/store';
import { logout } from './features/store/authSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

import RequireAuth from './components/auth/RequireAuth';

import PublicLayout from './components/public/PublicLayout';
import LandingPage from './pages/public/LandingPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import PrivacyPolicyPage from './pages/public/PrivacyPolicyPage';
import TermsPage from './pages/public/TermsPage';
import DocumentationPage from './pages/public/DocumentationPage';
import BlogListPage from './pages/public/BlogListPage';

import SuperAdminLogin from './pages/superadmin/SuperAdminLogin';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';

import AdminLogin from './pages/admin/AdminLogin';
import WorkflowList from './pages/admin/WorkflowList';
import WorkflowDesigner from './pages/admin/WorkflowDesigner';
import SessionManager from './pages/admin/SessionManager';

import OnboardingEntry from './pages/consumer/OnboardingEntry';
import OnboardingStep from './pages/consumer/OnboardingStep';
import OnboardingReview from './pages/consumer/OnboardingReview';
import OnboardingDone from './pages/consumer/OnboardingDone';
import ShareView from './pages/consumer/ShareView';

import './App.css';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((s: RootState) => s.auth.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login', { replace: true });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#F7F4F1' }}>
      <Box
        component="header"
        sx={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, sm: 3.5 }, bgcolor: '#FFFFFF', borderBottom: '1.5px solid rgba(92,79,74,0.18)', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 4px rgba(92,79,74,0.08)', flexShrink: 0}}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Typography sx={{ fontSize: '1.5rem', color: '#5C4F4A', lineHeight: 1 }}>⬡</Typography>
          <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#2E2522', fontFamily: '"Playfair Display", Georgia, serif', display: { xs: 'none', sm: 'block' }}}>
            Consumer Onboarding
          </Typography>
          <Box sx={{ fontSize: '0.62rem', fontWeight: 700, px: 1, py: 0.25, bgcolor: 'rgba(92,79,74,0.1)', color: '#5C4F4A', borderRadius: 10, border: '1px solid rgba(92,79,74,0.2)', letterSpacing: '0.08em', textTransform: 'uppercase'}} >
            Admin
          </Box>
        </Box>

        <Box component="nav" sx={{ display: 'flex', gap: 0.5 }}>
          {[
            { to: '/admin', label: 'Workflows', end: true },
            { to: '/admin/sessions', label: 'Sessions', end: false },
          ].map(link => (
            <NavLink key={link.to} to={link.to} end={link.end} style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <Box sx={{ px: 1.75, py: 0.75, borderRadius: 1.5, fontSize: '0.875rem', fontWeight: isActive ? 600 : 500, color: isActive ? '#5C4F4A' : '#A89890', bgcolor: isActive ? 'rgba(92,79,74,0.1)' : 'transparent', transition: 'all 0.15s', cursor: 'pointer', '&:hover': { color: '#2E2522', bgcolor: '#F0ECE8' }}}>
                  {link.label}
                </Box>
              )}
            </NavLink>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {currentUser && (
            <>
              <Typography variant="caption" sx={{ color: '#A89890', display: { xs: 'none', sm: 'block' } }}>
                {currentUser.name}
              </Typography>
              <Chip
                label={currentUser.role === 'superadmin' ? 'SuperAdmin' : 'Admin'}
                size="small"
                color={currentUser.role === 'superadmin' ? 'error' : 'default'}
                sx={{ fontWeight: 600, fontSize: '0.65rem', height: 20, display: { xs: 'none', sm: 'flex' } }}
              />
            </>
          )}
          <Button variant="outlined" size="small" onClick={handleLogout} sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
            Logout
          </Button>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
        <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicyPage /></PublicLayout>} />
        <Route path="/terms-and-conditions" element={<PublicLayout><TermsPage /></PublicLayout>} />
        <Route path="/documentation" element={<PublicLayout><DocumentationPage /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><BlogListPage /></PublicLayout>} />

        <Route path="/superadmin/login" element={<SuperAdminLogin />} />
        <Route
          path="/superadmin"
          element={
            <RequireAuth role="superadmin" redirectTo="/superadmin/login">
              <SuperAdminDashboard />
            </RequireAuth>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAuth role={['admin', 'superadmin']} redirectTo="/admin/login">
              <AdminLayout><WorkflowList /></AdminLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/designer/:workflowId"
          element={
            <RequireAuth role={['admin', 'superadmin']} redirectTo="/admin/login">
              <AdminLayout><WorkflowDesigner /></AdminLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/sessions"
          element={
            <RequireAuth role={['admin', 'superadmin']} redirectTo="/admin/login">
              <AdminLayout><SessionManager /></AdminLayout>
            </RequireAuth>
          }
        />

        <Route path="/onboarding/:workflowId" element={<OnboardingEntry />} />
        <Route path="/onboarding/:workflowId/step/:nodeId" element={<OnboardingStep />} />
        <Route path="/onboarding/:workflowId/review" element={<OnboardingReview />} />
        <Route path="/onboarding/:workflowId/done" element={<OnboardingDone />} />

        <Route path="/share/:token" element={<ShareView />} />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;