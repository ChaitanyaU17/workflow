import React from 'react';
import { Box, Typography } from '@mui/material';
import { COLORS } from '../../theme/theme';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  fullScreen = false,
  size = 48,
}) => {
  const containerSx = fullScreen
    ? {
        position: 'fixed' as const,
        inset: 0,
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.surface,
        zIndex: 9999,
        gap: 2,
      }
    : {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: 6,
      };

  return (
    <Box sx={containerSx}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: 'spinLoader 1.2s linear infinite' }}
      >
        <circle cx="24" cy="24" r="20" stroke={COLORS.border} strokeWidth="4" />
        <path
          d="M24 4C35.046 4 44 12.954 44 24"
          stroke={COLORS.terracotta}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="6" fill={COLORS.bark} opacity="0.15" />
        <circle cx="24" cy="24" r="3" fill={COLORS.terracotta} />
      </svg>
      {message && (
        <Typography variant="body2" sx={{ color: COLORS.textSecondary, fontWeight: 500 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;