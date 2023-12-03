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
  const totalsPerCategory = calculateTotalPerCategoryThisMonth(transactions);
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
    totalsPerCategory,
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

const calculateTotalPerCategoryThisMonth = (transactions: Transaction[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      new Date(transaction.date).getMonth() === currentMonth &&
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

const saveTransactionsToLocalStorage = (transactions: Transaction[]) => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};
const saveBudgetToLocalStorage = (budget: string) => {
  localStorage.setItem("budget", JSON.stringify(budget));
};
