import { Box, Button, styled } from "@mui/material";

export const PageWrapperStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  padding-top: 2.5vh;
`;

export const SubmitButtonStyled = styled(Button)`
  margin-top: 2vh;
  margin-bottom: 5vh;
  text-transform: none;
  font-size: 1.25vw;
  background-color: #3a91e8;
  &:hover {
    background-color: #3a91e8;
  }
`;

export const ReviewPageRedoUploadButtonStyled = styled(Button)`
  display: flex;
  align-item: center;
  gap: 0.5vw;
  margin-top: 1.25vh;
  width: 10vw;
  text-transform: none;
  font-size: 1vw;
  background-color: #3a91e8;
  &:hover {
    background-color: #3a91e8;
  }
  margin-left: 3.5vw;
`;
