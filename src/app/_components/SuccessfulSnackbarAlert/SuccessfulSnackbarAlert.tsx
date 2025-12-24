"use client";
import { Snackbar, Alert } from "@mui/material";
import React, { SyntheticEvent } from "react";

export interface SuccessfulSnackbarAlertProps {
  message: string;
  onClose: (event: Event | SyntheticEvent<any, Event>) => void;
  open: boolean;
}

/**
 * After the time at autoHideDuration property the handler of onClose will be called
 * @param param0
 * @returns
 */
const SuccessfulSnackbarAlert: React.FC<SuccessfulSnackbarAlertProps> = ({
  message,
  onClose,
  open,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      sx={{ fontFamily: "inherit" }}
    >
      <Alert severity="success" variant="filled" sx={{ fontFamily: "inherit" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessfulSnackbarAlert;
