import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { UserData } from "../../models/userData";
import { submitUserData } from "../services/userDataService";

type SubmitUserDataPayload = {
  data: UserData;
};

export const useSubmitUserData = () => {
  const { isLoading, isError, error, mutate } = useMutation<
    string,
    AxiosError,
    SubmitUserDataPayload
  >(({ data }) => submitUserData(data));

  return {
    isLoading,
    isError,
    error,
    mutate,
  };
};
