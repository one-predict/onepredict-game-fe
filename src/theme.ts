const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

const theme = {
  breakpoints,
  palette: {
    white: '#FFFFFF',
    darkPurple: '#801f75',
    brightPink: '#ff56f6',
    seaGreen: '#3CB371',
    black: '#000000',
  },
  devices: {
    mobile: `(min-width: ${breakpoints.sm})`,
    tablet: `(min-width: ${breakpoints.md})`,
    laptop: `(min-width: ${breakpoints.lg})`,
    desktop: `(min-width: ${breakpoints.xl})`,
  },
};

export default theme;
