import { Chip } from "@mui/material";
import { FormContainerStyled } from "../../../../components/FormContainer/styles";
import { FormSectionTitleStyled } from "../../../../components/FormSectionTitle/styles";
import { ChipListWrapperStyled } from "./styles";

export type ReviewPageSkillsListProps = {
  skills: string[];
  setSelectedSkills: (skills: string[]) => void;
};

export const ReviewPageSkillsList = ({
  skills,
  setSelectedSkills,
}: ReviewPageSkillsListProps): JSX.Element => (
  <FormContainerStyled id="skillsSection">
    <FormSectionTitleStyled>Skills</FormSectionTitleStyled>
    <ChipListWrapperStyled>
      {skills.map((currentSkill, index) => (
        <Chip
          label={currentSkill}
          onDelete={() =>
            setSelectedSkills(
              skills.filter((_, skillIndex) => skillIndex !== index)
            )
          }
          key={index}
        />
      ))}
    </ChipListWrapperStyled>
  </FormContainerStyled>
);
