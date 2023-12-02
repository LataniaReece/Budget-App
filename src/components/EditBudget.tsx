import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { enqueueSnackbar } from "notistack";

import { StylesObject } from "../types/utility";
import { AppColors } from "../theme";
import { useTransactionsContext } from "../context/contextUtils";

interface EditBudgetProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const styles: StylesObject = {
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
  content: {
    px: 5,
    textAlign: "center",
  },
  textField: {
    backgroundColor: "white",
    borderRadius: "7px",
    mb: 4,
  },
  submitButton: {
    width: "100%",
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
};

const EditBudget: React.FC<EditBudgetProps> = ({ open, setOpen }) => {
  const { budget, setBudget } = useTransactionsContext();
  const [formBudget, setFormBudget] = useState(budget);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formBudget || formBudget === "") {
      enqueueSnackbar({
        variant: "error",
        message: "Please enter a new budget",
      });
    } else {
      setBudget(formBudget);
      handleClose();
      enqueueSnackbar({
        variant: "success",
        message: "Budget updated!",
      });
    }
  };
  return (
    <Dialog onClose={handleClose} open={open} sx={styles.dialog}>
      <Box sx={styles.dialogHeader}>
        <Typography variant="h6">Edit Budget</Typography>
        <IconButton sx={styles.closeIcon} onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={styles.content} component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="budget"
          label="Budget"
          variant="standard"
          value={formBudget || ""}
          onChange={(e) => setFormBudget(e.target.value)}
          placeholder="0.00"
          sx={styles.textField}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          inputProps={{
            inputMode: "decimal",
            min: 0,
            step: "any",
          }}
        />
        <Button sx={styles.submitButton} type="submit">
          Submit
        </Button>
      </Box>
    </Dialog>
  );
};

export default EditBudget;
