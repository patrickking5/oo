import { useOpensData } from "@/context/ItemContext";
import { AllPlayersData } from "@/types";
import { OverallTourneyStats } from "@/types/tourney_types"; // Use alias `@/` for cleaner imports
import { Box, Stack, Typography } from "@mui/material";
import { getStatRankings } from "../utils/getStatRankings";
import OOLineChart from "./OOLineChart";
import TourneyChampions from "./tourney/TourneyChampions";
import TourneyGeneralStats from "./tourney/TourneyGeneralStats";
import TourneyTopLists from "./tourney/TourneyTopLists";

const transformDataForCharts = (data: any, dataKey: string) => {
  return Object.values(data)
    .map((entry: any) => ({
      year: entry.year,
      [dataKey]: entry.stats[dataKey] ?? null,
    }))
    .filter((entry) => !isNaN(entry[dataKey])); // Exclude NaN values
};

interface TourneyStatsProps {
  Tstats: OverallTourneyStats;
  all_player_stats: AllPlayersData;
}

export default function TourneyStats({
  Tstats,
  all_player_stats,
}: TourneyStatsProps) {
  if (!Tstats || !Tstats.champions) {
    return <Typography>Error: Stats data is missing</Typography>;
  }
  // const [topListToShow, setToplistToShow] = React.useState<String | null>(
  //   "AVG Score"
  // );

  const items = useOpensData().opens_data;
  const chartsData = transformDataForCharts(items, "t_avg_round_score");
  const statRankings = getStatRankings(all_player_stats, items);

  return (
    <Stack
      spacing={2}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "column", lg: "row" },
      }}
    >
      <Stack spacing={2} sx={{ flex: 1 }}>
        <TourneyGeneralStats Tstats={Tstats} />
        <OOLineChart
          seriesData={chartsData}
          dataKey={"t_avg_round_score"}
          title={"Avg Score by Year"}
        />
      </Stack>

      <Box sx={{ flex: { lg: 0.75 }, pl: { lg: 2 } }}>
        <TourneyChampions Tstats={Tstats} />

        <TourneyTopLists
          statRankings={statRankings}
          all_player_stats={all_player_stats}
        />
      </Box>
    </Stack>
  );
}
