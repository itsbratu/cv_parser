import { Navigate, useRoutes } from "react-router-dom";
import UploadPage from "../pages/UploadPage";
import { ReviewPage } from "../pages/ReviewPage";
import ProcessingPage from "../pages/ProcessingPage";

export const ROUTER_PATHS = {
  UPLOAD_FILE: "/upload-file",
  PROCESS_FILE: "/processing-file",
  REVIEW_FILE: "/review-file",
};

export const AppRouter = () =>
  useRoutes([
    {
      path: ROUTER_PATHS.UPLOAD_FILE,
      element: <UploadPage />,
    },
    {
      path: ROUTER_PATHS.PROCESS_FILE,
      element: <ProcessingPage />,
    },
    {
      path: ROUTER_PATHS.REVIEW_FILE,
      element: <ReviewPage />,
    },
    {
      path: "*",
      element: <Navigate to="/upload-file" replace />,
    },
  ]);

AppRouter.displayName = "AppRouterComponent";
