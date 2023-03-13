import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Link } from "react-scroll";

import {
  TimelineConnectorStyled,
  TimelineDotStyled,
  TimelineDotTextStyled,
  TimelineStyled,
} from "./styles";
import { TimelineContent } from "@mui/lab";

type Item = {
  color: string;
  title: string;
  goToId: string;
};

const timelineItems: Item[] = [
  {
    title: "Studies",
    color: "#68cf00",
    goToId: "educationSection",
  },
  {
    title: "Career",
    color: "#3a91e8",
    goToId: "careerSection",
  },
  {
    title: "Others",
    color: "#d90000",
    goToId: "othersSection",
  },
  {
    title: "Skills",
    color: "#00000DE",
    goToId: "skillsSection",
  },
];

export default function ReviewPageTimeline() {
  return (
    <TimelineStyled>
      {timelineItems.map((cureentItem, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDotStyled $color={cureentItem.color} />
            {index !== timelineItems.length - 1 ? (
              <TimelineConnectorStyled />
            ) : null}
          </TimelineSeparator>
          <TimelineContent>
            <Link to={cureentItem.goToId} spy={true} smooth={true}>
              <TimelineDotTextStyled>{cureentItem.title}</TimelineDotTextStyled>
            </Link>
          </TimelineContent>
        </TimelineItem>
      ))}
    </TimelineStyled>
  );
}
ReviewPageTimeline.displayName = "ReviewPageTimelineComponent";
