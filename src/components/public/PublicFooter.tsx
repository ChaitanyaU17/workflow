import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const FOOTER_COLS = [
  {
    heading: 'Product',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Documentation', to: '/documentation' },
      { label: 'Blog', to: '/blog' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms & Conditions', to: '/terms-and-conditions' },
    ],
  },
];

const PublicFooter: React.FC = () => (
  <Box
    component="footer"
    sx={{ bgcolor: '#F0ECE8', borderTop: '1.5px solid rgba(92,79,74,0.14)', pt: { xs: 5, sm: 7 }, pb: { xs: 3, sm: 4 }, px: { xs: 3, sm: 5 }, mt: 'auto'}}>
    <Box sx={{ maxWidth: 1100, mx: 'auto', display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)', md: '2fr 1fr 1fr 1fr' }, gap: { xs: 4, sm: 5 }, mb: 5}}>
      <Box sx={{ gridColumn: { xs: '1 / -1', sm: '1 / 2', md: '1 / 2' } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <Typography sx={{ fontSize: '1.4rem', color: '#5C4F4A', lineHeight: 1 }}>⬡</Typography>
        <Typography sx={{ fontWeight: 800, color: '#2E2522', fontFamily: '"Playfair Display", Georgia, serif', fontSize: '1rem'}}>
          Workflow X
        </Typography>
      </Box>
        <Typography variant="body2" sx={{ color: '#6B5F59', lineHeight: 1.7, maxWidth: 240 }}>
          Build, manage and automate consumer onboarding workflows with ease. Designed for teams that value efficiency and clarity.
        </Typography>
      </Box>

      {FOOTER_COLS.map(col => (
        <Box key={col.heading}>
          <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A89890', mb: 1.5}}>
            {col.heading}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            {col.links.map(lnk => (
              <Link key={lnk.to} to={lnk.to} style={{ textDecoration: 'none' }}>
                <Typography sx={{ fontSize: '0.875rem', color: '#6B5F59', fontWeight: 500, transition: 'color 0.15s', '&:hover': { color: '#5C4F4A' }, display: 'inline-block'}}>
                  {lnk.label}
                </Typography>
              </Link>
            ))}
          </Box>
        </Box>
      ))}
    </Box>

    <Divider sx={{ borderColor: 'rgba(92,79,74,0.12)', mb: 3 }} />

    <Box sx={{ maxWidth: 1100, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5}}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <Typography variant="caption" sx={{ color: '#A89890' }}>
          © {new Date().getFullYear()} Workflow X. All rights reserved.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Link to="/privacy-policy" style={{ textDecoration: 'none' }}>
          <Typography
            variant="caption"
            sx={{ color: '#A89890', '&:hover': { color: '#5C4F4A' }, transition: 'color 0.15s' }}
          >
            Privacy Policy
          </Typography>
        </Link>
        <Link to="/terms-and-conditions" style={{ textDecoration: 'none' }}>
          <Typography
            variant="caption"
            sx={{ color: '#A89890', '&:hover': { color: '#5C4F4A' }, transition: 'color 0.15s' }}
          >
            Terms & Conditions
          </Typography>
        </Link>
      </Box>
    </Box>
  </Box>
);

export default PublicFooter;