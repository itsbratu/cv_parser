import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFileUploadContext } from "../../context/useFileUploadContext";
import { ROUTER_PATHS } from "../../routes";
import { ProcessingCircularProgress } from "./components/ProcessingCircularProgress";
import { ProcessingSubsection } from "./components/ProcessingSubsection";
import { PageWrapperStyled } from "./styles";

const NAVIGATION_TIMER = 5;

export const ProcessingPage = (): JSX.Element => {
  const [seconds, setSeconds] = useState<number>(0);
  const { uploadedFile, reviewFlag } = useFileUploadContext();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    if (uploadedFile && !reviewFlag) return;
    navigate(ROUTER_PATHS.UPLOAD_FILE);
  }, [uploadedFile, reviewFlag, navigate]);

  useEffect(() => {
    if (seconds !== NAVIGATION_TIMER) return;
    navigate(ROUTER_PATHS.REVIEW_FILE);
  }, [navigate, seconds]);

  return (
    <PageWrapperStyled>
      <ProcessingCircularProgress />
      <ProcessingSubsection />
    </PageWrapperStyled>
  );
};
ProcessingPage.displayName = "ProcessingPageComponent";

export default ProcessingPage;
