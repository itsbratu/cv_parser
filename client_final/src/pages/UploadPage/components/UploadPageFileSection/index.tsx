import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUploadUserFile } from "../../../../api/mutations/useUploadUserFile";
import { FilePicker } from "../../../../components/FilePicker";
import { SnackbarAlert } from "../../../../components/SnackbarAlert";
import { useFileUploadContext } from "../../../../context/useFileUploadContext";
import { useMountEffect } from "../../../../hooks/useMountEffect";
import { useSnackbar } from "../../../../hooks/useSnackbar";
import { ROUTER_PATHS } from "../../../../routes";

export const UploadPageFileSection = (): JSX.Element => {
  const { onFileSelect, clearContextState } = useFileUploadContext();
  const { mutate } = useUploadUserFile();
  const { snackbarOpen, onSnackbarOpen, onSnackbarClose } = useSnackbar();
  const navigate = useNavigate();

  useMountEffect(() => {
    clearContextState();
  });

  const handleFileValidationError = useCallback(() => {
    onSnackbarOpen();
  }, [onSnackbarOpen]);

  const handleFileUpload = useCallback(
    (uploadedFile: File) => {
      onFileSelect(uploadedFile);

      const data = new FormData();
      data.append("resume", uploadedFile);
      mutate({ data });

      navigate(ROUTER_PATHS.PROCESS_FILE);
    },
    [mutate, navigate, onFileSelect]
  );

  return (
    <>
      <FilePicker
        title={"Select the resume file to upload or drag and drop it here."}
        subTitle={"Accepted file types are .pdf, .doc and images"}
        uploadText={"Choose a file"}
        onUpload={handleFileUpload}
        onValidationError={handleFileValidationError}
      />
      <SnackbarAlert
        content={"Wrong file format! Please upload .pdf, .doc or images"}
        open={snackbarOpen}
        onSnackBarClose={onSnackbarClose}
        severity={"error"}
      />
    </>
  );
};
UploadPageFileSection.displayName = "UploadPageFileSectionComponent";
