import { UserData } from "../../models/userData";
import { Http } from "../http";

export const USER_DATA_SERVICE_ROUTES = {
  upload: () => "/upload",
  parsedData: () => "/parsed-user-data",
  submit: () => "submit-data",
};

export const uploadUserFile = (
  userUploadPayload: FormData
): Promise<string> => {
  return Http.userData
    .post(USER_DATA_SERVICE_ROUTES.upload(), userUploadPayload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => response.data);
};

export const submitUserData = (
  userSubmitPayload: UserData
): Promise<string> => {
  return Http.userData
    .post(USER_DATA_SERVICE_ROUTES.submit(), userSubmitPayload)
    .then((response) => response.data);
};

export const getParsedUserData = (): Promise<UserData> => {
  return Http.userData
    .get(USER_DATA_SERVICE_ROUTES.parsedData())
    .then((response) => response.data);
};
