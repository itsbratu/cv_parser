import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "../../../../routes";
import {
  CancelButtonStyled,
  ProcessingSubsectionStyled,
  ProcessingTitleStyled,
} from "./styles";

export const ProcessingSubsection = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <ProcessingSubsectionStyled>
      <ProcessingTitleStyled>
        Please wait, your file is being parsed.
      </ProcessingTitleStyled>
      <CancelButtonStyled
        variant="contained"
        size="large"
        onClick={() => navigate(ROUTER_PATHS.UPLOAD_FILE)}
      >
        Cancel Processing
      </CancelButtonStyled>
    </ProcessingSubsectionStyled>
  );
};
