import { render, screen } from "@testing-library/react";
import BudgetPieChart from "../BudgetPieChart";
import { TransactionsContext } from "../../../context/TransactionsContext";
import { moneyFormatter } from "../../../utils";
import { mockTransactionContextValue } from "../../../tests/mockData";

const renderBudgetPieChart = (
  budget: string,
  totalExpensesThisMonth: number
) => {
  const testData = {
    ...mockTransactionContextValue,
    budget,
    totalExpensesThisMonth,
  };
  return render(
    <TransactionsContext.Provider value={testData}>
      <BudgetPieChart />
    </TransactionsContext.Provider>
  );
};

describe("<BudgetPieChart />", () => {
  it("renders budget pie chart without budget", () => {
    const budget = "";
    const totalExpensesThisMonth = 400;
    renderBudgetPieChart(budget, totalExpensesThisMonth);

    const setBudgetButton = screen.queryByTestId("setBudgetButton");
    expect(setBudgetButton).toBeInTheDocument();

    const budgetPieChart = screen.queryByTestId("budgetPieChart");
    expect(budgetPieChart).not.toBeInTheDocument();

    // Make sure edit button is not rendered
    const editBudgetButton = screen.queryByTestId("editBudgetButton");
    expect(editBudgetButton).not.toBeInTheDocument();
  });

  it("renders budget pie chart with budget", () => {
    const budget = "300";
    const totalExpensesThisMonth = 400;
    renderBudgetPieChart(budget, totalExpensesThisMonth);

    const budgetPieChart = screen.queryByTestId("budgetPieChart");
    expect(budgetPieChart).toBeInTheDocument();

    const setBudgetButton = screen.queryByTestId("setBudgetButton");
    expect(setBudgetButton).not.toBeInTheDocument();

    const editBudgetButton = screen.queryByTestId("editBudgetButton");
    expect(editBudgetButton).toBeInTheDocument();

    const monthlyLimit = screen.queryByTestId("monthlyLimit");
    expect(monthlyLimit).toHaveTextContent(
      moneyFormatter.format(Number(budget))
    );

    const remaining = screen.queryByTestId("remaining");
    expect(remaining).toHaveTextContent(
      moneyFormatter.format(Number(budget) - totalExpensesThisMonth)
    );
  });
});
