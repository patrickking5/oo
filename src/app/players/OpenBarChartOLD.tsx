"use client";

import { PaletteColor, Stack, Typography, useTheme } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import courseInfoJson from "../../../data/course_info.json";
import { OOToolTip } from "../stats/OOToolTip";

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

export default function OpenBarChart({
  allPlayerStats,
  colorMap,
}: {
  allPlayerStats: any;
  colorMap: any;
}) {
  const theme = useTheme();
  const playerNames = Object.keys(allPlayerStats);

  const allCourses = new Set<string>();
  Object.values(allPlayerStats).forEach((playerData: any) => {
    Object.keys(playerData.course_data).forEach((courseName) => {
      allCourses.add(courseName);
    });
  });

  const mergedData = Array.from(allCourses).map((courseName) => {
    const row: any = {
      course: courseInfo[courseName]?.short_name || courseName,
    };

    Object.entries(allPlayerStats).forEach(
      ([playerName, playerData]: any, index) => {
        const courseStats = playerData.course_data[courseName];
        row[`score${index}`] = courseStats?.avg ?? null;
      }
    );

    return row;
  });

  // Compute min/max values from score fields
  const { min, max } = mergedData.reduce(
    (acc, row) => {
      const values = Object.keys(row)
        .filter((key) => key.startsWith("score"))
        .map((key) => row[key])
        .filter((v) => v !== null);
      return {
        min: Math.min(acc.min, ...values),
        max: Math.max(acc.max, ...values),
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
      <div
        className="graph-container"
        style={{ overflowX: "auto", width: "100%" }}
      >
        <ResponsiveContainer width={"100%"} height={200}>
          <BarChart
            data={mergedData}
            // layout="vertical"
            margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
            barCategoryGap={5} // No space between rows (courses)
            barGap={0.5} // Optional: controls gap between player's bars
          >
            <YAxis
              type="number"
              stroke={grey[500]}
              fontSize={"0.8rem"}
              domain={[min - 2, max + 1]}
            />

            <XAxis
              type="category"
              dataKey="course"
              stroke={grey[300]}
              fontSize={"0.8rem"}
              // width={80}
            />

            <Tooltip content={<OOToolTip />} cursor={{ fill: "transparent" }} />

            {playerNames.map((playerName, index) => {
              const colorKey = (colorMap?.[index] ||
                "primary") as keyof typeof theme.palette;
              const paletteColor = theme.palette[colorKey] as PaletteColor;

              return (
                <Bar
                  key={playerName}
                  dataKey={`score${index}`}
                  fill={paletteColor.main}
                  name={playerName}
                  radius={[10, 10, 0, 0]}
                >
                  <LabelList
                    dataKey={`score${index}`}
                    position="inside"
                    fill={paletteColor.dark}
                    fontSize="0.8rem"
                    fontWeight={700}
                    formatter={(value: number) =>
                      value % 1 !== 0 ? value.toFixed(1) : value
                    }
                  />
                </Bar>
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Stack>
  );
}
