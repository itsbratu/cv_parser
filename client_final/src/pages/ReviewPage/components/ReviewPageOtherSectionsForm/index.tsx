import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { FormContainerStyled } from "../../../../components/FormContainer/styles";
import { Section, UserDataFormSections } from "../../../../models/userData";
import { DividerStyled } from "../../../../components/Divider/styles";
import { Input } from "../../../../components/Input";
import { FormSectionTitleStyled } from "../../../../components/FormSectionTitle/styles";

export type ReviewPageOtherSectionsFormProps = {
  otherSections: Section[];
  control: Control<FieldValues, any>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export const ReviewPageOtherSectionsForm = ({
  otherSections,
  control,
  register,
}: ReviewPageOtherSectionsFormProps): JSX.Element => (
  <FormContainerStyled id="othersSection">
    <FormSectionTitleStyled>Others</FormSectionTitleStyled>
    {otherSections.map((currentSection, index) => {
      const TITLE_INPUT_NAME = `${UserDataFormSections.Others}-${index}-title`;
      const CONTENT_INPUT_NAME = `${UserDataFormSections.Others}-${index}-content`;

      return (
        <React.Fragment key={index}>
          <Input
            inputName={TITLE_INPUT_NAME}
            control={control}
            register={register}
            defaultValue={currentSection.title}
            label={"Title"}
          />
          <Input
            inputName={CONTENT_INPUT_NAME}
            control={control}
            register={register}
            defaultValue={currentSection.content}
            label={"Content"}
            isMultilineInput
          />
          <DividerStyled $color={"#d90000"} />
        </React.Fragment>
      );
    })}
  </FormContainerStyled>
);
ReviewPageOtherSectionsForm.displayName =
  "ReviewPageOtherSectionsFormComponent";
