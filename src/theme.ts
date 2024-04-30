const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
};

const palette = {
  white100Base: '#FFFFFF',
}

const theme = {
  breakpoints,
  palette,
  colors: {
    background: palette.white100Base,
  },
  devices: {
    mobile: `(min-width: ${breakpoints.sm})`,
    tablet: `(min-width: ${breakpoints.md})`,
    laptop: `(min-width: ${breakpoints.lg})`,
    desktop: `(min-width: ${breakpoints.xl})`,
  },
};

export default theme;
