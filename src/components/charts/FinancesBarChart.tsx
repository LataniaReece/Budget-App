/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
} from "chart.js";
import { useTransactionsContext } from "../../context/contextUtils";
import { Transaction } from "../../types/transactions";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinancesBarChart = () => {
  const { transactions } = useTransactionsContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const valueFormatter = (value: any) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);

  const sortedMonthlyData = getMonthlyTransactionsData(transactions);

  const data = {
    labels: sortedMonthlyData.map((entry) => entry.monthYear).sort(), // explicitly sort the labels
    datasets: [
      {
        label: "Income",
        data: sortedMonthlyData.map((entry) => entry.income),
        backgroundColor: "#3F88C5",
        borderColor: "#3F88C5",
        borderWidth: 1,
        borderRadius: 20,
      },
      {
        label: "Expense",
        data: sortedMonthlyData.map((entry) => entry.expense),
        backgroundColor: "#F5F6F9",
        borderColor: "#F5F6F9",
        borderWidth: 1,
        borderRadius: 20,
      },
    ],
  };

  const options: any = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        type: "category",
        labels: sortedMonthlyData.map((entry) => entry.monthYear),
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Month/Year",
        },
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Dollars($)",
        },
        ticks: {
          callback: (value: any) => valueFormatter(value),
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: isMobile ? "top" : "right",
      },
      title: {
        display: true,
        text: "Expenses vs Income Per Month",
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (yDatapoint: any) => {
            return valueFormatter(yDatapoint.raw);
          },
        },
      },
    },
  };

  return (
    <Box sx={{ height: 300, mt: 4 }}>
      <Bar data={data} options={options} />
    </Box>
  );
};

export default FinancesBarChart;

type MonthlyTransactionData = {
  income: number;
  expense: number;
  monthYear: string;
};

// helper function
const getMonthlyTransactionsData = (transactions: Transaction[]) => {
  const monthlyData: MonthlyTransactionData[] = [];

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(date)} ${date.getFullYear()}`;

    // Find the existing monthlyData entry or create a new one
    let entry = monthlyData.find((entry) => entry.monthYear === monthYear);

    if (!entry) {
      entry = {
        income: 0,
        expense: 0,
        monthYear,
      };

      monthlyData.push(entry);
    }

    switch (transaction.type) {
      case "income":
        entry.income += parseFloat(transaction.amount);
        break;
      case "expense":
        entry.expense += Math.abs(parseFloat(transaction.amount));
        break;
    }
  });

  const sortedMonthlyData = monthlyData.sort((a, b) => {
    const dateA = new Date(a.monthYear);
    const dateB = new Date(b.monthYear);

    if (dateA.getFullYear() !== dateB.getFullYear()) {
      return dateA.getFullYear() - dateB.getFullYear();
    }

    return dateA.getMonth() - dateB.getMonth();
  });

  return sortedMonthlyData;
};
