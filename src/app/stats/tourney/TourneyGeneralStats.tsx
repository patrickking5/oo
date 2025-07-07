import ComponentTypography from "@/components/ComponentTypography";
import { TourneyStatsProps } from "@/types/tourney_types"; // Use alias `@/` for cleaner imports
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import * as React from "react";
import courseInfoJson from "../../../../data/course_info.json";
import { DividerPointer } from "../DividerPointer";

type CourseInfo = {
  [key: string]: {
    par: number;
    short_name: string;
  };
};

const courseInfo: CourseInfo = courseInfoJson;

interface StatKPIProps {
  primaryValue: number | string;
  secondaryValue?: number | string | null;
  subText: string;
  backgroundColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  pointUp?: boolean;
  equals?: boolean;
}

const StatKPI: React.FC<StatKPIProps> = ({
  primaryValue,
  secondaryValue = null,
  subText = "",
  backgroundColor = "black",
  primaryColor = "white",
  secondaryColor = "primary.main",
  pointUp = true,
  equals = false,
}) => {
  return (
    <Stack spacing={-0.5}>
      <Stack
        spacing={0}
        justifyContent={"center"}
        alignItems={"center"}
        // direction={"row"}
      >
        <Typography variant="h1" sx={{ color: "primary2.light" }}>
          {primaryValue}
        </Typography>
        {secondaryValue ? (
          <DividerPointer pointUp={pointUp} equals={equals} />
        ) : null}
        {secondaryValue ? (
          <Typography
            variant="h2"
            sx={{
              color: secondaryColor,
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            {secondaryValue}
          </Typography>
        ) : null}
      </Stack>

      <Typography variant="caption">{subText}</Typography>
    </Stack>
  );
};

export default function TourneyGeneralStats({ Tstats }: TourneyStatsProps) {
  const first_col = "#ffe34d";
  const second_col = "#a6a6a6";
  const third_col = "#dca570";

  const theme = useTheme();

  return (
    <Box
      sx={{
        border: 0.5,
        px: 1,
        bgcolor: "primary2.dark",
        borderRadius: 3,
        borderColor: "primary2.main",
      }}
    >
      <ComponentTypography title={"Oll Open Stats"} />

      <TableContainer>
        <Table size="small" sx={{ border: 0 }}>
          <TableBody>
            <TableRow sx={{ bgcolor: "primary2.dark" }}>
              <TableCell
                align="center"
                sx={{ p: 0, border: 0, pb: 1, width: 80 }}
              >
                <StatKPI primaryValue={Tstats.num_opens} subText="Opens" />
              </TableCell>
              <TableCell
                align="center"
                sx={{ p: 0, border: 0, pb: 1, width: 80 }}
              >
                <StatKPI primaryValue={Tstats.average_score} subText="Avg" />
              </TableCell>
              <TableCell
                align="center"
                sx={{ p: 0, border: 0, pb: 1, width: 80 }}
              >
                <StatKPI
                  primaryValue={Tstats.num_rounds.toLocaleString()}
                  subText="Rounds"
                />
              </TableCell>
              <TableCell
                align="center"
                sx={{ p: 0, border: 0, pb: 1, width: 80 }}
              >
                <StatKPI
                  primaryValue={Tstats.num_strokes.toLocaleString()}
                  subText="Total Strokes"
                />
              </TableCell>
            </TableRow>
            <TableRow sx={{ bgcolor: "primary2.dark" }}>
              <TableCell
                align="center"
                sx={{ p: 0, border: 0, pb: 1, width: 80 }}
              >
                <StatKPI
                  primaryValue={Tstats.unique_players.length}
                  subText="Players"
                />
              </TableCell>
              <TableCell
                align="center"
                sx={{ p: 0, border: 0, pb: 1, width: 80 }}
              >
                <StatKPI
                  primaryValue={Object.keys(Tstats.champions).length}
                  subText="Champs"
                />
              </TableCell>
              <TableCell
                align="center"
                sx={{ p: 0, border: 0, pb: 1, width: 80 }}
              >
                <StatKPI
                  primaryValue={Object.keys(courseInfo).length}
                  subText="Courses"
                />
              </TableCell>
              <TableCell
                align="center"
                sx={{ p: 0, border: 0, pb: 1, width: 80 }}
              >
                <StatKPI
                  primaryValue={String.fromCharCode(0x221e)}
                  subText="Fun"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
