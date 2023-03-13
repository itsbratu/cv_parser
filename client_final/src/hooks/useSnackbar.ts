import { useCallback, useState } from "react";

export const useSnackbar = () => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const onSnackbarOpen = useCallback(() => setSnackbarOpen(true), []);

  const onSnackbarClose = useCallback(
    (_?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        setSnackbarOpen(false);
        return;
      }
      setSnackbarOpen(false);
    },
    []
  );
  return { snackbarOpen, onSnackbarOpen, onSnackbarClose };
};
