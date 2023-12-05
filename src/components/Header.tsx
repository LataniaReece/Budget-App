import { Box, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { format } from "date-fns";

import { StylesObject } from "../types/utility";
import { AppColors, AppMeasurements } from "../theme";

const styles: StylesObject = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 3,
    flexDirection: "row",
    backgroundColor: AppColors.headerColor,
    px: { xs: 2, md: 10 },
    py: 1.5,
  },
  logo: {
    fontWeight: "bold",
    fontSize: { xs: 20, sm: 25 },
    color: "white",
  },
  subLogo: {
    display: "block",
    fontStyle: "italic",
    color: "lightgray",
  },
  todayDate: {
    display: { xs: "none", sm: "flex" },
    alignItems: "center",
    gap: 1,
    border: `1px solid ${AppColors.bgColor}`,
    color: AppColors.bgColor,
    py: 0.85,
    px: 1.8,
    borderRadius: AppMeasurements.radiusLarge,
    boxShadow: AppMeasurements.boxShadow,
  },
};
const Header = () => {
  return (
    <Box sx={styles.wrapper}>
      <Box>
        <Typography sx={styles.logo}>Budget App</Typography>
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
