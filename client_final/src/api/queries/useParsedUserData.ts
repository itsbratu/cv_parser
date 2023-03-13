import { useQuery } from "react-query";
import { Optional } from "../../models/globalTypes";
import { UserData } from "../../models/userData";
import { APPLICATION_KEYS } from "../constants";
import { getParsedUserData } from "../services/userDataService";

export const useParsedUserData = () => {
  const { data, isLoading, isError, refetch } = useQuery<Optional<UserData>>(
    APPLICATION_KEYS.userData,
    () => {
      return getParsedUserData();
    }
  );

  return { data, isLoading, isError, refetch };
};
