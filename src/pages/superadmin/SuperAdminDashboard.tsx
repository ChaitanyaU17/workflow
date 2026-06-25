import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../app/store';
import { logout } from '../../features/store/authSlice';
import { toggleAdminStatus, deleteAdmin } from '../../features/store/adminsSlice';
import { formatDate } from '../../utils/helpers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CreateAdminDialog from './CreateAdminDialog';
import BlogManager from './BlogManager';

const SuperAdminDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admins = useSelector((s: RootState) => s.admins.admins);
  const workflows = useSelector((s: RootState) => s.workflows.workflows);
  const currentUser = useSelector((s: RootState) => s.auth.currentUser);
  const blogs = useSelector((s: RootState) => s.blogs.blogs);

  const [createOpen, setCreateOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/superadmin/login', { replace: true });
  };

  const handleToggleStatus = (id: string) => {
    dispatch(toggleAdminStatus(id));
  };

  const handleDelete = (id: string) => {
    if (deleteConfirmId === id) {
      dispatch(deleteAdmin(id));
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(id);
      setTimeout(() => setDeleteConfirmId(null), 3000);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F7F4F1' }}>
      <Box sx={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, sm: 3.5 }, bgcolor: '#FFFFFF', borderBottom: '1.5px solid rgba(92,79,74,0.18)', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 4px rgba(92,79,74,0.08)'}}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Typography sx={{ fontSize: '1.5rem', color: '#5C4F4A', lineHeight: 1 }}>⬡</Typography>
          <Typography sx={{ fontWeight: 800, color: '#2E2522', fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '0.9rem', sm: '1rem' }}}>
            Super Admin Portal
          </Typography>
          <Chip
            label="SuperAdmin"
            size="small"
            color="error"
            sx={{ fontWeight: 700, fontSize: '0.65rem', height: 20 }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography
            variant="caption"
            sx={{ color: '#A89890', display: { xs: 'none', sm: 'block' } }}
          >
            {currentUser?.name}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={handleLogout}
            sx={{ fontWeight: 600 }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1100, mx: 'auto', p: { xs: 2, sm: 3, md: 4 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2}}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#2E2522' }}>
              Dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: '#A89890' }}>
              Manage admin accounts, monitor the platform, and publish blog posts
            </Typography>
          </Box>
          {activeTab === 0 && (
            <Button
              variant="contained"
              onClick={() => setCreateOpen(true)}
              sx={{ fontWeight: 700, borderRadius: 2 }}
            >
              Create Admin
            </Button>
          )}
        </Box>

        <Paper variant="outlined" sx={{ borderRadius: 2.5, border: '1.5px solid rgba(92,79,74,0.14)', overflow: 'hidden', bgcolor: '#FFFFFF' }}>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            sx={{ borderBottom: '1.5px solid rgba(92,79,74,0.12)', px: 2, '& .MuiTabs-indicator': { backgroundColor: '#5C4F4A', height: 3, borderRadius: '3px 3px 0 0' }}}
          >
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Admins</Typography>
                  <Chip label={admins.length} size="small" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 700 }} />
                </Box>
              }
              sx={{ textTransform: 'none', fontWeight: 600, minHeight: 48, '&.Mui-selected': { color: '#5C4F4A' } }}
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Workflows</Typography>
                  <Chip label={workflows.length} size="small" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 700 }} />
                </Box>
              }
              sx={{ textTransform: 'none', fontWeight: 600, minHeight: 48, '&.Mui-selected': { color: '#5C4F4A' } }}
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Blog Manager</Typography>
                  {blogs.length > 0 && (
                    <Chip label={blogs.length} size="small" color="success" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 700 }} />
                  )}
                </Box>
              }
              sx={{ textTransform: 'none', fontWeight: 600, minHeight: 48, '&.Mui-selected': { color: '#5C4F4A' } }}
            />
          </Tabs>

          {activeTab === 0 && (
            <Box sx={{ p: { xs: 2, sm: 3 } }}>
              {admins.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2E2522', mb: 0.5 }}>
                    No admins yet
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A89890', mb: 2.5 }}>
                    Create your first admin account to get started
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {admins.map(admin => {
                    const adminWorkflows = workflows.filter(w => w.createdBy === admin.id);
                    return (
                      <Paper
                        key={admin.id}
                        variant="outlined"
                        sx={{ borderRadius: 2.5, bgcolor: '#FFFFFF', overflow: 'hidden', border: '1.5px solid', borderColor: admin.isActive ? 'rgba(92,79,74,0.18)' : 'rgba(192,57,43,0.2)'}}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, flexWrap: 'wrap'}} >
                          <Avatar sx={{ bgcolor: admin.isActive ? '#5C4F4A' : '#A89890', width: 44, height: 44, fontWeight: 700, fontSize: '1rem', flexShrink: 0}} >
                            {admin.name.charAt(0).toUpperCase()}
                          </Avatar>

                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap'}} >
                              <Typography variant="body1" sx={{ fontWeight: 700, color: '#2E2522' }} >
                                {admin.name}
                              </Typography>
                              <Chip
                                label={admin.isActive ? 'Active' : 'Inactive'}
                                size="small"
                                color={admin.isActive ? 'success' : 'error'}
                                sx={{ fontWeight: 600, height: 20, fontSize: '0.65rem' }}
                              />
                            </Box>
                            <Typography
                              variant="caption"
                              sx={{ color: '#A89890', display: 'block' }}
                            >
                              @{admin.username} · {admin.email}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#A89890' }}>
                              {adminWorkflows.length} workflow
                              {adminWorkflows.length !== 1 ? 's' : ''} · Created{' '}
                              {formatDate(admin.createdAt)}
                            </Typography>
                          </Box>

                          <Box sx={{ display: 'flex', gap: 1, flexShrink: 0, flexWrap: 'wrap'}} >
                            <Tooltip title={ admin.isActive ? 'Deactivate admin' : 'Activate admin'}>
                              <Button
                                variant="outlined"
                                size="small"
                                color={admin.isActive ? 'warning' : 'success'}
                                onClick={() => handleToggleStatus(admin.id)}
                                sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                              >
                                {admin.isActive ? 'Deactivate' : 'Activate'}
                              </Button>
                            </Tooltip>
                            <Tooltip
                              title={ deleteConfirmId === admin.id ? 'Click again to confirm' : 'Delete admin'}
                            >
                              <Button
                                variant={ deleteConfirmId === admin.id ? 'contained' : 'outlined' }
                                color="error"
                                size="small"
                                onClick={() => handleDelete(admin.id)}
                                sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                              >
                                {deleteConfirmId === admin.id ? '⚠ Confirm?' : '🗑 Delete'}
                              </Button>
                            </Tooltip>
                          </Box>
                        </Box>

                        {adminWorkflows.length > 0 && (
                          <>
                            <Divider />
                            <Box sx={{ px: 2, py: 1.25, bgcolor: '#F7F4F1', display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center'}}>
                              <Typography variant="caption" sx={{ color: '#A89890', fontWeight: 600, mr: 0.5 }} >
                                Workflows:
                              </Typography>
                              {adminWorkflows.map(wf => (
                                <Chip
                                  key={wf.id}
                                  label={wf.name}
                                  size="small"
                                  variant="outlined"
                                  color={wf.status === 'published' ? 'success' : 'default'}
                                  sx={{ fontSize: '0.65rem', height: 20 }}
                                />
                              ))}
                            </Box>
                          </>
                        )}
                      </Paper>
                    );
                  })}
                </Box>
              )}
            </Box>
          )}

          {activeTab === 1 && (
            <Box sx={{ p: { xs: 2, sm: 3 } }}>
              <Grid container spacing={1.5}>
                {workflows.length === 0 ? (
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ textAlign: 'center', py: 5 }}>
                      <Typography sx={{ fontSize: '2rem', mb: 1 }}>⬡</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#2E2522' }}>
                        No workflows yet
                      </Typography>
                    </Box>
                  </Grid>
                ) : (
                  workflows.map(wf => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={wf.id}>
                      <Paper
                        variant="outlined"
                        sx={{ p: 2, borderRadius: 2, bgcolor: '#FFFFFF' }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.75}} >
                          <Chip
                            label={wf.status}
                            size="small"
                            color={wf.status === 'published' ? 'success' : 'default'}
                            sx={{ fontWeight: 600, fontSize: '0.65rem', height: 20 }}
                          />
                          <Typography variant="caption" sx={{ color: '#A89890' }}>
                            {formatDate(wf.updatedAt)}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 700, color: '#2E2522', mb: 0.5 }}
                          noWrap
                        >
                          {wf.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#A89890' }}>
                          By:{' '}
                          {wf.createdBy === 'superadmin'
                            ? 'Super Admin'
                            : admins.find(a => a.id === wf.createdBy)?.name ?? wf.createdBy}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))
                )}
              </Grid>
            </Box>
          )}

          {activeTab === 2 && <BlogManager />}
        </Paper>
      </Box>

      <CreateAdminDialog open={createOpen} onClose={() => setCreateOpen(false)} />
    </Box>
  );
};

export default SuperAdminDashboard;