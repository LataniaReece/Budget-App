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

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinancesBarChart = () => {
  const { monthlyTransactionsData } = useTransactionsContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const valueFormatter = (value: any) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);

  const data = {
    labels: monthlyTransactionsData.map((entry) => entry.monthYear),
    datasets: [
      {
        label: "Income",
        data: monthlyTransactionsData.map((entry) => entry.income),
        backgroundColor: "#3F88C5",
        borderColor: "#3F88C5",
        borderWidth: 1,
        borderRadius: 20,
      },
      {
        label: "Expense",
        data: monthlyTransactionsData.map((entry) => entry.expense),
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
        labels: monthlyTransactionsData.map((entry) => entry.monthYear),
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
