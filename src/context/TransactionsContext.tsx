import React, { createContext, useState, FC, useEffect } from "react";

import { Transaction } from "../types/transactions";
import TransactionsContextType from "../types/contexts";
import initialJSONData from "./initialData.json";

export const TransactionsContext = createContext<
  TransactionsContextType | undefined
>(undefined);

interface TransactionsContextProviderProps {
  children: React.ReactNode;
}

export const TransactionsContextProvider: FC<
  TransactionsContextProviderProps
> = ({ children }) => {
  const storedTransactions = localStorage.getItem("transactions");
  const initialData = storedTransactions
    ? JSON.parse(storedTransactions)
    : initialJSONData;

  const sortedTransactions = sortTransactions(initialData);

  const [transactions, setTransactions] = useState(sortedTransactions);
  const [budget, setBudget] = useState<string>(
    JSON.parse(localStorage.getItem("budget") || "3000")
  );

  const { totalExpensesThisMonth, totalIncomeThisMonth } =
    calculateTotalsThisMonth(transactions);
  const totalTransactions = transactions.length;

  useEffect(() => {
    saveTransactionsToLocalStorage(transactions);
  }, [transactions]);

  useEffect(() => {
    saveBudgetToLocalStorage(budget);
  }, [budget]);

  const addTransaction = (transaction: Transaction) => {
    const updatedTransactions = [...transactions, transaction];
    const sortedUpdatedTransactions = sortTransactions(updatedTransactions);
    setTransactions(sortedUpdatedTransactions);
  };

  const removeTransaction = (id: string) => {
    setTransactions((prev) =>
      prev.filter((prevTransactions) => prevTransactions.id !== id)
    );
  };

  const contextValue: TransactionsContextType = {
    transactions,
    setTransactions,
    addTransaction,
    removeTransaction,
    totalExpensesThisMonth,
    totalIncomeThisMonth,
    totalTransactions,
    budget,
    setBudget,
  };

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
};

// Helper functions
const sortTransactions = (arr: Transaction[]): Transaction[] => {
  return [...arr].sort((a: Transaction, b: Transaction) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return dateB - dateA;
  });
};

const calculateTotalsThisMonth = (
  transactions: Transaction[]
): { totalExpensesThisMonth: number; totalIncomeThisMonth: number } => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const result = transactions
    .filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const transactionMonth = transactionDate.getMonth();
      const transactionYear = transactionDate.getFullYear();

      return (
        transactionMonth === currentMonth && transactionYear === currentYear
      );
    })
    .reduce(
      (acc, transaction) => {
        const amount = parseFloat(transaction.amount);
        if (transaction.type === "expense") {
          acc.totalExpensesThisMonth += Math.abs(amount);
        } else if (transaction.type === "income") {
          acc.totalIncomeThisMonth += amount;
        }
        return acc;
      },
      { totalExpensesThisMonth: 0, totalIncomeThisMonth: 0 }
    );

  return result;
};

const saveTransactionsToLocalStorage = (transactions: Transaction[]) => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};
const saveBudgetToLocalStorage = (budget: string) => {
  localStorage.setItem("budget", JSON.stringify(budget));
};
