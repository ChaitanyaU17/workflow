import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './app/store';
import { logout } from './features/store/authSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

// auth
import RequireAuth from './components/auth/RequireAuth';
import SuperAdminLogin from './pages/superadmin/SuperAdminLogin';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';

// admin
import WorkflowList from './pages/admin/WorkflowList';
import WorkflowDesigner from './pages/admin/WorkflowDesigner';
import SessionManager from './pages/admin/SessionManager';

// consumer
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
      <Box component="header" sx={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, sm: 3.5 }, bgcolor: '#FFFFFF', borderBottom: '1.5px solid rgba(92,79,74,0.18)', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 4px rgba(92,79,74,0.08)', flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Typography sx={{ fontSize: '1.5rem', color: '#5C4F4A', lineHeight: 1 }}>⬡</Typography>
          <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#2E2522', fontFamily: '"Playfair Display", Georgia, serif', display: { xs: 'none', sm: 'block' } }}>
            Consumer Onboarding
          </Typography>
          <Box sx={{ fontSize: '0.62rem', fontWeight: 700, px: 1, py: 0.25, bgcolor: 'rgba(92,79,74,0.1)', color: '#5C4F4A', borderRadius: 10, border: '1px solid rgba(92,79,74,0.2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
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
                <Box sx={{ px: 1.75, py: 0.75, borderRadius: 1.5, fontSize: '0.875rem', fontWeight: isActive ? 600 : 500, color: isActive ? '#5C4F4A' : '#A89890', bgcolor: isActive ? 'rgba(92,79,74,0.1)' : 'transparent', transition: 'all 0.15s', cursor: 'pointer', '&:hover': { color: '#2E2522', bgcolor: '#F0ECE8' } }}>
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

const HomePage: React.FC = () => (
  <Box sx={{ minHeight: '100vh', bgcolor: '#F7F4F1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', px: { xs: 3, sm: 4 }, pt: { xs: 8, sm: 12 }, pb: { xs: 6, sm: 8 }, maxWidth: 720, width: '100%' }}>
      <Typography sx={{ fontSize: { xs: '3rem', sm: '4rem' }, lineHeight: 1, mb: 3, color: '#5C4F4A', animation: 'float 3s ease-in-out infinite', '@keyframes float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } } }}>⬡</Typography>
      <Typography variant="h1" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '2.2rem', sm: '3.2rem', md: '4rem' }, fontWeight: 700, color: '#2E2522', mb: 2.5, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
        Consumer Onboarding
      </Typography>
      <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' }, color: '#6B5F59', lineHeight: 1.7, mb: 4, maxWidth: 520 }}>
        Design workflows, build dynamic forms, and onboard customers seamlessly.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button component="a" href="/admin/login" variant="contained" size="large" sx={{ fontWeight: 700, px: 4, py: 1.5, fontSize: '0.95rem', borderRadius: 3 }}>
          Admin Login →
        </Button>
        <Button component="a" href="/onboarding/wf-demo-001" variant="outlined" size="large" sx={{ fontWeight: 600, px: 4, py: 1.5, fontSize: '0.95rem', borderRadius: 3 }}>
          Try Demo
        </Button>
      </Box>
    </Box>

    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2.5, px: { xs: 3, sm: 5 }, pb: 8, width: '100%', maxWidth: 1100 }}>
      {[
        { icon: '⬦', title: 'Visual Workflow Designer', desc: 'Drag-and-drop canvas to design multi-step onboarding journeys.' },
        { icon: '📋', title: 'Dynamic Form Builder', desc: 'Add typed fields with Yup validation rules per step.' },
        { icon: '🔗', title: 'Selective Data Sharing', desc: 'Generate expiring share links with only approved fields.' },
      ].map(f => (
        <Paper key={f.title} variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: '#FFFFFF', border: '1.5px solid rgba(92,79,74,0.18)', transition: 'all 0.2s', '&:hover': { borderColor: '#5C4F4A', transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(92,79,74,0.12)' } }}>
          <Typography sx={{ fontSize: '2rem', display: 'block', mb: 1.5, lineHeight: 1 }}>{f.icon}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#2E2522', mb: 1 }}>{f.title}</Typography>
          <Typography variant="body2" sx={{ color: '#6B5F59', lineHeight: 1.6 }}>{f.desc}</Typography>
        </Paper>
      ))}
    </Box>
  </Box>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/superadmin/login" element={<SuperAdminLogin />} />
        <Route path="/superadmin" element={
          <RequireAuth role="superadmin" redirectTo="/superadmin/login">
            <SuperAdminDashboard />
          </RequireAuth>
        } />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={
          <RequireAuth role={['admin', 'superadmin']} redirectTo="/admin/login">
            <AdminLayout><WorkflowList /></AdminLayout>
          </RequireAuth>
        } />
        <Route path="/admin/designer/:workflowId" element={
          <RequireAuth role={['admin', 'superadmin']} redirectTo="/admin/login">
            <AdminLayout><WorkflowDesigner /></AdminLayout>
          </RequireAuth>
        } />
        <Route path="/admin/sessions" element={
          <RequireAuth role={['admin', 'superadmin']} redirectTo="/admin/login">
            <AdminLayout><SessionManager /></AdminLayout>
          </RequireAuth>
        } />

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