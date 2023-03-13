import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  faFilePdf,
  faFileWord,
  faFileImage,
} from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { Nullable } from "../../models/globalTypes";
import {
  ButtonStyled,
  FileFormatIconActiveStyled,
  FilePickerContentStyled,
  FilePickerIconsWrapperStyled,
  FilePickerInputStyled,
  FilePickerSectionWrapperStyled,
  FilePickerSubTitleStyled,
  FilePickerTitleStyled,
  FilePickerWrapperStyled,
} from "./styles";

type FilePickerProps = {
  /** Internally used to identify file picker input component */
  id?: string;
  /** Explanatory text to be rendered  */
  title: string;
  /** Additional explanatory text to be rendered under the title */
  subTitle: string;
  /** Label for the upload action button */
  uploadText: string;
  /**
   * String containing all possible file MIME types that are accepted
   * @default application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
   */
  fileFormats?: string[];
  /** Callback function fired when upload action button was pressed or file was dropped on the dropzone. */
  onUpload: (file: File) => void;
  /** Callback function fired when the file MIME type validation failed */
  onValidationError?: (file: File) => void;
};

const DEFAULT_UPLOAD_INPUT_ID = "file-upload-picker";
const DEFAULT_FILE_FORMATS = [
  ".doc",
  ".pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  ".docx,application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
];

/**
 * @component
 *
 * File Pickers allows users to quickly select a locally stored file by either clicking on a button
 * or dropping the file on a predefined dropzone.
 */
export const FilePicker = ({
  id = DEFAULT_UPLOAD_INPUT_ID,
  title,
  subTitle,
  uploadText,
  fileFormats = DEFAULT_FILE_FORMATS,
  onUpload,
  onValidationError,
}: FilePickerProps): JSX.Element => {
  const [isDragActive, setDragActive] = useState(false);
  const inputPickerRef = useRef<Nullable<HTMLInputElement>>(null);

  const processFileUpload = (file: File) => {
    const isAcceptedFormat = fileFormats.includes(file.type);
    setDragActive(false);

    isAcceptedFormat ? onUpload(file) : onValidationError?.(file);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];

    if (file) processFileUpload(file);
  };

  const handleFileDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];

    processFileUpload(file);
  };

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    }
    if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleButtonClick = () => inputPickerRef.current?.click();

  return (
    <FilePickerSectionWrapperStyled>
      <FilePickerIconsWrapperStyled>
        <FileFormatIconActiveStyled icon={faFilePdf} />
        <FileFormatIconActiveStyled icon={faFileWord} />
        <FileFormatIconActiveStyled icon={faFileImage} />
      </FilePickerIconsWrapperStyled>
      <FilePickerWrapperStyled
        onDrop={handleFileDrop}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
      >
        <FilePickerContentStyled>
          <FilePickerTitleStyled variant="subtitle1">
            {title}
          </FilePickerTitleStyled>
          <FilePickerSubTitleStyled variant="body1">
            {subTitle}
          </FilePickerSubTitleStyled>
          <ButtonStyled
            variant="contained"
            size="medium"
            onClick={handleButtonClick}
            disabled={isDragActive}
          >
            <AttachFileIcon />
            {uploadText}
          </ButtonStyled>
          <FilePickerInputStyled
            type="file"
            ref={inputPickerRef}
            id={id}
            name={id}
            accept={fileFormats.join()}
            onChange={handleFileChange}
          />
        </FilePickerContentStyled>
      </FilePickerWrapperStyled>
    </FilePickerSectionWrapperStyled>
  );
};
FilePicker.displayName = "FilePickerComponent";
