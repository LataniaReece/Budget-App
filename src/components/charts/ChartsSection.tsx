import { FC } from "react";
import { Divider, Grid } from "@mui/material";

import BudgetPieChart from "./BudgetPieChart";
import { AppPaper } from "../AppPaper";
import Finances from "./Finances";
import { StylesObject } from "../../types/utility";

const styles: StylesObject = {
  wrapper: {
    p: { xs: 0, md: 4 },
  },
  financesGridItem: { order: { xs: 2, md: 1 } },
  dividerGridItem: { display: { xs: "none", md: "block" }, order: { md: 2 } },
  budgetGridItem: {
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    order: { xs: 1, md: 3 },
  },
};
const ChartsSection: FC = () => {
  return (
    <AppPaper>
      <Grid container sx={styles.wrapper}>
        <Grid item xs={12} md={7} lg={8} sx={styles.financesGridItem}>
          <Finances />
        </Grid>
        <Grid item md={0.5} sx={styles.dividerGridItem}>
          <Divider orientation="vertical" sx={{ mr: 1 }} />
        </Grid>
        <Grid item xs md lg sx={styles.budgetGridItem}>
          <BudgetPieChart />
        </Grid>
      </Grid>
    </AppPaper>
  );
};

export default ChartsSection;
