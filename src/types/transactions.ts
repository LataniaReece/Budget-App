export type Transaction = {
  id: string;
  title: string;
  type: "income" | "expense";
  category:
    | "Shopping"
    | "Paycheck"
    | "Clothes"
    | "Food"
    | "Entertainment"
    | "Refund"
    | "Travel"
    | "Other";
  amount: string;
  date: Date | string;
};
