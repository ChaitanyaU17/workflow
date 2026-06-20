import React from 'react';
import Box from '@mui/material/Box';
import PublicNavbar from './PublicNavbar';
import PublicFooter from './PublicFooter';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => (
  <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#F7F4F1' }}>
    <PublicNavbar />
    <Box component="main" sx={{ flex: 1 }}>
      {children}
    </Box>
    <PublicFooter />
  </Box>
);

export default PublicLayout;
