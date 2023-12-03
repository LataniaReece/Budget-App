import { FC, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import { useTransactionsContext } from "../../context/contextUtils";
import { format } from "date-fns";
import { StylesObject } from "../../types/utility";
import { AppPaper } from "../AppPaper";
import { AppPaperHeader } from "../AppPaperHeader";
import {
  getCategoryLabel,
  getTransactionTypeAndAmount,
} from "./transactionHelperFunctions";
import AddTransaction from "./AddTransaction";
import { AppColors } from "../../theme";
import RemoveTransaction from "./RemoveTransaction";
import { Transaction } from "../../types/transactions";

const styles: StylesObject = {
  heading: {
    mb: 3,
  },
  addButton: {
    textTransform: "initial",
    color: "white",
  },
  tableCell: {
    [`&.${tableCellClasses.head}`]: {
      display: "none",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: "0.5rem 0.25rem",
      borderBottom: "none",
      color: "#050B1C",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "right",
      "&:first-of-type": {
        borderTop: `1px solid ${AppColors.blueLight}`,
      },

      "&:last-of-type": {
        borderBottom: "none",
      },
    },
  },
  titleContainer: { display: "flex", alignItems: "center", gap: 1 },
};

const MobileTransactionTable: FC = () => {
  const [openAddTransaction, setOpenAddTransaction] = useState(false);
  const [openRemoveTransaction, setOpenRemoveTransaction] = useState(false);
  const [transactionToRemove, setTransactionToRemove] =
    useState<Transaction | null>(null);
  const { transactions } = useTransactionsContext();

  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <AppPaper>
        <Box sx={styles.heading}>
          <AppPaperHeader sx={{ mb: 2 }}>Transactions</AppPaperHeader>
          <Button
            variant="contained"
            sx={styles.addButton}
            onClick={() => setOpenAddTransaction(true)}
          >
            <AddIcon />
            Add Transaction
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={styles.tableCell}>Title</TableCell>
                <TableCell sx={styles.tableCell}>Amount</TableCell>
                <TableCell sx={styles.tableCell}>Date</TableCell>
                <TableCell sx={styles.tableCell}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions &&
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell sx={styles.tableCell}>
                      <Typography style={{ fontWeight: "bold" }}>
                        Title
                      </Typography>
                      <Typography sx={styles.titleContainer}>
                        <span>{transaction.title}</span>
                        {!isSmallMobile &&
                          getCategoryLabel(transaction.category)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={styles.tableCell}>
                      <Typography style={{ fontWeight: "bold" }}>
                        Amount
                      </Typography>
                      {getTransactionTypeAndAmount(
                        transaction.type,
                        transaction.amount
                      )}
                    </TableCell>
                    <TableCell sx={styles.tableCell}>
                      <Typography style={{ fontWeight: "bold" }}>
                        Date
                      </Typography>
                      {format(new Date(transaction.date), "MM/dd/yy")}
                    </TableCell>
                    <TableCell sx={styles.tableCell}>
                      <Typography style={{ fontWeight: "bold" }}>
                        Remove
                      </Typography>
                      <IconButton
                        onClick={() => {
                          setTransactionToRemove(transaction);
                          setOpenRemoveTransaction(true);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AppPaper>
      <AddTransaction
        open={openAddTransaction}
        setOpen={setOpenAddTransaction}
      />
      <RemoveTransaction
        open={openRemoveTransaction}
        setOpen={setOpenRemoveTransaction}
        transaction={transactionToRemove}
      />
    </>
  );
};

export default MobileTransactionTable;
