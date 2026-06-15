import React from 'react';
import { Box, Typography } from '@mui/material';
import { COLORS } from '../theme/theme';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
  color?: 'dark' | 'light';
}

const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'full', color = 'dark' }) => {
  const sizes = { sm: 28, md: 36, lg: 52 };
  const iconSize = sizes[size];
  const textColor = color === 'dark' ? COLORS.bark : COLORS.cream;
  const accentColor = color === 'dark' ? COLORS.terracotta : COLORS.terracottaLight;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
      <svg width={iconSize} height={iconSize} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="52" height="52" rx="14" fill={COLORS.bark} />
        <rect x="8" y="8" width="36" height="36" rx="10" fill={COLORS.terracotta} opacity="0.2" />
        <path
          d="M16 26C16 20.477 20.477 16 26 16C31.523 16 36 20.477 36 26C36 31.523 31.523 36 26 36C20.477 36 16 31.523 16 26Z"
          stroke={COLORS.cream}
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M21 26L24.5 29.5L31 22.5"
          stroke={accentColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26 16V13M26 39V36M16 26H13M39 26H36"
          stroke={COLORS.cream}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
      {variant === 'full' && (
        <Box>
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: size === 'sm' ? '1rem' : size === 'md' ? '1.2rem' : '1.6rem',
              color: textColor,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            FlowBoard
          </Typography>
          <Typography
            sx={{
              fontSize: size === 'sm' ? '0.6rem' : '0.65rem',
              color: color === 'dark' ? COLORS.textSecondary : COLORS.terracottaLight,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            Onboarding Portal
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Logo;