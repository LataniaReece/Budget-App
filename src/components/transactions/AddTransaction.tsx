import React, { FC, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { v4 as uuidv4 } from "uuid";
import { enqueueSnackbar } from "notistack";

import { useTransactionsContext } from "../../context/contextUtils";
import { StylesObject } from "../../types/utility";
import { Transaction } from "../../types/transactions";
import { AppColors } from "../../theme";

interface AddTransactionProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const styles: StylesObject = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "200px",
  },
  button: {
    textTransform: "initial",
    color: "white",
  },
  dialog: {
    ".MuiDialog-paper": {
      pb: 3,
    },
  },
  dialogHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
    backgroundColor: AppColors.blue,
    p: 2,
    color: "white",
  },
  closeIcon: { p: 0, color: "white" },
  form: {
    px: 5,
  },
  textField: {
    backgroundColor: "white",
    borderRadius: "7px",
    mb: 4,
    width: "100%",
  },
  submitButton: {
    width: "100%",
    mt: 3,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: AppColors.darkGray,
    textTransform: "initial",
    "&:hover": {
      transition: "all 0.25s",
      backgroundColor: AppColors.gray,
      opacity: 0.7,
    },
  },
  errorMessage: {
    backgroundColor: "white",
    borderRadius: "7px",
    mb: 4,
    width: "100%",
  },
};

const initialValues = {
  title: "",
  type: "",
  category: "",
  amount: "",
  date: new Date(),
};

const categories = [
  "Shopping",
  "Paycheck",
  "Clothes",
  "Food",
  "Entertainment",
  "Refund",
  "Other",
];

const AddTransaction: FC<AddTransactionProps> = ({ open, setOpen }) => {
  const { addTransaction } = useTransactionsContext();
  const [newTransaction, setNewTransaction] = useState(initialValues);
  const [message, setMessage] = useState("");

  const handleInputChange = (field: string, value: string | number | Date) => {
    setNewTransaction((prevTransaction) => ({
      ...prevTransaction,
      [field]: value,
    }));
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setNewTransaction(initialValues);
  };

  const handleSubmitAddNewTransaction = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setMessage("");
    let emptyField = false;
    Object.values(newTransaction).forEach((val) => {
      if (val === "" || val === null) {
        emptyField = true;
      }
    });
    if (emptyField) {
      setMessage("Please enter all fields.");
    } else {
      const formattedNewTransaction = {
        ...newTransaction,
        id: uuidv4(),
        amount:
          newTransaction.type === "expense"
            ? `-${newTransaction.amount}`
            : newTransaction.amount,
      } as Transaction;
      addTransaction(formattedNewTransaction);
      handleCloseDialog();
      enqueueSnackbar({ variant: "success", message: "Transaction Added" });
    }
  };

  return (
    <>
      <Dialog onClose={handleCloseDialog} open={open} sx={styles.dialog}>
        <Box sx={styles.dialogHeader}>
          <Typography variant="h6">Add Transaction</Typography>
          <IconButton sx={styles.closeIcon} onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          component="form"
          sx={styles.form}
          onSubmit={handleSubmitAddNewTransaction}
        >
          <FormControl fullWidth>
            <TextField
              name="title"
              label="Title"
              variant="standard"
              value={newTransaction.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Transaction title..."
              sx={styles.textField}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              name="amount"
              label="Amount"
              type="number"
              variant="standard"
              value={newTransaction.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              placeholder="0.00"
              sx={styles.textField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              inputProps={{
                inputMode: "decimal",
                min: 0,
                step: "any",
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ minWidth: 120 }}>
            <TextField
              name="type"
              label="Type"
              select
              variant="standard"
              value={newTransaction.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              sx={styles.textField}
            >
              <MenuItem key="income" value="income">
                Income
              </MenuItem>
              <MenuItem key="expense" value="expense">
                Expense
              </MenuItem>
            </TextField>
          </FormControl>
          <FormControl fullWidth sx={{ minWidth: 120 }}>
            <TextField
              name="category"
              label="Category"
              select
              variant="standard"
              value={newTransaction.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              sx={styles.textField}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Transaction Date"
                value={newTransaction.date}
                onChange={(date) => {
                  if (date !== null) {
                    handleInputChange("date", date);
                  }
                }}
                slotProps={{ textField: { variant: "standard" } }}
                disableFuture
              />
            </LocalizationProvider>
          </FormControl>
          {message && (
            <Typography sx={styles.errorMessage}>
              <ErrorOutlineIcon />
              {message}
            </Typography>
          )}
          <Button type="submit" variant="contained" sx={styles.submitButton}>
            Add
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default AddTransaction;
