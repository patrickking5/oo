import courseInfoJson from "../../../data/course_info.json";

type CourseInfo = {
  [key: string]: {
    par: number;
    short_name: string;
  };
};

const courseInfo: CourseInfo = courseInfoJson;

export const getShortCourseName = (courseName: string): string => {
  return courseInfo[courseName]?.short_name;
};
