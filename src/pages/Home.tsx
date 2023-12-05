import { FC } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

import Header from "../components/Header";
import CategoriesList from "../components/transactions/CategoriesList";
import ChartsSection from "../components/charts/ChartsSection";
import MobileTransactionTable from "../components/transactions/MobileTransactionTable";
import DesktopTransactionTable from "../components/transactions/DesktopTransactionTable";

const Home: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Header />
      <Box component="main" sx={{ px: { xs: 2, md: 10 }, pb: 6 }}>
        <ChartsSection />
        {isMobile ? <MobileTransactionTable /> : <DesktopTransactionTable />}
        <CategoriesList />
      </Box>
    </>
  );
};

export default Home;
