import { User } from "./account";
import { Transaction, monthlyTransactionData } from "./transactions";

export interface AccountContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default interface TransactionsContextType {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  monthlyTransactionsData: monthlyTransactionData[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  totalExpensesThisMonth: number;
  totalIncomeThisMonth: number;
  totalTransactions: number;
  totalsPerCategory: Record<string, number>;
  budget: string;
  setBudget: React.Dispatch<React.SetStateAction<string>>;
}
