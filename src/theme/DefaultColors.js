const baselightTheme = {
  direction: 'ltr',
  palette: {
    primary: {
      main: '#5D87FF',
      light: '#ECF2FF',
      dark: '#4570EA',
    },
    secondary: {
      main: '#49BEFF',
      light: '#E8F7FF',
      dark: '#23afdb',
    },
    success: {
      main: '#13DEB9',
      light: '#E6FFFA',
      dark: '#02b3a9',
      contrastText: '#ffffff',
    },
    info: {
      main: '#539BFF',
      light: '#EBF3FE',
      dark: '#1682d4',
      contrastText: '#ffffff',
    },
    error: {
      main: '#FA896B',
      light: '#FDEDE8',
      dark: '#f3704d',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFAE1F',
      light: '#FEF5E5',
      dark: '#ae8e59',
      contrastText: '#ffffff',
    },
    purple: {
      A50: '#EBF3FE',
      A100: '#6610f2',
      A200: '#557fb9',
    },
    grey: {
      100: '#F2F6FA',
      200: '#EAEFF4',
      300: '#DFE5EF',
      400: '#7C8FAC',
      500: '#5A6A85',
      600: '#2A3547',
    },
    text: {
      primary: '#2A3547',
      secondary: '#2A3547',
    },
    action: {
      disabledBackground: 'rgba(73,82,88,0.12)',
      hoverOpacity: 0.02,
      hover: '#f6f9fc',
    },
    divider: '#e5eaef',
    background: {
      default: '#ffffff',
    },
  },
};

const baseDarkTheme = {
  direction: 'ltr',
  palette: {
    primary:   { 
      main: '#29B6F6',
      light: '#0F3B4D',
      dark: '#0EA5C9'
    },
    secondary: { 
      main: '#22D3EE',
      light: '#0C3640',
      dark: '#0FB8CF'
    },
    success:   {
      main: '#4ADE80',
      light: '#12321F',
      dark: '#22C55E',
      contrastText: '#ffffff'
    },
    info:      {
      main: '#29B6F6',
      light: '#0F3B4D',
      dark: '#0EA5C9',
      contrastText: '#ffffff'
    },
    error:     {
      main: '#F44336',
      light: '#3A1B1B',
      dark: '#D32F2F',
      contrastText: '#ffffff'
    },
    warning:   { 
      main: '#F59E0B',
      light: '#3A2D12',
      dark: '#D97706',
      contrastText: '#ffffff'
    },
    purple: {
      A50: '#0F3B4D',
      A100: '#6610f2',
      A200: '#557fb9'
    },
    grey: {
      100: '#111C30', 200: '#1B2A44', 300: '#2A3B57',
      400: '#7C93B3', 500: '#A9BBD4', 600: '#E6EDF7', A700: '#1B2A44',
    },
    text: { primary: '#E6EDF7', secondary: '#7C93B3' },
    action: {
      disabledBackground: 'rgba(124,147,179,0.12)',
      hoverOpacity: 0.04,
      hover: '#122036',
    },
    divider: '#1B2A44',
    background: { default: '#0A0F1C', dark: '#070B14', paper: '#0D1526' },
  },
};

export { baseDarkTheme, baselightTheme };
