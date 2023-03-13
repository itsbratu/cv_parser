import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import TextField from "@mui/material/TextField";
import { DatePicker, DateView } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

const MIN_LINES = 1;
const MAX_LINES = 50;

export type InputProps = {
  inputName: string;
  defaultValue: string | Dayjs;
  label: string;
  control: Control<FieldValues, any>;
  register: UseFormRegister<FieldValues>;
  isMultilineInput?: boolean;
  isDatePicker?: boolean;
  dateFormat?: DateView[];
};

export const Input = ({
  inputName,
  defaultValue,
  label,
  control,
  register,
  isMultilineInput,
  isDatePicker,
  dateFormat,
}: InputProps): JSX.Element => (
  <Controller
    name={inputName}
    control={control}
    defaultValue={defaultValue}
    render={({ field: { value, onChange } }) =>
      isDatePicker ? (
        <DatePicker
          views={dateFormat}
          label={label}
          value={value}
          onChange={onChange}
          key={inputName}
        />
      ) : (
        <>
          <TextField
            value={value}
            label={label}
            multiline={isMultilineInput}
            maxRows={isMultilineInput ? MAX_LINES : MIN_LINES}
            {...register(inputName, {
              minLength: 1,
            })}
            required
            key={inputName}
          />
        </>
      )
    }
  />
);
