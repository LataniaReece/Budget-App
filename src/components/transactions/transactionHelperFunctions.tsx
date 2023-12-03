import { Typography } from "@mui/material";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PaidIcon from "@mui/icons-material/Paid";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import MovieIcon from "@mui/icons-material/Movie";
import FlightIcon from "@mui/icons-material/Flight";
import StarRateIcon from "@mui/icons-material/StarRate";

import { moneyFormatter } from "../../utils";
import { AppColors, AppMeasurements } from "../../theme";
import { StylesObject } from "../../types/utility";

const styles: StylesObject = {
  categoryIcon: {
    fontSize: 32,
    padding: 0.5,
    borderRadius: AppMeasurements.radiusLarge,
  },
  amountInfo: {
    fontSize: 14,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: 1,
    p: 1,
    borderRadius: AppMeasurements.radiusSmall,
  },
  amountInfoIcon: {
    color: "white",
    borderRadius: "50%",
    fontSize: 15,
    p: 0.3,
  },
};

export const getTransactionTypeAndAmount = (type: string, amount: string) => {
  switch (type) {
    case "expense":
      return (
        <Typography
          sx={{
            ...styles.amountInfo,
            color: AppColors.red,
          }}
        >
          <CallMadeIcon
            sx={{
              ...styles.amountInfoIcon,
              backgroundColor: AppColors.darkRed,
            }}
          />
          {`Spent ${moneyFormatter.format(Number(amount))}`}
        </Typography>
      );
    case "income":
      return (
        <Typography
          sx={{
            ...styles.amountInfo,
            color: AppColors.green,
          }}
        >
          <CallReceivedIcon
            sx={{
              ...styles.amountInfoIcon,
              backgroundColor: AppColors.darkGreen,
            }}
          />
          {`Received ${moneyFormatter.format(Number(amount))}`}
        </Typography>
      );
    default:
      return "";
  }
};

export const getCategoryLabel = (
  category:
    | "Shopping"
    | "Paycheck"
    | "Clothes"
    | "Food"
    | "Entertainment"
    | "Refund"
    | "Travel"
    | "Other"
) => {
  switch (category) {
    case "Shopping":
      return (
        <ShoppingBagIcon
          sx={{
            ...styles.categoryIcon,
            backgroundColor: "#DCD1DB",
            color: "#B9A2B7",
          }}
        />
      );
    case "Paycheck":
      return (
        <PaidIcon
          sx={{
            ...styles.categoryIcon,
            backgroundColor: "#BADEC9",
            color: "#83C39E",
          }}
        />
      );
    case "Clothes":
      return (
        <CheckroomIcon
          sx={{
            ...styles.categoryIcon,
            backgroundColor: "#BDD0EF",
            color: "#8CADE3",
          }}
        />
      );
    case "Food":
      return (
        <FastfoodIcon
          sx={{
            ...styles.categoryIcon,
            color: "#94A989",
            backgroundColor: "#C9D4C4",
          }}
        />
      );
    case "Entertainment":
      return (
        <MovieIcon
          sx={{
            ...styles.categoryIcon,
            color: "#7C7C8D",
            backgroundColor: "#A8A8B3",
          }}
        />
      );
    case "Refund":
      return (
        <ReceiptIcon
          sx={{
            ...styles.categoryIcon,
            backgroundColor: "#DCD5D0",
            color: "#BAABA1",
          }}
        />
      );
    case "Travel":
      return (
        <FlightIcon
          sx={{
            ...styles.categoryIcon,
            color: "#FF8A70",
            backgroundColor: "#FFCDC2",
          }}
        />
      );
    case "Other":
    default:
      return (
        <StarRateIcon
          sx={{
            ...styles.categoryIcon,
            color: "#F3C541",
            backgroundColor: "#FEF7E4",
          }}
        />
      );
  }
};
