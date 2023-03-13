import { AlertColor, Snackbar } from "@mui/material";
import { AlertStyled } from "./styles";

type SnackbarProps = {
  content: string;
  severity: AlertColor;
  open: boolean;
  onSnackBarClose: () => void;
};

export const SnackbarAlert = ({
  open,
  content,
  onSnackBarClose,
  severity,
}: SnackbarProps): JSX.Element => (
  <Snackbar
    open={open}
    autoHideDuration={3500}
    onClose={onSnackBarClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <AlertStyled
      $severity={severity}
      onClose={onSnackBarClose}
      severity={severity}
      sx={{ width: "100%" }}
    >
      {content}
    </AlertStyled>
  </Snackbar>
);
SnackbarAlert.displayName = "SnackbarAlertComponent";
