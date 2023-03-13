import { useState, useEffect } from "react";
import { FormSectionsWrapperStyled } from "./styles";
import { useForm } from "react-hook-form";
import { ReviewPageCareerForm } from "../ReviewPageCareerForm";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReviewPageEducationForm } from "../ReviewPageEducationForm";
import { ReviewPageOtherSectionsForm } from "../ReviewPageOtherSectionsForm";
import { ReviewPageSkillsList } from "../ReviewPageSkillsList";
import { SubmitButtonStyled } from "../../styles";
import { UserData, UserFormData } from "../../../../models/userData";
import { formatUserFormData } from "../../helpers/formatUserFormData";
import { useSubmitUserData } from "../../../../api/mutations/useSubmitUserData";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "../../../../routes";

export type ReviewPageDynamicFormProps = {
  userData: UserData;
};

export const ReviewPageDynamicForm = ({
  userData: data,
}: ReviewPageDynamicFormProps): JSX.Element => {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { mutate } = useSubmitUserData();
  const navigate = useNavigate();

  const onSubmit = (data: UserFormData) => {
    mutate({ data: formatUserFormData(data, selectedSkills) });
    navigate(ROUTER_PATHS.UPLOAD_FILE);
  };

  useEffect(() => {
    if (!data) return;
    setSelectedSkills(data.skills);
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSectionsWrapperStyled>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ReviewPageEducationForm
            register={register}
            control={control}
            errors={errors}
            studies={data.studies}
            key={"educationForm"}
          />
          <ReviewPageCareerForm
            register={register}
            control={control}
            errors={errors}
            jobs={data.jobs}
            key={"carrerFrom"}
          />
          <ReviewPageOtherSectionsForm
            control={control}
            register={register}
            errors={errors}
            otherSections={data.otherSections}
            key={"otherSectionsForm"}
          />
          <ReviewPageSkillsList
            skills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            key={"skillsForm"}
          />
          <SubmitButtonStyled variant="contained" size="medium" type="submit">
            Submit
          </SubmitButtonStyled>
        </LocalizationProvider>
      </FormSectionsWrapperStyled>
    </form>
  );
};
ReviewPageDynamicForm.displayName = "ReviewPageDynamicFormComponent";
