import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About', end: false },
  { to: '/blog', label: 'Blog', end: false },
  { to: '/documentation', label: 'Docs', end: false },
  { to: '/contact', label: 'Contact', end: false },
];

const PublicNavbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box
      component="header"
      sx={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, sm: 3.5 },
        bgcolor: 'rgba(247,244,241,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1.5px solid rgba(92,79,74,0.12)',
        position: 'sticky',
        top: 0,
        zIndex: 200,
        boxShadow: '0 1px 4px rgba(92,79,74,0.06)',
        flexShrink: 0,
      }}
    >
    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
      <Typography sx={{ fontSize: '1.6rem', color: '#5C4F4A', lineHeight: 1 }}>⬡</Typography>
      <Box>
        <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#2E2522', fontFamily: '"Playfair Display", Georgia, serif', lineHeight: 1.1}}>
          Workflow X
        </Typography>
        <Typography sx={{ fontSize: '0.6rem', color: '#A89890', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600}}>
          Consumer Onboarding
        </Typography>
      </Box>
    </Link>

      <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
        {NAV_LINKS.map(link => (
          <NavLink key={link.to} to={link.to} end={link.end} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <Box
                sx={{
                  px: 1.75,
                  py: 0.75,
                  borderRadius: 1.5,
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#5C4F4A' : '#A89890',
                  bgcolor: isActive ? 'rgba(92,79,74,0.08)' : 'transparent',
                  transition: 'all 0.15s',
                  cursor: 'pointer',
                  '&:hover': { color: '#2E2522', bgcolor: '#F0ECE8' },
                }}
              >
                {link.label}
              </Box>
            )}
          </NavLink>
        ))}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          component={Link}
          to="/admin/login"
          variant="contained"
          size="small"
          endIcon={<LoginIcon sx={{ fontSize: '0.9rem !important' }} />}
          sx={{ fontWeight: 700, fontSize: '0.8rem', display: { xs: 'none', sm: 'flex' }, borderRadius: 2}}>
          Admin Login
        </Button>

        <IconButton
          size="small"
          sx={{ display: { md: 'none' }, color: '#5C4F4A', bgcolor: 'rgba(92,79,74,0.06)', borderRadius: 1.5, '&:hover': { bgcolor: 'rgba(92,79,74,0.12)' }}}
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
        >
          <MenuIcon fontSize="small" />
        </IconButton>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: {sx: {width: 260, bgcolor: '#F7F4F1', border: 'none', borderLeft: '1.5px solid rgba(92,79,74,0.12)'}}}}
      >
        <Box sx={{ px: 2.5, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: '1.4rem', color: '#5C4F4A' }}>⬡</Typography>
          <Typography sx={{ fontWeight: 800, color: '#2E2522', fontFamily: '"Playfair Display", Georgia, serif', fontSize: '0.95rem'}}>
            Workflow X
          </Typography>
        </Box>
          <IconButton
            size="small"
            onClick={() => setDrawerOpen(false)}
            sx={{ color: '#A89890', '&:hover': { color: '#5C4F4A' } }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: 'rgba(92,79,74,0.12)' }} />

        <List sx={{ px: 1, pt: 1 }}>
          {NAV_LINKS.map(link => (
            <ListItem key={link.to} disablePadding>
              <NavLink
                to={link.to}
                end={link.end}
                style={{ textDecoration: 'none', width: '100%' }}
                onClick={() => setDrawerOpen(false)}
              >
                {({ isActive }) => (
                  <ListItemButton sx={{ borderRadius: 1.5, fontWeight: isActive ? 700 : 500, color: isActive ? '#5C4F4A' : '#6B5F59', bgcolor: isActive ? 'rgba(92,79,74,0.08)' : 'transparent', fontSize: '0.9rem', py: 1, mb: 0.25}}>
                    {link.label}
                  </ListItemButton>
                )}
              </NavLink>
            </ListItem>
          ))}
        </List>

        <Box sx={{ px: 2, pt: 1.5 }}>
          <Button
            component={Link}
            to="/admin/login"
            variant="contained"
            fullWidth
            endIcon={<LoginIcon />}
            onClick={() => setDrawerOpen(false)}
            sx={{ fontWeight: 700, borderRadius: 2 }}
          >
            Admin Login
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default PublicNavbar;