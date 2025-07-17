import { Box, Stack } from "@mui/material";
import { isXs } from "../utils/isXs";
import OpenBarChart from "./OpenBarChart";
import OpenLineChart from "./OpenLineChart";
import PlayersScoresHistory from "./PlayerScoresHistory";
import PlayerStatsBox from "./PlayerStatsBox";

function PlayerDashboard({ stats, selectedPlayers, colorMap = null }: any) {
  const allPlayerStats = selectedPlayers.reduce((acc: any, playerName: any) => {
    const data = stats.player_stats[playerName];
    if (data) {
      acc[playerName] = data;
    }
    return acc;
  }, {} as Record<string, any>);

  return (
    <Box
      sx={{
        width: "100%",
        py: 0.5,
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "column",
          md: "column",
          lg: "row",
        },
      }}
    >
      <Stack spacing={2} sx={{ flex: 1, pr: { xs: 0, md: 1 } }}>
        {/* <StatKPISection PStats={PStats} /> */}
        <PlayerStatsBox
          allPlayerStats={allPlayerStats}
          colorMap={colorMap}
          title={"General Stats"}
          labels={["", "Opens", "Rounds", "Avg", "Strokes"]}
          columnNames={[
            "total_opens_num",
            "num_rounds",
            "average_score",
            "total_strokes",
          ]}
        />
        <PlayerStatsBox
          allPlayerStats={allPlayerStats}
          checkPodium={true}
          colorMap={colorMap}
          title={"Podium Finishes"}
          labels={["", "Wins", "2nds", "3rds", "Total"]}
          columnNames={[
            "wins",
            "runner_ups",
            "third_place_finishes",
            "podium_finishes",
          ]}
        />
        <OpenLineChart
          allPlayerStats={allPlayerStats}
          colorMap={colorMap}
          dataKey={"average_score"}
          title={"Avg Score by Year"}
        />
        <OpenBarChart allPlayerStats={allPlayerStats} colorMap={colorMap} />
        {/* <OOLineChart
              title={"Avg Score by Year"}
              seriesData={PStats.player_opens_data}
              series2Data={P2Stats ? P2Stats.player_opens_data : null}
              dataKey={"average_score"}
            />
            <CourseBarChart
              courseData={PStats.course_data}
              course2Data={P2Stats?.course_data}
            /> */}
      </Stack>
      <Box sx={{ flex: { lg: 0.75 }, pl: { lg: 1 }, mt: { xs: 2, md: 0 } }}>
        <PlayersScoresHistory
          isXs={isXs()}
          all_player_stats={allPlayerStats}
          colorMap={colorMap}
        />
      </Box>
    </Box>
  );
}

export default PlayerDashboard;
