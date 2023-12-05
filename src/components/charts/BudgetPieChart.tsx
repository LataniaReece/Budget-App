import { useState } from "react";
import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { StylesObject } from "../../types/utility";
import { useTransactionsContext } from "../../context/contextUtils";
import { moneyFormatter } from "../../utils";
import EditBudget from "../EditBudget";

Chart.register(ArcElement);

const styles: StylesObject = {
  noSetBudgetWrapper: { display: "flex", justifyContent: "center" },
  noBudgetEditButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "10px solid rgba(169, 169, 169, 0.3)",
    borderRadius: "50%",
    width: "200px",
    height: "200px",
    backgroundColor: "white",
    "&:hover": {
      cursor: "pointer",
    },
  },
  setBudgetWrapper: {
    position: "relative",
    width: "fit-content",
  },
  headingWrapper: {
    display: "flex",
    justifyContent: { xs: "center", md: "flex-start" },
    alignItems: "center",
    mb: 2,
    gap: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
  },
  chartWrapper: { maxWidth: { xs: 250, sm: 300, md: "100%" } },
  doughnutTitle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "1.5em",
    textAlign: "center",
    mb: 2,
  },
  budgetDetailsWrapper: {
    display: "flex",
    justifyContent: "space-between",
    mt: 2,
  },
};

const BudgetPieChart = () => {
  const { totalExpensesThisMonth, budget } = useTransactionsContext();
  const [openEditBudget, setOpenEditBudget] = useState(false);

  const data = {
    labels: ["Spent", "Remaining"],
    datasets: [
      {
        data: [totalExpensesThisMonth, Number(budget) - totalExpensesThisMonth],
        backgroundColor: ["#FC9E4F", "#F5F6F9"],
        borderWidth: 0,
      },
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    cutout: "75%",
    plugins: {
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (context: any) => {
            const labelIndex = context.dataIndex;
            const labelValue = data.datasets[0].data[labelIndex];
            return `$${labelValue}`;
          },
        },
      },
    },
  };

  return (
    <>
      {!budget ? (
        <Box sx={styles.noSetBudgetWrapper}>
          <Box
            component="button"
            onClick={() => setOpenEditBudget(true)}
            sx={styles.noBudgetEditButton}
            data-testid="setBudgetButton"
          >
            <Typography>Set Budget</Typography>
            <EditIcon sx={{ fontSize: 22 }} />
          </Box>
        </Box>
      ) : (
        <Box sx={styles.setBudgetWrapper}>
          <Box sx={styles.headingWrapper}>
            <Typography sx={styles.heading}>Budget</Typography>
            <Tooltip title="Edit Budget">
              <IconButton
                onClick={() => setOpenEditBudget(true)}
                data-testid="editBudgetButton"
              >
                <EditIcon sx={{ fontSize: 22 }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={styles.chartWrapper}>
            <Doughnut
              data={data}
              options={options}
              data-testid="budgetPieChart"
            />
          </Box>
          <Box sx={styles.doughnutTitle}>
            <Typography
              sx={{ fontWeight: "bold", fontSize: { xs: 24, md: 28 } }}
            >
              {moneyFormatter.format(totalExpensesThisMonth)}
            </Typography>
            <Typography sx={{ fontSize: 18, color: "#FC9E4F" }}>
              Spent
            </Typography>
          </Box>
          <Box sx={styles.budgetDetailsWrapper}>
            <Box>
              <Typography
                sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: "bold" }}
                data-testid="monthlyLimit"
              >
                {moneyFormatter.format(Number(budget))}
              </Typography>
              <Typography sx={{ textAlign: "right" }}>Monthly Limit</Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: "bold" }}
                data-testid="remaining"
              >
                {moneyFormatter.format(Number(budget) - totalExpensesThisMonth)}
              </Typography>
              <Typography sx={{ textAlign: "right" }}>Remaining</Typography>
            </Box>
          </Box>
        </Box>
      )}
      <EditBudget open={openEditBudget} setOpen={setOpenEditBudget} />
    </>
  );
};

export default BudgetPieChart;
