import { Transaction, monthlyTransactionData } from "./types/transactions";

export const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
