import { render, screen } from "@testing-library/react";
import { TransactionsContext } from "../../../context/TransactionsContext";
import {
  mockTransactionContextValue,
  mockTransactionsData,
} from "../../../tests/mockData";
import FinancesBarChart from "../FinancesBarChart";
import { Transaction } from "../../../types/transactions";

const renderFinanceBarChart = (transactions: Transaction[]) => {
  const testData = {
    ...mockTransactionContextValue,
    transactions,
  };
  return render(
    <TransactionsContext.Provider value={testData}>
      <FinancesBarChart />
    </TransactionsContext.Provider>
  );
};

describe("<FinancesBarChart />", () => {
  it("renders finance details with correct data", () => {
    const transactions = mockTransactionsData;
    renderFinanceBarChart(transactions);

    const barChart = screen.getByTestId("financesBarChart");
    expect(barChart).toBeInTheDocument();
  });
});
