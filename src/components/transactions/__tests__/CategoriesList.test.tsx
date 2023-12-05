import { render, screen } from "@testing-library/react";
import { TransactionsContext } from "../../../context/TransactionsContext";
import { moneyFormatter } from "../../../utils";
import {
  mockTransactionContextValue,
  mockTransactionsData,
} from "../../../tests/mockData";
import CategoriesList from "../CategoriesList";
import { Transaction } from "../../../types/transactions";

const renderCategoriesList = (transactions: Transaction[]) => {
  const testData = {
    ...mockTransactionContextValue,
    transactions,
  };
  return render(
    <TransactionsContext.Provider value={testData}>
      <CategoriesList />
    </TransactionsContext.Provider>
  );
};

describe("<CategoriesList />", () => {
  it("renders categories list with correct data", () => {
    renderCategoriesList(mockTransactionsData);

    // Note: if the mockData doesnt have any expenses in the current month then this will all be 0 for each category
    const shoppingCategoryAmount = screen.queryByTestId(
      "category-Shopping-amount"
    );
    expect(shoppingCategoryAmount).toHaveTextContent(
      moneyFormatter.format(Number("150.00"))
    );

    const travelCategoryAmount = screen.queryByTestId("category-Travel-amount");
    expect(travelCategoryAmount).toHaveTextContent(
      moneyFormatter.format(Number("500.50"))
    );

    const foodTravelCategory = screen.queryByTestId("category-Food-amount");
    expect(foodTravelCategory).toHaveTextContent(
      moneyFormatter.format(Number("0.00"))
    );
  });

  it("renders categories list with correct data if no transactions", () => {
    renderCategoriesList([]);

    // Note: if the mockData doesnt have any expenses in the current month then this will all be 0 for each category
    const shoppingCategoryAmount = screen.queryByTestId(
      "category-Shopping-amount"
    );
    expect(shoppingCategoryAmount).not.toHaveTextContent(
      moneyFormatter.format(Number("150.00"))
    );
    expect(shoppingCategoryAmount).toHaveTextContent(
      moneyFormatter.format(Number("0.00"))
    );
  });
});
