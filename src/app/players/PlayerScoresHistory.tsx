import { getShortCourseName } from "@/app/utils/getShortCourseName";
import { getShortPlayerName } from "@/app/utils/getShortPlayerName";
import ComponentTypography from "@/components/ComponentTypography";
import { EmojiEvents } from "@mui/icons-material";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import * as React from "react";

const RankTypography: React.FC<any> = ({
  player,
  currentColor,
  variant = "body1",
}) => {
  return (
    <Stack
      direction={"row"}
      spacing={0}
      alignItems={"center"}
      sx={{
        // p: 0.5,
        px: 0.5,
        bgcolor: player?.rank == "1st" ? `${currentColor}.dark` : null,
        border: player?.rank == "1st" ? 1 : 0,
        borderColor: `${currentColor}.main`,
        // borderLeft: player?.rank == "1st" ? 2 : 0,
        // borderRight: player?.rank == "1st" ? 2 : 0,
        borderRadius: 2,
        // borderColor: secondaryColor,
      }}
    >
      {player?.rank == "1st" ? (
        <EmojiEvents
          sx={{
            // lineHeight: 1,
            pr: 0.25,
            verticalAlign: "center",
            fontSize: "1.1rem",
            color: `${currentColor}.light`,
          }}
        />
      ) : null}
      <Typography
        variant={variant}
        sx={{
          // lineHeight: 1,
          // p: 0.5,
          color: player?.rank[0] === "-" ? `grey.600` : `${currentColor}.light`,
          display: "flex",
          fontWeight: player?.rank == "1st" ? 900 : 400,

          alignItems: "center",
          verticalAlign: "center",
        }}
      >
        {player?.rank[0] === "-" ? "---" : player?.rank}
      </Typography>
    </Stack>
  );
};

const ScoreTypography: React.FC<any> = ({
  player,
  roundIndex,
  currentColor,

  variant = "body1",
}) => {
  return (
    <>
      {player?.rounds[roundIndex] ? (
        <Typography
          variant={variant}
          sx={{
            color:
              player.rounds[roundIndex].score > 0
                ? `grey.600`
                : `${currentColor}.main`,
            fontStyle: "normal",
          }}
        >
          {player.rounds[roundIndex].score > 0
            ? player.rounds[roundIndex].score
            : "---"}
        </Typography>
      ) : (
        <Typography sx={{ color: `${currentColor}.dark` }}></Typography>
      )}
    </>
  );
};

const TotalAvgTypography: React.FC<any> = ({
  player,
  primaryColor = "white",
  secondaryColor = grey[500],
  variant = "body1",
}) => {
  return (
    <Stack spacing={0.5} direction={"row"} alignItems={"center"}>
      <Typography
        variant={variant}
        sx={{
          fontWeight: 700,
          color: player.total_score > 0 ? primaryColor : secondaryColor,
        }}
      >
        {player.total_score > 0 ? player.total_score : "---"}
      </Typography>
      <Typography
        variant={variant}
        sx={{
          fontSize: { xs: "0.6rem", sm: "0.8rem" },
          color: secondaryColor,
        }}
      >
        ({player.average_score})
      </Typography>
    </Stack>
  );
};

export default function PlayersScoresHistory({
  isXs,
  all_player_stats,
  colorMap,
}: any) {
  // console.log(player_opens_data);
  // Merge data by year
  console.log(all_player_stats);
  const mergedDataByYear: Record<string, Record<string, any>> = {};

  Object.entries(all_player_stats).forEach(([playerName, playerData]: any) => {
    if (!Array.isArray(playerData.player_opens_data)) return;

    playerData.player_opens_data.forEach((entry: any) => {
      const year = entry.year.toString();
      if (!mergedDataByYear[year]) {
        mergedDataByYear[year] = {};
      }
      mergedDataByYear[year][playerName] = entry;
    });
  });

  const sortedYears = Object.keys(mergedDataByYear).sort(
    (a, b) => Number(b) - Number(a)
  );

  // const sortedYears = Object.keys(mergedDataByYear).sort(
  //   (a, b) => Number(b) - Number(a)
  // );
  const playerNames = Object.keys(all_player_stats);

  // console.log(sortedData);
  return (
    <TableContainer
      sx={{
        border: 0.5,
        px: 0.5,
        bgcolor: "primary2.dark",
        borderRadius: 3,
        borderColor: "primary2.main",
      }}
    >
      <Table size="small">
        <TableHead sx={{ backgroundColor: "primary2.dark" }}>
          <TableRow>
            <TableCell sx={{ p: 0, border: 0 }} colSpan={6}>
              <ComponentTypography title={"All Results"} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: "primary2.dark" }}>
          {sortedYears.map((year) => {
            const yearData = mergedDataByYear[year];

            return (
              <TableRow
                key={year}
                sx={{
                  borderBottom: 3,
                  borderColor: "primary2.main",
                }}
              >
                {/* Year Column */}
                <TableCell sx={{ width: 50 }}>
                  <Stack spacing={0.25}>
                    <Typography variant="h4" sx={{ color: "primary2.light" }}>
                      {year}
                    </Typography>

                    {playerNames.map((playerName, i) => {
                      if (!yearData[playerName]) return null;

                      return (
                        <Typography
                          variant="caption"
                          key={playerName}
                          sx={{
                            color: `${colorMap[i]}.light`,
                          }}
                        >
                          {getShortPlayerName(playerName)}
                        </Typography>
                      );
                    })}
                  </Stack>
                </TableCell>

                {/* Rank Column */}
                <TableCell
                  align="center"
                  sx={{ verticalAlign: "bottom", px: 0 }}
                >
                  <Stack spacing={0.25} alignItems="center">
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: { xs: "0.65rem" },
                        color: "primary2.light",
                        // width: "100%",
                        borderBottom: 0.5,
                        borderColor: "primary2.main",
                      }}
                    >
                      Place
                    </Typography>
                    {playerNames.map((playerName, i) => {
                      const playerData = yearData[playerName];
                      if (!playerData) return null;

                      return (
                        <RankTypography
                          key={playerName}
                          player={playerData}
                          currentColor={colorMap[i]}
                          variant={"caption"}
                        />
                      );
                    })}
                  </Stack>
                </TableCell>

                {/* Rounds */}
                {[0, 1, 2].map((roundIndex) => {
                  const firstPlayerWithData = playerNames.find(
                    (playerName) => yearData[playerName]
                  );

                  const courseName =
                    firstPlayerWithData &&
                    yearData[firstPlayerWithData]?.rounds?.[roundIndex]?.course;

                  return (
                    <TableCell
                      key={roundIndex}
                      align="center"
                      sx={{ verticalAlign: "bottom", px: 0 }}
                    >
                      <Stack spacing={0.25} alignItems="center">
                        {courseName ? (
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: { xs: "0.65rem" },
                              color: "primary2.light",
                              width: "100%",
                              borderBottom: 0.5,
                              borderColor: "primary2.main",
                            }}
                          >
                            {getShortCourseName(courseName)}
                          </Typography>
                        ) : null}

                        {playerNames.map((playerName, i) => {
                          const playerData = yearData[playerName];
                          if (!playerData) return null;

                          return (
                            <ScoreTypography
                              key={playerName}
                              player={playerData}
                              roundIndex={roundIndex}
                              currentColor={colorMap[i]}
                              variant={"caption"}
                            />
                          );
                        })}
                      </Stack>
                    </TableCell>
                  );
                })}

                {/* Total/Avg */}
                <TableCell align="left" sx={{ verticalAlign: "bottom", px: 0 }}>
                  <Stack spacing={0.25}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: { xs: "0.65rem" },
                        color: "primary2.light",
                        // width: "100%",
                        borderBottom: 0.5,
                        borderColor: "primary2.main",
                      }}
                    >
                      Total (Avg)
                    </Typography>
                    {playerNames.map((playerName, i) => {
                      const playerData = yearData[playerName];
                      if (!playerData) return null;

                      return (
                        <TotalAvgTypography
                          key={playerName}
                          player={playerData}
                          primaryColor={`${colorMap[i]}.light`}
                          secondaryColor={`${colorMap[i]}.main`}
                          variant={"caption"}
                        />
                      );
                    })}
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
