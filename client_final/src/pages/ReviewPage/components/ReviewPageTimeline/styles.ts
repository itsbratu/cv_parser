import styled from "styled-components";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import { TimelineDotProps } from "@mui/lab/TimelineDot";
import TimeLineDot from "@mui/lab/TimelineDot";
import { Typography } from "@mui/material";

type TimelineDotStyledProps = TimelineDotProps & {
  $color?: string;
};

export const TimelineStyled = styled(Timeline)`
  position: fixed;
  top: 33vh;
  left: 75vw;
  z-index: 10;
  width: 15vw;
`;

export const TimelineDotStyled = styled(TimeLineDot)<TimelineDotStyledProps>`
  background-color: ${({ $color }) => ($color ? $color : "black")};

  height: 1.75vh;
  width: 0.9vw;
`;

export const TimelineConnectorStyled = styled(TimelineConnector)`
  background-color: black;
`;

export const TimelineDotTextStyled = styled(Typography)`
  font-size: 1.1vw;
  margin-bottom: 0.1vh;
  &:hover {
    cursor: pointer;
  }
`;
