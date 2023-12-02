import { useContext } from "react";

import { AccountContext } from "./AccountContext";
import TransactionsContextType from "../types/contexts";
import { TransactionsContext } from "./TransactionsContext";

export const useTransactionsContext = (): TransactionsContextType => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactionsContext must be used within a AppProvider");
  }
  return context;
};

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error(
      "useAccountContext must be used within an AccountContextProvider"
    );
  }
  return context;
};
