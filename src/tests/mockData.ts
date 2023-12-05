import TransactionsContextType from "../types/contexts";
import { Transaction } from "../types/transactions";

export const mockTransactionContextValue = {
  transactions: [],
  setTransactions: () => {},
  addTransaction: () => {},
  removeTransaction: () => {},
  totalIncomeThisMonth: 0,
  totalTransactions: 0,
  totalsPerCategory: {},
  setBudget: () => {},
  budget: "",
  totalExpensesThisMonth: 0,
} as TransactionsContextType;

export const mockTransactionsData = [
  {
    title: "Grocery Shopping",
    type: "expense",
    category: "Food",
    amount: "-120.45",
    date: "2023-11-10T10:15:30.000Z",
    id: "a1b2c3s4-e5f6-78e0-1234-5678abcd1234",
  },
  {
    title: "Concert Tickets",
    type: "expense",
    category: "Entertainment",
    amount: "-200.00",
    date: "2023-11-15T20:45:00.000Z",
    id: "e1f2g1a4-i5j6k7l8-e012-3456-7890efgh5678",
  },
  {
    title: "October Paycheck",
    type: "income",
    category: "Paycheck",
    amount: "3569.00",
    date: "2023-10-09T00:00:00.000Z",
    id: "ijklone1-qrstuv-s234-5678-abcd9012efgh",
  },
  {
    title: "New Shoes",
    type: "expense",
    category: "Clothes",
    amount: "-89.99",
    date: "2023-11-20T12:30:00.000Z",
    id: "98765432-aabcdef-s234-5678-ijklmnsopqrst",
  },
  {
    title: "November Paycheck",
    type: "income",
    category: "Paycheck",
    amount: "3569.00",
    date: "2023-11-15T12:00:00.000Z",
    id: "mnop01s2-uvwx-yzab-1234-5678cdef9012",
  },
  {
    title: "December Paycheck",
    type: "income",
    category: "Paycheck",
    amount: "3450.87",
    date: "2023-12-05T12:00:00.000Z",
    id: "qrstlv0x-yzab-cdef-1234-562890abhdef",
  },
  {
    title: "Gift Purchases",
    type: "expense",
    category: "Shopping",
    amount: "-150.00",
    date: "2023-12-10T15:30:00.000Z",
    id: "ijk3mfop-qr9tuv-1e34-5678-abcd9012xyzw",
  },
  {
    title: "Ski Trip Expenses",
    type: "expense",
    category: "Travel",
    amount: "-500.50",
    date: "2023-12-20T09:00:00.000Z",
    id: "7890ab4d-ef12-o456-ijkl-mnopqrstuvwx",
  },
] as Transaction[];
