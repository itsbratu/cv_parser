import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SnackbarAlert } from "../../components/SnackbarAlert";
import { useFileUploadContext } from "../../context/useFileUploadContext";
import { useSnackbar } from "../../hooks/useSnackbar";
import { ROUTER_PATHS } from "../../routes";
import { ReviewPageDynamicForm } from "./components/ReviewPageDynamicForm";
import { PageWrapperStyled, ReviewPageRedoUploadButtonStyled } from "./styles";
import ReviewPageTimeline from "./components/ReviewPageTimeline";
import { useParsedUserData } from "../../api/queries/useParsedUserData";

export const ReviewPage = (): JSX.Element => {
  const { uploadedFile, onReviewFlagChange } = useFileUploadContext();
  const { data } = useParsedUserData();
  console.log(data);
  const { snackbarOpen, onSnackbarOpen, onSnackbarClose } = useSnackbar();

  const navigate = useNavigate();

  useEffect(
    () => {
      if (!uploadedFile) navigate(ROUTER_PATHS.UPLOAD_FILE);
      onSnackbarOpen();
      onReviewFlagChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <PageWrapperStyled>
      {data && (
        <>
          <ReviewPageRedoUploadButtonStyled
            variant="contained"
            size="medium"
            onClick={() => navigate(ROUTER_PATHS.UPLOAD_FILE)}
          >
            Upload File
          </ReviewPageRedoUploadButtonStyled>
          <ReviewPageDynamicForm userData={data} />
          <ReviewPageTimeline />
          <SnackbarAlert
            content={`${uploadedFile?.name} has been successfully parsed.`}
            open={snackbarOpen}
            onSnackBarClose={onSnackbarClose}
            severity="success"
          />
        </>
      )}
    </PageWrapperStyled>
  );
};
ReviewPage.displayName = "ReviewPageComponent";

export default ReviewPage;
