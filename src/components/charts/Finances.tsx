import React from "react";
import { Box } from "@mui/material";
import FinancesBarChart from "./FinancesBarChart";
import FinancesDetails from "./FinancesDetails";
import { StylesObject } from "../../types/utility";

const styles: StylesObject = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
};

const Finances = () => {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={{ order: { xs: 2, md: 1 } }}>
        <FinancesDetails />
      </Box>
      <Box sx={{ order: { xs: 1, md: 2 } }}>
        <FinancesBarChart />
      </Box>
    </Box>
  );
};

export default Finances;
