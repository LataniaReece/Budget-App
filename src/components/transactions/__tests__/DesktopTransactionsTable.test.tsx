import { render, screen } from "@testing-library/react";
import { TransactionsContext } from "../../../context/TransactionsContext";
import DesktopTransactionTable from "../DesktopTransactionTable";
import {
  mockTransactionContextValue,
  mockTransactionsData,
} from "../../../tests/mockData";
import { Transaction } from "../../../types/transactions";

const renderCategoriesList = (transactions: Transaction[]) => {
  const testData = {
    ...mockTransactionContextValue,
    transactions,
  };
  return render(
    <TransactionsContext.Provider value={testData}>
      <DesktopTransactionTable />
    </TransactionsContext.Provider>
  );
};
describe("<DesktopTransactionsTable />", () => {
  it("renders desktop table with data", () => {
    // 5 items per transactions table row so only selecting the first
    const data = mockTransactionsData.slice(0, 5);
    renderCategoriesList(data);

    const desktopTable = screen.getByTestId("desktopTransactionsTable");
    expect(desktopTable).toBeInTheDocument();

    const rows = screen.queryAllByRole("row");
    // Subtracting 1 to exclude the header row
    expect(rows.length - 1).toBe(data.length);
  });
});
