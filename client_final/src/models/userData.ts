import dayjs from "dayjs";

export type Job = {
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type Section = {
  title: string;
  content: string;
};

export type Study = {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
};

export type UserData = {
  _id: string;
  jobs: Job[];
  studies: Study[];
  skills: string[];
  otherSections: Section[];
};

export const CarrerModelProperties = [
  "company",
  "position",
  "description",
  "startDate",
  "endDate",
];

export const SectionModelProperties = ["title", "content"];

export const StudyModelProperties = [
  "institution",
  "degree",
  "startDate",
  "endDate",
];

export enum UserDataFormSections {
  Studies = "STUDIES",
  Jobs = "JOBS",
  Others = "OTHER_SECTIONS",
  Skills = "SKILLS",
}

export type UserFormData = Record<string, string | dayjs.Dayjs>;
