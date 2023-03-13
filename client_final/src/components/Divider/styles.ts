import { Divider, DividerProps } from "@mui/material";
import styled from "styled-components";

type DividerStyledProps = DividerProps & {
  $color?: string;
};

export const DividerStyled = styled(Divider)<DividerStyledProps>`
  background-color: ${({ $color }) => $color};
  margin-top: 1.5vh;
  margin-bottom: 2.5vh;
  border-width: 2px;
`;
