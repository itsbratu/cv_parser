import { AlertColor, AlertProps, Alert } from "@mui/material";
import styled from "styled-components";

type AlertStyledProps = AlertProps & {
  $severity: AlertColor;
};

export const AlertStyled = styled(Alert)<AlertStyledProps>`
  background-color: ${({ $severity }) =>
    $severity === "success"
      ? "#00d900"
      : $severity === "info"
      ? "#f0f000"
      : $severity === "warning"
      ? "#ffa500"
      : "#ff7070"};
`;
