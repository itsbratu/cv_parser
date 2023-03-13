import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import {
  FormContainerStyled,
  FormContentStyled,
} from "../../../../components/FormContainer/styles";
import { Study, UserDataFormSections } from "../../../../models/userData";
import { DatesSectionStyled } from "../../../../components/DatesSection/styles";
import { DividerStyled } from "../../../../components/Divider/styles";
import dayjs from "dayjs";
import { Input } from "../../../../components/Input";
import { FormSectionTitleStyled } from "../../../../components/FormSectionTitle/styles";

export type ReviewPageEducationFormProps = {
  studies: Study[];
  control: Control<FieldValues, any>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export const ReviewPageEducationForm = ({
  studies,
  control,
  register,
}: ReviewPageEducationFormProps): JSX.Element => (
  <FormContentStyled id="educationSection">
    <FormContainerStyled>
      <FormSectionTitleStyled>Studies</FormSectionTitleStyled>
      {studies.map((currentStudy, index) => {
        const INSTITUTION_INPUT_NAME = `${UserDataFormSections.Studies}-${index}-institution`;
        const DEGREE_INPUT_NAME = `${UserDataFormSections.Studies}-${index}-degree`;
        const START_DATE_INPUT_NAME = `${UserDataFormSections.Studies}-${index}-startDate`;
        const END_DATE_INPUT_NAME = `${UserDataFormSections.Studies}-${index}-endDate`;

        return (
          <React.Fragment key={index}>
            <Input
              inputName={INSTITUTION_INPUT_NAME}
              control={control}
              register={register}
              defaultValue={currentStudy.institution}
              label={"Institution Name"}
            />
            <Input
              inputName={DEGREE_INPUT_NAME}
              control={control}
              register={register}
              defaultValue={currentStudy.degree}
              label={"Degree"}
            />
            <DatesSectionStyled>
              <Input
                inputName={START_DATE_INPUT_NAME}
                control={control}
                register={register}
                defaultValue={dayjs(currentStudy.startDate)}
                label={"Study Start Date"}
                isDatePicker
                dateFormat={["month", "year"]}
              />
              <Input
                inputName={END_DATE_INPUT_NAME}
                control={control}
                register={register}
                defaultValue={dayjs(currentStudy.endDate)}
                label={"Study End Date"}
                isDatePicker
                dateFormat={["month", "year"]}
              />
            </DatesSectionStyled>
            <DividerStyled $color={"#68cf00"} />
          </React.Fragment>
        );
      })}
    </FormContainerStyled>
  </FormContentStyled>
);
ReviewPageEducationForm.displayName = "ReviewPageEducationFormComponent";
