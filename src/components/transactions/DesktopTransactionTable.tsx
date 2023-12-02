import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, IconButton, Typography } from "@mui/material";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { format } from "date-fns";

import AddTransaction from "./AddTransaction";
import { AppPaper } from "../AppPaper";
import { AppPaperHeader } from "../AppPaperHeader";
import { useTransactionsContext } from "../../context/contextUtils";
import { AppMeasurements } from "../../theme";
import { StylesObject } from "../../types/utility";
import {
  getCategoryLabel,
  getTransactionTypeAndAmount,
} from "./transactionHelperFunctions";
import RemoveTransaction from "./RemoveTransaction";
import { Transaction } from "../../types/transactions";

const styles: StylesObject = {
  wrapper: { mt: 5 },
  heading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 2,
  },
  addButton: {
    textTransform: "initial",
    color: "white",
  },
  dataGrid: {
    fontSize: 16,
    borderWidth: 0,
    ".MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
      backgroundColor: "#fff",
    },
    ".MuiDataGrid-columnHeaderTitle": {
      fontWeight: 700,
    },
    ".MuiDataGrid-withBorderColor": {
      borderColor: "#E6E8F0",
    },
    ".MuiTablePagination-root": {
      color: "gray",
    },
    "&:last-child": {
      border: 0,
    },
  },
  titleWrapper: { display: "flex", alignItems: "center", gap: 1 },
  categoryIcon: {
    fontSize: 32,
    padding: 0.5,
    borderRadius: AppMeasurements.radiusLarge,
  },
  amountInfo: {
    fontSize: 14,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: 1,
    p: 1,
    borderRadius: AppMeasurements.radiusSmall,
  },
  amountInfoIcon: {
    color: "white",
    borderRadius: "50%",
    fontSize: 15,
    p: 0.3,
  },
  rowDeleteContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
  },
};

const DesktopTransactionsTable = () => {
  const [openAddTransaction, setOpenAddTransaction] = useState(false);
  const [openRemoveTransaction, setOpenRemoveTransaction] = useState(false);
  const [transactionToRemove, setTransactionToRemove] =
    useState<Transaction | null>(null);
  const { transactions } = useTransactionsContext();

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      renderCell: (params) => (
        <Box sx={styles.titleWrapper}>
          {getCategoryLabel(params.row.category)}
          <Typography>{params.row.title}</Typography>
        </Box>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) =>
        getTransactionTypeAndAmount(params.row.type, params.row.amount),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => (
        <>{format(new Date(params.row.date), "MM/dd/yyyy")}</>
      ),
    },
    {
      flex: 0.5,
      headerName: "",
      field: "",
      renderCell: (params) => (
        <Box sx={styles.rowDeleteContainer}>
          <IconButton
            onClick={() => {
              setTransactionToRemove(params.row);
              setOpenRemoveTransaction(true);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      ),
      sortable: false,
      disableColumnMenu: true,
    },
  ];

  const CustomNoRowsOverlay = () => (
    <Box sx={{ textAlign: "center", mt: 3 }}>
      <AnnouncementOutlinedIcon />
      <Typography variant="h6">No Transactions</Typography>
    </Box>
  );

  return (
    <>
      <AppPaper>
        <Box sx={styles.heading}>
          <AppPaperHeader>Transactions</AppPaperHeader>
          <Button
            variant="contained"
            sx={styles.addButton}
            onClick={() => setOpenAddTransaction(true)}
          >
            <AddIcon />
            Add Transaction
          </Button>
        </Box>
        <DataGrid
          rows={transactions}
          columns={columns}
          autoHeight
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          sx={styles.dataGrid}
          pageSizeOptions={[5, 10, 25]}
        />
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

export default DesktopTransactionsTable;
