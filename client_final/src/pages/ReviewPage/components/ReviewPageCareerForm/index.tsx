import React from "react";
import { Job, UserDataFormSections } from "../../../../models/userData";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { DividerStyled } from "../../../../components/Divider/styles";
import { DatesSectionStyled } from "../../../../components/DatesSection/styles";
import { FormContainerStyled } from "../../../../components/FormContainer/styles";
import { Input } from "../../../../components/Input";
import dayjs from "dayjs";
import { FormSectionTitleStyled } from "../../../../components/FormSectionTitle/styles";

export type ReviewPageCareerFormProps = {
  jobs: Job[];
  control: Control<FieldValues, any>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export const ReviewPageCareerForm = ({
  jobs,
  control,
  register,
}: ReviewPageCareerFormProps): JSX.Element => (
  <FormContainerStyled id="careerSection">
    <FormSectionTitleStyled>Career</FormSectionTitleStyled>
    {jobs.map((currentJob, index) => {
      const COMPANY_INPUT_NAME = `${UserDataFormSections.Jobs}-${index}-company`;
      const POSITION_INPUT_NAME = `${UserDataFormSections.Jobs}-${index}-position`;
      const DESCRIPTION_INPUT_NAME = `${UserDataFormSections.Jobs}-${index}-description`;
      const START_DATE_INPUT_NAME = `${UserDataFormSections.Jobs}-${index}-startDate`;
      const END_DATE_INPUT_NAME = `${UserDataFormSections.Jobs}-${index}-endDate`;

      return (
        <React.Fragment key={index}>
          <Input
            inputName={COMPANY_INPUT_NAME}
            control={control}
            register={register}
            defaultValue={currentJob.company}
            label={"Company Name"}
            key={COMPANY_INPUT_NAME}
          />
          <Input
            inputName={POSITION_INPUT_NAME}
            control={control}
            register={register}
            defaultValue={currentJob.position}
            label={"Job Position"}
            key={POSITION_INPUT_NAME}
          />
          <Input
            inputName={DESCRIPTION_INPUT_NAME}
            control={control}
            register={register}
            defaultValue={currentJob.description}
            label={"Job Description"}
            isMultilineInput
            key={DESCRIPTION_INPUT_NAME}
          />
          <DatesSectionStyled>
            <Input
              inputName={START_DATE_INPUT_NAME}
              control={control}
              register={register}
              defaultValue={dayjs(currentJob.startDate)}
              label={"Job Start Date"}
              isDatePicker
              dateFormat={["year", "month"]}
              key={START_DATE_INPUT_NAME}
            />
            <Input
              inputName={END_DATE_INPUT_NAME}
              control={control}
              register={register}
              defaultValue={dayjs(currentJob.endDate)}
              label={"Job End Date"}
              isDatePicker
              dateFormat={["year", "month"]}
              key={END_DATE_INPUT_NAME}
            />
          </DatesSectionStyled>
          <DividerStyled $color={"#3a91e8"} />
        </React.Fragment>
      );
    })}
  </FormContainerStyled>
);
ReviewPageCareerForm.displayName = "ReviewPageCareerFormComponent";
