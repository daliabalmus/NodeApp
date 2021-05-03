const colors = {
  blue: "#1487E2",
  yellow: "#f0d60c",
  red: "#EF6565",
  success: "#72C02C",
  white: "#ffffff",
  dark: "#1d1d1d",
  darkGray100: "#5F5F5F",
  darkGray200: "#262626",
  darkGray300: "#3c3c3c",
  darkGray400: "#292827",
  darkGray500: "#3b3b3b",
  lightGray100: "#FAFAFA",
  lightGray200: "#F5F5F5",
  lightGray300: "#D3D3D3",
  lightGray400: "#BEBEBE",
  lightGray500: "#ADABAB",
  lightGray600: "#999999",
  shadow100: "#00000012",
  shadow200: "#00000029",
  lightBlueGray: "#F7F8FB",
};
const typography = {
  fontSize: "16px",
};
const checkbox = {
  size: "18px",
  bg: colors.darkGray100,
  bgHover: colors.darkGray100,
  bgChecked: colors.yellow,
  borderWidth: "1px",
  borderColor: colors.darkGray100,
};
export const initialTheme = {
  // theme colors
  primary: colors.success,
  secondary: colors.lightGray600,
  danger: colors.red,
  white: colors.white,
  dark: colors.dark,
  dark100: colors.darkGray100,
  dark200: colors.darkGray200,
  dark300: colors.darkGray300,
  dark400: colors.darkGray400,
  dark500: colors.darkGray500,
  light: colors.lightGray100,
  light300: colors.lightGray300,
  light600: colors.lightGray600,
  bgLight: colors.lightGray200,
  gray: colors.lightGray300,
  inactive: "#DDDDDD",
  muted: colors.lightGray500,
  lightDark: colors.shadow100,
  lightBlueGray: colors.lightBlueGray,
  shadowLight: colors.shadow100,
  shadowDark: colors.shadow200,
  contentBg: "#E8E8E8",
  baseFontSize: typography.fontSize,
  // header color
  headerColor: colors.lightGray600,
  // tabs color
  tabsColor: colors.lightGray600,
  // navbar
  navbarHeight: 96,
  navbarBg: colors.dark,
  navbarDividerColor: "#e8e8e8",
  // footer
  footerBg: colors.darkGray200,
  footerColor: colors.darkGray100,
  footerHeight: "50px",
  // small left sidebar
  smallSidebarWidth: 48,
  // left sidebar
  sidebarWidth: 268,
  leftSidebarBg: colors.dark,
  leftSidebarColor: colors.lightGray600,
  // button
  btnHoverBg: colors.darkGray100,
  btnHoverColor: colors.white,
  btnHoverBorderColor: colors.darkGray100,
  btnDisabledBg: colors.darkGray300,
  btnDisabledBorderColor: colors.darkGray300,
  btnDisabledHover: colors.darkGray300,
  btnShadow: "#16161629",
  // input
  inputBg: colors.darkGray300,
  inputColor: colors.lightGray300,
  inputBorderColor: colors.darkGray200,
  inputPlaceholder: "#7f7f82",
  inputFocused: colors.darkGray200,
  // checkbox
  checkboxSize: checkbox.size,
  checkboxBg: checkbox.bg,
  checkboxBgHover: checkbox.bgHover,
  checkboxBgChecked: checkbox.bgChecked,
  checkboxBorderWidth: checkbox.borderWidth,
  checkboxBorderColor: checkbox.borderColor,
  // radius
  radius: "4px",
  // card
  cardColor: "#2D2F31",
  cardShadow: "#0000000D",
  // global margins (bottom) in 'px'
  navbarMargin: 48,
  tabsMargin: 24,
  headerMargin: 16,
  sectionMargin: 48,
  // margin top submit button
  submitButtonMargin: 24,
  // tooltip
  tooltipColor: colors.lightGray600,
  tooltipBg: colors.dark,
  tooltipShadow: "#0000000D",
  tooltipPadding: "6px",
  tooltipArrowSize: "6px",
  tooltipMargin: 12,
};

export const gridTheme = {
  breakpoints: {
    // defaults below
    xl: 1200,
    lg: 992,
    md: 768,
    sm: 576,
    xs: 575,
  },
  row: {
    padding: 8,
  },
  col: {
    padding: 8,
  },
  container: {
    padding: 8,
    maxWidth: {
      // defaults below
      xl: 1140,
      lg: 960,
      md: 720,
      sm: 540,
      xs: 540,
    },
  },
};
