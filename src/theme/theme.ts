import { createTheme, alpha } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    cream: Palette['primary'];
    terracotta: Palette['primary'];
    bark: Palette['primary'];
    sage: Palette['primary'];
  }
  interface PaletteOptions {
    cream?: PaletteOptions['primary'];
    terracotta?: PaletteOptions['primary'];
    bark?: PaletteOptions['primary'];
    sage?: PaletteOptions['primary'];
  }
}

const COLORS = {
  cream: '#EDE9E6',
  terracotta: '#C9996B',
  bark: '#5C4F4A',
  sage: '#5C766D',
  barkLight: '#7A6A64',
  barkDark: '#3E3330',
  sageLight: '#7A9E94',
  sageDark: '#3E5450',
  terracottaLight: '#DDB896',
  terracottaDark: '#A67A4E',
  white: '#FFFFFF',
  surface: '#F7F4F1',
  surfaceAlt: '#EFEBE7',
  border: '#D9D2CB',
  textPrimary: '#2E2522',
  textSecondary: '#6B5F59',
  textDisabled: '#A89890',
  error: '#C0392B',
  errorLight: '#FADBD8',
  success: '#27AE60',
  successLight: '#D5F5E3',
  warning: '#E67E22',
  warningLight: '#FDEBD0',
  info: '#2980B9',
  infoLight: '#D6EAF8',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: COLORS.bark,
      light: COLORS.barkLight,
      dark: COLORS.barkDark,
      contrastText: COLORS.cream,
    },
    secondary: {
      main: COLORS.terracotta,
      light: COLORS.terracottaLight,
      dark: COLORS.terracottaDark,
      contrastText: COLORS.white,
    },
    background: {
      default: COLORS.surface,
      paper: COLORS.white,
    },
    text: {
      primary: COLORS.textPrimary,
      secondary: COLORS.textSecondary,
      disabled: COLORS.textDisabled,
    },
    divider: COLORS.border,
    error: {
      main: COLORS.error,
      light: COLORS.errorLight,
    },
    success: {
      main: COLORS.success,
      light: COLORS.successLight,
    },
    warning: {
      main: COLORS.warning,
      light: COLORS.warningLight,
    },
    info: {
      main: COLORS.info,
      light: COLORS.infoLight,
    },
    cream: {
      main: COLORS.cream,
      light: '#F5F2EF',
      dark: '#D9D2CB',
      contrastText: COLORS.textPrimary,
    },
    terracotta: {
      main: COLORS.terracotta,
      light: COLORS.terracottaLight,
      dark: COLORS.terracottaDark,
      contrastText: COLORS.white,
    },
    bark: {
      main: COLORS.bark,
      light: COLORS.barkLight,
      dark: COLORS.barkDark,
      contrastText: COLORS.cream,
    },
    sage: {
      main: COLORS.sage,
      light: COLORS.sageLight,
      dark: COLORS.sageDark,
      contrastText: COLORS.white,
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      color: COLORS.textPrimary,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 700,
      fontSize: '2rem',
      color: COLORS.textPrimary,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      color: COLORS.textPrimary,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: COLORS.textPrimary,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.1rem',
      color: COLORS.textPrimary,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      color: COLORS.textPrimary,
    },
    subtitle1: {
      fontSize: '0.95rem',
      fontWeight: 500,
      color: COLORS.textSecondary,
    },
    subtitle2: {
      fontSize: '0.85rem',
      fontWeight: 500,
      color: COLORS.textSecondary,
    },
    body1: {
      fontSize: '0.95rem',
      lineHeight: 1.7,
      color: COLORS.textPrimary,
    },
    body2: {
      fontSize: '0.85rem',
      lineHeight: 1.6,
      color: COLORS.textSecondary,
    },
    caption: {
      fontSize: '0.75rem',
      color: COLORS.textDisabled,
      letterSpacing: '0.03em',
    },
    overline: {
      fontSize: '0.7rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: COLORS.textSecondary,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.03em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    `0 1px 3px ${alpha(COLORS.bark, 0.08)}, 0 1px 2px ${alpha(COLORS.bark, 0.06)}`,
    `0 3px 8px ${alpha(COLORS.bark, 0.1)}, 0 2px 4px ${alpha(COLORS.bark, 0.06)}`,
    `0 6px 16px ${alpha(COLORS.bark, 0.1)}, 0 3px 6px ${alpha(COLORS.bark, 0.07)}`,
    `0 8px 24px ${alpha(COLORS.bark, 0.12)}, 0 4px 8px ${alpha(COLORS.bark, 0.07)}`,
    `0 12px 32px ${alpha(COLORS.bark, 0.12)}, 0 5px 10px ${alpha(COLORS.bark, 0.08)}`,
    `0 16px 40px ${alpha(COLORS.bark, 0.14)}, 0 6px 12px ${alpha(COLORS.bark, 0.08)}`,
    `0 20px 48px ${alpha(COLORS.bark, 0.14)}, 0 8px 16px ${alpha(COLORS.bark, 0.09)}`,
    `0 24px 56px ${alpha(COLORS.bark, 0.16)}, 0 10px 20px ${alpha(COLORS.bark, 0.1)}`,
    `0 28px 64px ${alpha(COLORS.bark, 0.16)}`,
    `0 32px 72px ${alpha(COLORS.bark, 0.18)}`,
    `0 36px 80px ${alpha(COLORS.bark, 0.18)}`,
    `0 40px 88px ${alpha(COLORS.bark, 0.2)}`,
    `0 44px 96px ${alpha(COLORS.bark, 0.2)}`,
    `0 48px 104px ${alpha(COLORS.bark, 0.22)}`,
    `0 52px 112px ${alpha(COLORS.bark, 0.22)}`,
    `0 56px 120px ${alpha(COLORS.bark, 0.24)}`,
    `0 60px 128px ${alpha(COLORS.bark, 0.24)}`,
    `0 64px 136px ${alpha(COLORS.bark, 0.26)}`,
    `0 68px 144px ${alpha(COLORS.bark, 0.26)}`,
    `0 72px 152px ${alpha(COLORS.bark, 0.28)}`,
    `0 76px 160px ${alpha(COLORS.bark, 0.28)}`,
    `0 80px 168px ${alpha(COLORS.bark, 0.3)}`,
    `0 84px 176px ${alpha(COLORS.bark, 0.3)}`,
    `0 88px 184px ${alpha(COLORS.bark, 0.32)}`,
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: COLORS.surface,
          scrollbarWidth: 'thin',
          scrollbarColor: `${COLORS.border} transparent`,
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            background: COLORS.border,
            borderRadius: 3,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 20px',
          fontSize: '0.875rem',
          fontWeight: 600,
          transition: 'all 0.2s ease',
        },
        contained: {
          '&:hover': { transform: 'translateY(-1px)', boxShadow: `0 4px 12px ${alpha(COLORS.bark, 0.25)}` },
          '&:active': { transform: 'translateY(0)' },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': { borderWidth: '1.5px', backgroundColor: alpha(COLORS.bark, 0.04) },
        },
        text: {
          '&:hover': { backgroundColor: alpha(COLORS.bark, 0.06) },
        },
        sizeLarge: { padding: '10px 28px', fontSize: '0.95rem' },
        sizeSmall: { padding: '5px 14px', fontSize: '0.8rem' },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'small' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: COLORS.white,
            transition: 'all 0.2s ease',
            '& fieldset': { borderColor: COLORS.border, borderWidth: '1.5px' },
            '&:hover fieldset': { borderColor: COLORS.barkLight },
            '&.Mui-focused fieldset': { borderColor: COLORS.bark, borderWidth: '2px' },
            '&.Mui-error fieldset': { borderColor: COLORS.error },
          },
          '& .MuiInputLabel-root': {
            fontSize: '0.875rem',
            color: COLORS.textSecondary,
            '&.Mui-focused': { color: COLORS.bark },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${COLORS.border}`,
          boxShadow: `0 2px 8px ${alpha(COLORS.bark, 0.08)}`,
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: { borderRadius: 16 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: '0.78rem',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          border: `1px solid ${COLORS.border}`,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: COLORS.bark,
          color: COLORS.cream,
          fontSize: '0.78rem',
          borderRadius: 8,
          padding: '6px 12px',
        },
        arrow: { color: COLORS.bark },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.875rem',
          textTransform: 'none',
          minHeight: 44,
          '&.Mui-selected': { color: COLORS.bark },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: COLORS.bark, height: 3, borderRadius: '3px 3px 0 0' },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: COLORS.border,
          '&.Mui-active': { color: COLORS.terracotta },
          '&.Mui-completed': { color: COLORS.sage },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontSize: '0.8rem',
          fontWeight: 500,
          '&.Mui-active': { fontWeight: 700, color: COLORS.bark },
          '&.Mui-completed': { color: COLORS.sage },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          borderRadius: 10,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 12 },
        colorSuccess: { backgroundColor: COLORS.successLight, color: COLORS.textPrimary },
        colorError: { backgroundColor: COLORS.errorLight, color: COLORS.textPrimary },
        colorWarning: { backgroundColor: COLORS.warningLight, color: COLORS.textPrimary },
        colorInfo: { backgroundColor: COLORS.infoLight, color: COLORS.textPrimary },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: 'all 0.2s ease',
          '&:hover': { backgroundColor: alpha(COLORS.bark, 0.08) },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: COLORS.surfaceAlt,
            fontWeight: 700,
            fontSize: '0.8rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: COLORS.textSecondary,
            borderBottom: `2px solid ${COLORS.border}`,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${alpha(COLORS.border, 0.6)}`,
          padding: '14px 16px',
          fontSize: '0.875rem',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.15s ease',
          '&:hover': { backgroundColor: alpha(COLORS.cream, 0.5) },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          backgroundColor: COLORS.border,
          height: 6,
        },
        bar: {
          borderRadius: 6,
          backgroundColor: COLORS.terracotta,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: COLORS.border },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { marginLeft: 4, fontSize: '0.75rem' },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: { fontSize: '0.875rem' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          '& fieldset': { borderColor: COLORS.border, borderWidth: '1.5px' },
          '&:hover fieldset': { borderColor: COLORS.barkLight },
          '&.Mui-focused fieldset': { borderColor: COLORS.bark },
        },
      },
    },
  },
});

export { COLORS };
export default theme;