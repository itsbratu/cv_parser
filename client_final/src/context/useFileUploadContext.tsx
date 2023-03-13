import { isUndefined } from "lodash";
import { useContext } from "react";
import { FileUploadContext } from ".";

export const useFileUploadContext = () => {
  const CTX = useContext(FileUploadContext);

  if (isUndefined(CTX)) {
    throw new Error(
      `FileUploadContext must be used within a provider, consider wrapping a parent with 'FileUploadContextProvider'`
    );
  }

  return CTX;
};
