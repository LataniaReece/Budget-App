import React, { useRef } from "react";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SnackbarProvider, closeSnackbar } from "notistack";

const AppSnackbarProvider: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myRef = useRef<any>(null);
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      ref={myRef}
      action={(snackbarId) => (
        <Button
          onClick={() => closeSnackbar(snackbarId)}
          sx={{ color: "inherit" }}
        >
          <CloseIcon />
        </Button>
      )}
      preventDuplicate
    />
  );
};

export default AppSnackbarProvider;
