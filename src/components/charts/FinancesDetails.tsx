import React from "react";
import { Box, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";

import { StylesObject } from "../../types/utility";
import { moneyFormatter } from "../../utils";
import { useTransactionsContext } from "../../context/contextUtils";
import { AppColors } from "../../theme";

const styles: StylesObject = {
  wrapper: {
    display: "flex",
    justifyContent: { xs: "center", md: "flex-start" },
    gap: { xs: 2, sm: 4, md: 7 },
    mt: { xs: 3, md: 0 },
  },
  iconWrapper: {
    borderRadius: "50%",
    padding: "0.5rem",
    backgroundColor: "#fff",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    mb: 1,
  },
  icon: {
    color: "white",
    borderRadius: "50%",
    fontSize: 28,
    p: 0.3,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
};

const FinancesDetails = () => {
  const { totalIncomeThisMonth, totalExpensesThisMonth } =
    useTransactionsContext();
  return (
    <>
      <Box sx={styles.wrapper}>
        <Box sx={{ textAlign: "center" }}>
          <AttachMoneyIcon
            sx={{
              ...styles.icon,
              backgroundColor: AppColors.green,
            }}
          />
          <Typography sx={{ fontSize: { xs: 18, md: 20 } }}>
            {moneyFormatter.format(totalIncomeThisMonth)}
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            This Month&apos;s Income
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <MoneyOffIcon
            sx={{
              ...styles.icon,
              backgroundColor: AppColors.red,
            }}
          />
          <Typography sx={{ fontSize: { xs: 18, md: 20 } }}>
            {`-${moneyFormatter.format(totalExpensesThisMonth)}`}
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            This Month&apos;s Expenses
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default FinancesDetails;
