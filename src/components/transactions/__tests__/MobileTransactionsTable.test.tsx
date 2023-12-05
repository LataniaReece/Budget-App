import { render, screen } from "@testing-library/react";
import { TransactionsContext } from "../../../context/TransactionsContext";
import {
  mockTransactionContextValue,
  mockTransactionsData,
} from "../../../tests/mockData";
import { Transaction } from "../../../types/transactions";
import MobileTransactionTable from "../MobileTransactionTable";

const renderCategoriesList = (transactions: Transaction[]) => {
  const testData = {
    ...mockTransactionContextValue,
    transactions,
  };
  return render(
    <TransactionsContext.Provider value={testData}>
      <MobileTransactionTable />
    </TransactionsContext.Provider>
  );
};
describe("<MobileTransactionTable />", () => {
  it("renders mobile table with data", () => {
    const data = mockTransactionsData;
    renderCategoriesList(data);

    const mobileTable = screen.getByTestId("mobileTransactionsTable");
    expect(mobileTable).toBeInTheDocument();

    const mobileTableRows = screen.queryAllByTestId(/mobile-transaction/);
    expect(mobileTableRows.length).toEqual(data.length);
  });
});
