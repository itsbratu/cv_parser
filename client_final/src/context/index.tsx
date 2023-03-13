import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Optional } from "../models/globalTypes";

type FileUploadState = {
  reviewFlag: boolean;
  uploadedFile: Optional<File>;
  onFileSelect: (file: File) => void;
  onReviewFlagChange: () => void;
  clearContextState: () => void;
};

export const FileUploadContext =
  createContext<Optional<FileUploadState>>(undefined);

export const FileUploadContextProvider = (props: {
  children: ReactNode;
}): JSX.Element => {
  const [reviewFlag, setReviewFlag] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<Optional<File>>(undefined);

  const handleFileSelect = useCallback(
    (file: File) => setUploadedFile(file),
    []
  );

  const handleReviewFlagChange = useCallback(() => setReviewFlag(true), []);

  const handleClearState = useCallback(() => {
    setUploadedFile(undefined);
    setReviewFlag(false);
  }, []);

  const fileContextValue = useMemo(
    () => ({
      uploadedFile,
      reviewFlag,
      onFileSelect: handleFileSelect,
      clearContextState: handleClearState,
      onReviewFlagChange: handleReviewFlagChange,
    }),
    [
      reviewFlag,
      uploadedFile,
      handleFileSelect,
      handleReviewFlagChange,
      handleClearState,
    ]
  );

  return <FileUploadContext.Provider value={fileContextValue} {...props} />;
};
