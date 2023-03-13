import { UploadPageFileSection } from "./components/UploadPageFileSection";
import { UploadPageTitle } from "./components/UploadPageTitle";
import { PageWrapperStyled } from "./styles";

export const UploadPage = (): JSX.Element => {
  return (
    <PageWrapperStyled>
      <UploadPageTitle />
      <UploadPageFileSection />
    </PageWrapperStyled>
  );
};
UploadPage.displayName = "UploadPageComponent";

export default UploadPage;
