"use client";

import { Stack, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import courseInfoJson from "../../../data/course_info.json";
import { OOToolTip } from "./OOToolTip";

type CourseInfo = {
  [key: string]: {
    par: number;
    short_name: string;
  };
};

const courseInfo: CourseInfo = courseInfoJson;

interface CourseStats {
  scores: number[];
  num_rounds: number;
  avg: number;
  total_strokes: number;
}

interface CourseStatsChartProps {
  courseData: { [courseName: string]: CourseStats }; // courseData is now an object
}

interface CourseBarChartProps {
  all_player_stats: Record<string, any>;
  colorMap: string[];
}

export default function OOBarChart({
  courseData,
  course2Data = null,
}: {
  courseData: any;
  course2Data: any | null;
}) {
  const theme = useTheme();

  // Collect all course names, only include course2Data if it exists
  const allCourses = Array.from(
    new Set([
      ...Object.keys(courseData),
      ...(course2Data ? Object.keys(course2Data) : []),
    ])
  ).sort();

  // Merge data based on common courses (if the checkbox is checked)
  let mergedData = allCourses
    .map((course) => {
      const entry1 = courseData[course];
      const entry2 = course2Data ? course2Data[course] : null;

      return {
        course: courseInfo[course]?.short_name,
        average_score: entry1 ? entry1.avg : null,
        secondary_score: entry2 ? entry2.avg : null,
      };
    })
    .sort((a, b) => a.average_score - b.average_score);
  // console.log(mergedData);

  // const chartData = Object.keys(courseData)
  //   .map((course) => ({
  //     name: courseInfo[course]?.short_name, // Course name
  //     avgScore: courseData[course].avg, // Average score
  //     numRounds: courseData[course].num_rounds, // Number of rounds
  //   }))
  //   .sort((a, b) => a.avgScore - b.avgScore);

  // Compute min/max values for the y-axis
  // const { min, max } = chartData.reduce(
  //   (acc, point) => ({
  //     min: Math.floor(Math.min(acc.min, point.avgScore)),
  //     max: Math.ceil(Math.max(acc.max, point.avgScore)),
  //   }),
  //   { min: Infinity, max: -Infinity }
  // );

  // Compute min/max values dynamically from merged data
  const { min, max } = mergedData.reduce(
    (acc, point) => {
      const values = [point.average_score, point.secondary_score].filter(
        (v) => v !== null
      );
      return {
        min: Math.floor(Math.min(acc.min, ...values)),
        max: Math.ceil(Math.max(acc.max, ...values)),
      };
    },
    { min: Infinity, max: -Infinity }
  );

  return (
    <Stack
      spacing={0}
      sx={{
        border: 0.5,
        px: 1,
        bgcolor: "primary2.dark",
        borderRadius: 3,
        borderColor: "primary2.main",
      }}
    >
      {/* Chart Title */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          mb: 0.75,
          color: "primary2.dark",
          borderBottom: 1,
          borderColor: "primary2.main",
        }}
      >
        <Typography align="left" variant="h3" sx={{ color: "primary2.light" }}>
          Avg Score by Course
        </Typography>
      </Stack>

      <ResponsiveContainer
        width={"100%"}
        height={Math.max(200, mergedData.length * 40)}
      >
        <BarChart
          data={mergedData}
          layout="vertical"
          margin={{ top: 5, right: 20, left: -5, bottom: 5 }}
          barCategoryGap={5}
        >
          <XAxis
            type="number"
            dataKey="average_score"
            stroke={grey[500]}
            fontSize={"0.8rem"}
            domain={[min - 2, max + 1]}
          />
          <YAxis
            type="category"
            dataKey="course"
            stroke={grey[500]}
            fontSize={"0.8rem"}
            width={80} // Adjust width if needed
          />
          <Tooltip content={<OOToolTip />} cursor={{ fill: "transparent" }} />

          <Bar
            dataKey="average_score"
            fill={theme.palette.primary.main}
            name="Average Score"
            radius={[0, 10, 10, 0]}
          >
            <LabelList
              dataKey="average_score"
              position="inside"
              fill={theme.palette.primary.dark}
              fontSize="0.8rem"
              fontWeight={700}
              formatter={(value: number) =>
                value % 1 !== 0 ? value.toFixed(1) : value
              }
            />
          </Bar>

          {course2Data && (
            <Bar
              dataKey="secondary_score"
              fill={theme.palette.secondary.main}
              name="Secondary Score"
            >
              <LabelList
                dataKey="secondary_score"
                position="center"
                fill={theme.palette.secondary.dark}
                fontSize="0.7rem"
                fontWeight={700}
                formatter={(value: number) =>
                  value % 1 !== 0 ? value.toFixed(1) : value
                }
              />
            </Bar>
          )}
        </BarChart>
      </ResponsiveContainer>
    </Stack>
  );
}
