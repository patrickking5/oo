"use client";

import { useStatsData } from "@/context/StatsContext";
import { Box } from "@mui/material";
import { useEffect } from "react";

import { useHeader } from "@/context/HeaderContext";
import TourneyStats from "./TourneyStats";

type Stats = Record<string, any>;

export default function Stats() {
  const { setHeaderContent } = useHeader();

  useEffect(() => {
    setHeaderContent({
      title: "Stats",
      icon: "stats",
      gutters: false,
      topChildren: null,
    });
  }, []);

  const stats: Stats = useStatsData();

  return (
    <Box
      sx={{
        bgcolor: "black",
        px: { xs: 1, md: 2 },
        py: 1,
      }}
    >
      <TourneyStats
        Tstats={stats.overall_tourney_stats}
        all_player_stats={stats.player_stats}
      />
    </Box>
  );
}
