import { Box, Grid, Paper, Typography } from "@mui/material";

import { AppPaperHeader } from "../AppPaperHeader";
import { StylesObject } from "../../types/utility";
import { useTransactionsContext } from "../../context/contextUtils";
import { moneyFormatter } from "../../utils";
import { AppMeasurements } from "../../theme";
import { getCategoryLabel } from "./transactionHelperFunctions";
import { Transaction } from "../../types/transactions";

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
  const { transactions } = useTransactionsContext();

  const totalsPerCategory = calculateTotalPerCategoryThisMonth(transactions);

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
                {getCategoryLabel(
                  key as
                    | "Shopping"
                    | "Paycheck"
                    | "Clothes"
                    | "Food"
                    | "Entertainment"
                    | "Refund"
                    | "Travel"
                    | "Other"
                )}
                <Typography sx={styles.categoryName}>{key}</Typography>
                <Typography
                  sx={styles.categoryAmount}
                  data-testid={`category-${key}-amount`}
                >
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

const calculateTotalPerCategoryThisMonth = (transactions: Transaction[]) => {
  const categories: string[] = [
    "Shopping",
    "Clothes",
    "Food",
    "Entertainment",
    "Travel",
    "Other",
  ];

  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Filter expense transactions for the current month
  const expenseTransactionsThisMonth = transactions.filter(
    (transaction) =>
      transaction.type === "expense" &&
      new Date(transaction.date).getMonth() + 1 === currentMonth + 1 && // Adjust month index
      new Date(transaction.date).getFullYear() === currentYear
  );

  // Initialize total per category with all categories set to 0
  const totalPerCategory: Record<string, number> = {};
  categories.forEach((category: string) => {
    totalPerCategory[category] = 0;
  });

  // Calculate total per category from expense transactions
  expenseTransactionsThisMonth.forEach((transaction) => {
    const { category, amount } = transaction;
    const amountNumber = Math.abs(parseFloat(amount));

    if (!isNaN(amountNumber)) {
      totalPerCategory[category] += amountNumber;
    }
  });

  // Convert the object into an array of key-value pairs and sort it
  const sortedTotalPerCategory = Object.fromEntries(
    Object.entries(totalPerCategory).sort((a, b) => b[1] - a[1])
  );

  return sortedTotalPerCategory;
};
