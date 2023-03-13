import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { uploadUserFile } from "../services/userDataService";

type UploadUserFilePayload = {
  data: FormData;
};

export const useUploadUserFile = () => {
  const { isLoading, isError, error, mutate } = useMutation<
    string,
    AxiosError,
    UploadUserFilePayload
  >(({ data }) => uploadUserFile(data));

  return {
    isLoading,
    isError,
    error,
    mutate,
  };
};
