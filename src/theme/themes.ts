import { ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import { ThemeMode } from './types';

const sharedTheme = {
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiDivider: {
      styleOverrides: {
        vertical: {
          marginRight: 10,
          marginLeft: 10,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: () => ({
          borderRadius: 8,
          fontWeight: 600,
          textTransform: 'none' as const,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(182, 141, 64, 0.3)',
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: () => ({
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(18, 38, 32, 0.1)',
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: () => ({
          borderRadius: 8,
          fontWeight: 500,
        }),
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: () => ({
          borderRadius: 4,
          backgroundColor: 'rgba(182, 141, 64, 0.2)',
        }),
      },
    },
  },
};

// CS2 Sound Guesser Custom Color Scheme
const themes: Record<ThemeMode, ThemeOptions> = {
  light: deepmerge(sharedTheme, {
    palette: {
      mode: 'light',
      primary: {
        main: '#b68d40', // Tan
        light: '#d6ad60', // Gold
        dark: '#8b6b30',
        contrastText: '#fff',
      },
      secondary: {
        main: '#d6ad60', // Gold
        light: '#e6c080',
        dark: '#b8944a',
        contrastText: '#122620',
      },
      background: {
        default: '#f4ebd0', // Cream
        paper: '#fff',
      },
      text: {
        primary: '#122620', // Charcoal
        secondary: '#1f3d2b',
      },
    },
  }),

  dark: deepmerge(sharedTheme, {
    palette: {
      mode: 'dark',
      primary: {
        main: '#d6ad60', // Gold (brighter for dark mode)
        light: '#e6c080',
        dark: '#b68d40', // Tan
        contrastText: '#122620',
      },
      secondary: {
        main: '#b68d40', // Tan
        light: '#d6ad60',
        dark: '#8b6b30',
        contrastText: '#f4ebd0',
      },
      background: {
        default: '#122620', // Charcoal
        paper: '#1f3d2b',
      },
      text: {
        primary: '#f4ebd0', // Cream
        secondary: '#e0d5bf',
      },
    },
  }),
};

export default themes;
