import { Box, Typography, Button, styled } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FilePickerWrapperStyled = styled(Box)`
  background-color: white;
  padding-top: 5vh;
  padding-bottom: 5vh;
  border-radius: 40px;
  width: 70vw;
`;

export const FilePickerContentStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 2px dashed #3a91e8;
  border-radius: 24px;
  padding: 12vh 1vw;
`;

export const FilePickerTitleStyled = styled(Typography)`
  font-size: 1.25vw;
  padding-bottom: 4px;
  font-weight: 500;
`;

export const FilePickerSubTitleStyled = styled(Typography)`
  font-size: 1vw;
  padding-bottom: 1.25vh;
`;

export const ButtonStyled = styled(Button)`
  margin-top: 1.25vh;
  text-transform: none;
  font-size: 0.85vw;
  background-color: #3a91e8;
  &:hover {
    background-color: #3a91e8;
  }
`;

export const FilePickerInputStyled = styled("input")`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export const FilePickerSectionWrapperStyled = styled(Box)`
  display: flex;
  margin-right: 2.25vw;
`;

export const FileFormatIconActiveStyled = styled(FontAwesomeIcon)`
  font-size: 5vh;
  color: #3a91e8;
`;

export const FilePickerIconsWrapperStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  padding-top: 6vh;
  padding-right: 0.75vw;
`;
