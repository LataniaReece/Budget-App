import React from "react";
import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { enqueueSnackbar } from "notistack";

import { StylesObject } from "../../types/utility";
import { AppColors } from "../../theme";
import { Transaction } from "../../types/transactions";
import { useTransactionsContext } from "../../context/contextUtils";

interface RemoveTransactionProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transaction: Transaction | null;
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
  buttonsContainer: {
    display: "flex",
    gap: 2,
    justifyContent: "center",
    mt: 2,
  },
  submitButton: {
    backgroundColor: AppColors.darkGray,
    "&:hover": {
      transition: "all 0.25s",
      backgroundColor: AppColors.gray,
      opacity: 0.7,
    },
  },
};

const RemoveTransaction: React.FC<RemoveTransactionProps> = ({
  open,
  setOpen,
  transaction,
}) => {
  const { removeTransaction } = useTransactionsContext();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = () => {
    if (transaction) {
      removeTransaction(transaction.id);
      setOpen(false);
      enqueueSnackbar({ variant: "success", message: "Transaction Removed!" });
    }
  };
  return (
    <Dialog onClose={handleClose} open={open} sx={styles.dialog}>
      <Box sx={styles.dialogHeader}>
        <Typography variant="h6">Remove Transaction</Typography>
        <IconButton sx={styles.closeIcon} onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={styles.content}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Are you sure you want to remove:
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {transaction && transaction.title}
        </Typography>
        <Box sx={styles.buttonsContainer}>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleRemove}
            sx={styles.submitButton}
          >
            Yes, I'm sure
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default RemoveTransaction;
