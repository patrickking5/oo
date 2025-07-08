"use client";

import ComponentTypography from "@/components/ComponentTypography";
import {
  Box,
  PaletteColor,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import courseInfoJson from "../../../data/course_info.json";
import { getShortPlayerName } from "../utils/getShortPlayerName";

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

    Object.entries(allPlayerStats).forEach(([playerName, playerData]: any) => {
      const courseStats = playerData.course_data[courseName];
      row[playerName] = courseStats ?? null; // full object instead of just .avg
    });

    return row;
  });

  const { min, max } = mergedData.reduce(
    (acc, row) => {
      const values = Object.keys(row)
        .filter((key) => playerNames.includes(key))
        .map((key) => row[key]?.avg)
        .filter((v) => typeof v === "number");
      return {
        min: Math.min(acc.min, ...values),
        max: Math.max(acc.max, ...values),
      };
    },
    { min: Infinity, max: -Infinity }
  );

  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) ? max : 100;
  const barMin = safeMin - 3;
  const barMax = safeMax + 1;

  return (
    <Stack
      spacing={0}
      sx={{
        position: "relative", // ✅ creates stacking context
        zIndex: 0,
        overflowX: "hidden", // prevent horizontal scroll

        border: 0.5,
        px: 1,
        bgcolor: "primary2.dark",
        borderRadius: 3,
        borderColor: "primary2.main",
      }}
    >
      {/* Chart Title */}
      <ComponentTypography title={"Course Stats"} />

      {mergedData.map((courseStats, index) => {
        // const colorKey = (colorMap?.[index] ||
        //   "primary") as keyof typeof theme.palette;
        // const paletteColor = theme.palette[colorKey] as PaletteColor;

        return (
          <TableContainer
            key={index}
            sx={{
              borderBottom: 3,
              overflowX: "hidden",

              width: "100%",
              // mt: 0.5,
              borderRadius: 0,
              borderColor: "primary2.main",
              backgroundColor: "primary2.dark",
            }}
          >
            <Table
              size="small"
              sx={{
                mx: 0.5,
                my: 1,
                tableLayout: "fixed",
                width: "100%",
                backgroundColor: "primary2.dark",
              }}
            >
              <TableHead sx={{ backgroundColor: "primary2.dark" }}>
                <TableRow sx={{ backgroundColor: "primary2.dark" }}>
                  <TableCell
                    colSpan={1}
                    align="left"
                    sx={{ p: 0, border: 0, width: 80 }}
                  >
                    <Typography variant="h4">{courseStats.course}</Typography>
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{ p: 0, border: 0 }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      AVG
                    </Typography>
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{ p: 0, border: 0, width: 60 }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      Rounds
                    </Typography>
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{ p: 0, border: 0, width: 80 }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      Strokes
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "primary2.dark" }}>
                {playerNames.map((playerName, index2) => {
                  const playerCourseStats = courseStats[playerName];
                  if (!playerCourseStats) return null;

                  const { avg, num_rounds, total_strokes } = playerCourseStats;
                  const colorKey = (colorMap?.[index2] ||
                    "primary") as keyof typeof theme.palette;
                  const paletteColor = theme.palette[colorKey] as PaletteColor;

                  return (
                    <TableRow key={playerName}>
                      <TableCell sx={{ p: 0, border: 0 }}>
                        <Typography
                          variant="caption"
                          sx={{ color: `${colorMap[index2]}.light` }}
                        >
                          {getShortPlayerName(playerName)}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ p: 0, border: 0 }}>
                        <Box
                          sx={{
                            width: "100%",
                            height: 20,
                            bgcolor: "grey.800",
                            position: "relative",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              height: "100%",
                              borderTopRightRadius: 3,
                              borderBottomRightRadius: 3,
                              // bgcolor: `${colorMap[index2]}.main`,
                              background: `linear-gradient(to right, ${paletteColor.dark}, ${paletteColor.main})`,

                              width: `${
                                avg != null
                                  ? ((avg - barMin) / (barMax - barMin)) * 100
                                  : 0
                              }%`,

                              transition: "width 0.5s",
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              position: "absolute",
                              pl: 0.2,
                              fontWeight: 700,
                              color: avg
                                ? `${colorMap[index2]}.light`
                                : "grey.500",
                              zIndex: 1,
                            }}
                          >
                            {Math.round(avg * 10) / 10}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center" sx={{ p: 0, border: 0 }}>
                        <Typography
                          variant="h4"
                          sx={{ color: `${colorMap[index2]}.light` }}
                        >
                          {num_rounds}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ p: 0, border: 0 }}>
                        <Typography
                          variant="h4"
                          sx={{ color: `${colorMap[index2]}.light` }}
                        >
                          {total_strokes.toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        );
      })}
    </Stack>
  );
}
