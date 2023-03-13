import { CssBaseline } from "@mui/material";
import { ReactQueryProvider } from "./api/queryClient";
import { FileUploadContextProvider } from "./context";
import { AppRouter } from "./routes";

export const App = (): JSX.Element => {
  return (
    <ReactQueryProvider>
      <CssBaseline />
      <FileUploadContextProvider>
        <AppRouter />
      </FileUploadContextProvider>
    </ReactQueryProvider>
  );
};
App.displayName = "AppComponent";
