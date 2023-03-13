import dayjs from "dayjs";
import {
  UserDataFormSections,
  UserFormData,
  CarrerModelProperties,
  StudyModelProperties,
  SectionModelProperties,
  Job,
  Study,
  Section,
  UserData,
} from "../../../models/userData";

function changeObjectValueByProperty<O extends Object, K extends keyof O>(
  object: O,
  key: K,
  value: O[K]
) {
  object[key] = value;
}

const generateEmptyEntryBasedOnSection = (
  sectionType: UserDataFormSections
) => {
  switch (sectionType) {
    case UserDataFormSections.Studies:
      return {
        institution: "",
        degree: "",
        startDate: "",
        endDate: "",
      } as Study;
    case UserDataFormSections.Jobs:
      return {
        company: "",
        description: "",
        position: "",
        startDate: "",
        endDate: "",
      } as Job;
    case UserDataFormSections.Others:
      return {
        title: "",
        content: "",
      } as Section;
    default:
      return {};
  }
};

const formatUserDataSection = (
  data: UserFormData,
  sectionType: UserDataFormSections
) => {
  const formattedData = [];
  const formattedSectionData = Object.keys(data)
    .filter((key) => key.includes(sectionType))
    .map((formInputName) => ({
      key: formInputName,
      value: data[formInputName],
    }));
  if (sectionType === UserDataFormSections.Others)
    console.log(formattedSectionData);
  var currentIndex = 0;
  const sectionModelProperties =
    sectionType === UserDataFormSections.Studies
      ? StudyModelProperties
      : sectionType === UserDataFormSections.Jobs
      ? CarrerModelProperties
      : SectionModelProperties;
  const intervalSize = sectionModelProperties.length;
  while (currentIndex < formattedSectionData.length) {
    const currentEntryFields = formattedSectionData.slice(
      currentIndex,
      currentIndex + intervalSize
    );
    const createdEntry = generateEmptyEntryBasedOnSection(sectionType);
    sectionModelProperties.forEach((currentProperty, index) => {
      const currentPropertyValue = currentEntryFields[index].value;
      const currentPropertyAsJobType = currentProperty as keyof Job;
      const currentPropertyAsStudyType = currentProperty as keyof Study;
      const currentPropertyAsSectionType = currentProperty as keyof Section;
      changeObjectValueByProperty(
        createdEntry,
        sectionType === UserDataFormSections.Jobs
          ? (currentPropertyAsJobType as never)
          : sectionType === UserDataFormSections.Studies
          ? (currentPropertyAsStudyType as never)
          : (currentPropertyAsSectionType as never),
        dayjs(currentPropertyValue) instanceof dayjs
          ? (currentPropertyValue.toString() as never)
          : (currentPropertyValue as string as never)
      );
    });
    if (createdEntry !== undefined) formattedData.push(createdEntry);
    currentIndex += intervalSize;
  }
  return formattedData;
};

export const formatUserFormData = (
  data: UserFormData,
  skills: string[]
): UserData => {
  return {
    jobs: formatUserDataSection(data, UserDataFormSections.Jobs) as Job[],
    studies: formatUserDataSection(
      data,
      UserDataFormSections.Studies
    ) as Study[],
    otherSections: formatUserDataSection(
      data,
      UserDataFormSections.Others
    ) as Section[],
    skills,
  };
};
