// components/AlertModal.tsx
"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Box from "@mui/material/Box";

interface AlertModalProps {
  open: boolean;
  onClose: () => void;
  type: "info" | "warning" | "error" | "success";
  title: string;
  message: string;
}

const getIcon = (type: AlertModalProps["type"]) => {
  const iconStyle = { fontSize: 40, marginRight: 8 };
  switch (type) {
    case "info":
      return <InfoIcon color="info" style={iconStyle} />;
    case "warning":
      return <WarningAmberIcon color="warning" style={iconStyle} />;
    case "error":
      return <ErrorIcon color="error" style={iconStyle} />;
    case "success":
      return <CheckCircleIcon color="success" style={iconStyle} />;
    default:
      return null;
  }
};

export default function AlertModal({
  open,
  onClose,
  type,
  title,
  message,
}: AlertModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          {getIcon(type)}
          <Typography variant="h6">{title}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
