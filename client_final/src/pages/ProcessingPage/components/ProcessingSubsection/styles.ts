import { Box, Button, styled } from "@mui/material";
import Typography from "@mui/material/Typography";

export const ProcessingSubsectionStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5vh;
`;

export const ProcessingTitleStyled = styled(Typography)`
  font-size: 2.5vw;
`;

export const CancelButtonStyled = styled(Button)`
  font-size: 1vw;
  text-transform: none;
  background-color: #3a91e8;
  &:hover {
    background-color: #3a91e8;
  }
`;
