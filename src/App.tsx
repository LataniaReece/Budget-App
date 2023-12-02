import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import Home from "./pages/Home";
import AppSnackbarProvider from "./components/AppSnackbarProvider";
import { TransactionsContextProvider } from "./context/TransactionsContext";
import { AccountContextProvider } from "./context/AccountContext";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TransactionsContextProvider>
        <AccountContextProvider>
          <AppSnackbarProvider />
          <Home />
        </AccountContextProvider>
      </TransactionsContextProvider>
    </ThemeProvider>
  );
}

export default App;
