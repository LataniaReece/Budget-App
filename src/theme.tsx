import { createTheme } from "@mui/material/styles";

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 1150,
    lg: 1450,
    xl: 1920,
  },
};

const AppColors = {
  bgColor: "#FBFBFB",

  headerColor: "#191C24",

  textColor: "#333333",

  blue: "#3F88C5",
  blueLight: "#B0CFE8",
  blueMid: "#204B6F",
  blueDark: "#17364F",

  green: "#397F5F",
  darkGreen: "#337157",

  red: "#C0150C",
  darkRed: "#AD160B",

  gray: "#393E41",
  darkGray: "#393E41",
};

const AppMeasurements = {
  radiusSmall: "5px",
  radiusLarge: "10px",

  paddingSmall: "20px",
  paddingLarge: "30px",

  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
};

const theme = createTheme({
  breakpoints: breakpoints,
  palette: {
    background: {
      default: AppColors.bgColor,
    },
    primary: {
      main: AppColors.blue,
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Roboto",
    },
  },
});

export { theme, AppColors, AppMeasurements };
