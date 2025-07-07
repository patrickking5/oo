import { DividerPointer } from "@/app/stats/DividerPointer";
import ComponentTypography from "@/components/ComponentTypography";
import { IndividualTournamentData } from "@/types";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import * as React from "react";
import courseInfoJson from "../../../../data/course_info.json";

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
  secondaryColor = "secondary.main",
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
        <Typography variant="h1">{primaryValue}</Typography>
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

interface YearDetailsProps {
  year_data: IndividualTournamentData; // Explicitly typing year_data as IndividualTournamentData
}

export default function YearDetails({ year_data }: YearDetailsProps) {
  const isSm = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        border: 0.5,
        borderColor: "primary2.main",
        p: 0.5,
        bgcolor: "primary2.dark",
        color: "primary2.light",
        borderRadius: 3,
        my: { xs: 2, md: 0 },
      }}
    >
      <ComponentTypography title={`${year_data.year} Field Stats`} />

      <TableContainer>
        <Table size="small" sx={{ border: 0, bgcolor: "primary2.dark" }}>
          <TableBody>
            <TableRow sx={{ bgcolor: "primary2.dark" }}>
              <TableCell
                align="center"
                sx={{ p: 0, border: 0, pb: 1, width: 80 }}
              >
                <StatKPI
                  primaryValue={
                    year_data.stats.t_num_full_players +
                    year_data.stats.t_num_partial_players
                  }
                  subText="Total Players"
                />
              </TableCell>
              <TableCell
                align="center"
                sx={{ p: 0, border: 0, pb: 1, width: 80 }}
              >
                <StatKPI
                  primaryValue={year_data.stats.t_avg_round_score}
                  subText="Avg"
                />
              </TableCell>
              <TableCell
                align="center"
                sx={{ p: 0, border: 0, pb: 1, width: 80 }}
              >
                <StatKPI
                  primaryValue={year_data.stats.t_total_strokes.toLocaleString()}
                  subText="Strokes"
                />
              </TableCell>
            </TableRow>
            <TableRow sx={{ bgcolor: "primary2.dark" }}>
              {year_data.stats.t_avg_round_scores.map((score, index) =>
                score > 0 ? (
                  <TableCell
                    sx={{ p: 0, pb: 0.5, border: 0 }}
                    align="center"
                    key={index}
                  >
                    <StatKPI
                      primaryValue={score}
                      subText={`R${index + 1} Avg`}
                    />
                    <Typography variant="caption">
                      {isSm
                        ? `(${
                            courseInfo[year_data.courses[index]]?.short_name
                          })`
                        : `(${year_data.courses[index]})`}
                    </Typography>
                  </TableCell>
                ) : null
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
