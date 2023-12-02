import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

import { AppPaperHeader } from "../AppPaperHeader";
import { StylesObject } from "../../types/utility";
import { useTransactionsContext } from "../../context/contextUtils";
import { moneyFormatter } from "../../utils";
import { AppMeasurements } from "../../theme";
import { getCategoryLabel } from "./transactionHelperFunctions";

const styles: StylesObject = {
  categoryItemPaper: {
    p: 2,
    boxShadow: AppMeasurements.boxShadow,
  },
  icon: {
    fontSize: 40,
    mb: 2,
  },
  categoryName: {
    fontSize: 14,
    color: "gray",
    textTransform: "capitalize",
  },
  categoryAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
};

const CategoriesList = () => {
  const { totalsPerCategory } = useTransactionsContext();

  return (
    <Box>
      <AppPaperHeader sx={{ mb: 2 }}>
        Expenses Per Category This Month
      </AppPaperHeader>
      <Box sx={styles.wrapper}>
        <Grid container columnSpacing={2} rowSpacing={2}>
          {Object.entries(totalsPerCategory).map(([key, value]) => (
            <Grid item key={key} xs={6} sm={3} lg={2}>
              <Paper sx={styles.categoryItemPaper}>
                {getCategoryLabel(key)}
                <Typography sx={styles.categoryName}>{key}</Typography>
                <Typography sx={styles.categoryAmount}>
                  {moneyFormatter.format(value)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CategoriesList;
