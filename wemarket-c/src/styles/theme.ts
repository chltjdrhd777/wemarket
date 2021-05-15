// px to rem
const calcRem = (px: number) => `${px / 16}rem` as const;

const renderMediaQuery = (maxWidth: number): string => {
  return `@media (max-width: ${maxWidth}px)`;
};

const colors = {
  black: '#000000',
  white: '#FFFFFF',
  indigo: '#181F38',
  grayOne: '#F7F7F7',
  grayTwo: '#E5E5E5',
  grayThree: '#999999',
  grayFour: '#111',
  pointColorYello: '#ffc114',
  pointColorCarrot: '#ff5248',
  pointColorMint: '#19cdca',
  pointColorBlue: '#4e80e1',
  lightblue: '#C5E2EE',
  footerColor: '#313131',
  mainColor: '#E7286A',
  waringColor: '#ff0000',
  starColor: '#fd4',
} as const;

const fontSizes = {
  xsmall: calcRem(12),
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  xxxxl: calcRem(16 * 2),
};

const paddings = {
  xxsmall: calcRem(4),
  xsmall: calcRem(6),
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
  xxxxl: calcRem(24),
  global: calcRem(16 * 6),
};

const margins = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
  xxxxl: calcRem(24),
  global: calcRem(16 * 6),
};

const deviceSizeUnits = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '450px',
  tablet: '768px',
  tabletL: '1024px',
} as const;

const device = {
  mobileS: `only screen and (max-width: ${deviceSizeUnits.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizeUnits.mobileM})`,
  mobileL: `only screen and (max-width: ${deviceSizeUnits.mobileL})`,
  tablet: `only screen and (max-width: ${deviceSizeUnits.tablet})`,
  tabletL: `only screen and (max-width: ${deviceSizeUnits.tabletL})`,
} as const;

const mediaQuery = {
  desktop: renderMediaQuery(922),
  tablet: renderMediaQuery(768),
  phone: renderMediaQuery(576),
} as const;

const typography = {
  title: {
    fontFamily: '"Nanum Gothic", sans-serif',
    fontSize: '4rem',
    fontWeight: 600,
  },
  button: {
    fontFamily: '"Nanum Gothic", sans-serif',
    fontSize: '0.875rem',
  },
} as const;

const theme = {
  colors,
  fontSizes,
  paddings,
  margins,
  deviceSizeUnits,
  device,
  typography,
  mediaQuery,
};

export type ThemeType = typeof theme;

export default theme;
