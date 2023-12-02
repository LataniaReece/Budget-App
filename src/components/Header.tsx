import React from "react";
import { Box, Typography } from "@mui/material";
import WalletIcon from "@mui/icons-material/Wallet";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { format } from "date-fns";

import { StylesObject } from "../types/utility";
import { AppColors, AppMeasurements } from "../theme";

const styles: StylesObject = {
  wrapper: {
    display: "flex",
    alignItems: { xs: "flex-start", sm: "center" },
    justifyContent: "space-between",
    mb: 3,
    flexDirection: { xs: "column", sm: "row" },
  },
  logo: {
    fontWeight: "bold",
    fontSize: { xs: 20, sm: 25 },
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: { xs: 1, md: 0 },
  },
  icon: {
    fontSize: { xs: 30, sm: 40, md: 42 },
    color: AppColors.blueDark,
  },
  subLogo: {
    display: { xs: "none", md: "block" },
    pl: 6.7,
    fontStyle: "italic",
    color: "gray",
  },
  todayDate: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    backgroundColor: "white",
    py: 1,
    px: 2,
    borderRadius: AppMeasurements.radiusLarge,
    boxShadow: AppMeasurements.boxShadow,
    fontWeight: "bold",
  },
};
const Header = () => {
  return (
    <Box sx={styles.wrapper}>
      <Box>
        <Typography sx={styles.logo}>
          <WalletIcon sx={styles.icon} />
          Budget App
        </Typography>
        <Typography sx={styles.subLogo}>Manage your budget</Typography>
      </Box>
      <Box>
        <Typography sx={styles.todayDate}>
          <CalendarTodayIcon />
          {format(Date.now(), "MMM dd, yyyy")}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
