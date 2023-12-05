import { render, screen } from "@testing-library/react";
import { TransactionsContext } from "../../../context/TransactionsContext";
import { moneyFormatter } from "../../../utils";
import { mockTransactionContextValue } from "../../../tests/mockData";
import FinancesDetails from "../FinancesDetails";

const renderFinanceDetails = (
  totalIncomeThisMonth: number,
  totalExpensesThisMonth: number
) => {
  const testData = {
    ...mockTransactionContextValue,
    totalIncomeThisMonth,
    totalExpensesThisMonth,
  };
  return render(
    <TransactionsContext.Provider value={testData}>
      <FinancesDetails />
    </TransactionsContext.Provider>
  );
};

describe("<FinancesDetails />", () => {
  it("renders finance details with correct data", () => {
    const totalIncomeThisMonth = 400;
    const totalExpensesThisMonth = 300;
    renderFinanceDetails(totalIncomeThisMonth, totalExpensesThisMonth);

    const thisMonthsIncome = screen.queryByTestId("thisMonthsIncome");
    expect(thisMonthsIncome).toHaveTextContent(
      moneyFormatter.format(totalIncomeThisMonth)
    );

    const thisMonthsExpense = screen.queryByTestId("thisMonthsExpense");
    expect(thisMonthsExpense).toHaveTextContent(
      `-${moneyFormatter.format(totalExpensesThisMonth)}`
    );
  });
});
