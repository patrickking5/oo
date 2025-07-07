"use client";

import { useHeader } from "@/context/HeaderContext";
import { useStatsData } from "@/context/StatsContext";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterPlayerButton from "./FilterPlayerButton";
import PlayerDashboard from "./PlayerDashboard";

type Stats = Record<string, any>;

export default function Players() {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const stats: Stats = useStatsData();

  const PStats = selectedPlayers
    ? stats.player_stats[selectedPlayers[0]]
    : null;

  const colorMap = {
    0: "primary",
    1: "secondary",
    2: "third",
    3: "fourth",
  };

  const { setHeaderContent } = useHeader();

  useEffect(() => {
    setHeaderContent({
      title: "Players",
      icon: "players",
      topChildren: null,
      barHeight: selectedPlayers.length > 0 ? 95 : 60,
      children:
        selectedPlayers.length > 0 ? (
          <Stack
            spacing={0.5}
            direction={"row"}
            alignItems={"center"}
            sx={{ border: 0, borderColor: "blue" }}
          >
            {selectedPlayers.map((playerName: string, index: number) => (
              <React.Fragment key={index}>
                <FilterPlayerButton
                  stats={stats.player_stats}
                  indexOfPlayer={index}
                  playerToShow={playerName}
                  selectedPlayers={selectedPlayers}
                  setSelectedPlayers={setSelectedPlayers}
                  type={"player"}
                  colorMap={colorMap}
                />

                {index < 2 ? (
                  <Divider
                    sx={{
                      width: 2,
                      height: 30,
                      borderRadius: 2,
                      bgcolor: "primary2.main",
                    }}
                  />
                ) : null}
              </React.Fragment>
            ))}
            {selectedPlayers.length > 2 ? null : (
              <FilterPlayerButton
                stats={stats.player_stats}
                selectedPlayers={selectedPlayers}
                setSelectedPlayers={setSelectedPlayers}
                buttonTitle={"Add"}
                buttonTextVariant={"caption"}
              />
            )}
          </Stack>
        ) : null,
    });
  }, [selectedPlayers]);

  const theme = useTheme();
  return (
    <Box sx={{ bgcolor: "black", px: { xs: 1, md: 2 } }}>
      {selectedPlayers.length > 0 ? (
        <PlayerDashboard
          selectedPlayers={selectedPlayers}
          stats={stats}
          colorMap={colorMap}
        />
      ) : (
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
          sx={{ border: 0 }}
        >
          <FilterPlayerButton
            stats={stats.player_stats}
            selectedPlayers={selectedPlayers}
            setSelectedPlayers={setSelectedPlayers}
          />
          <Typography variant="h4" sx={{ color: "primary2.light" }}>
            Instructions
          </Typography>
          <Stack sx={{ px: 0.5 }}>
            <Typography component={"div"} variant="caption">
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: 700,
                }}
              >
                Player Select:
              </span>
              &nbsp;Use button above to select a player. <br />{" "}
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp; - Player's name will appear upon
                selection.
              </p>
              <br />
            </Typography>

            <Typography variant="caption">
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: 700,
                }}
              >
                Editing Player:
              </span>
              &nbsp;Click player name to edit the selected player. <br /> <br />{" "}
            </Typography>
            <Typography variant="caption">
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: 700,
                }}
              >
                Removing Player:
              </span>
              &nbsp;Click the "X" next to the player to remove. <br /> <br />{" "}
            </Typography>
            <Typography variant="caption">
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: 700,
                }}
              >
                Add more players:
              </span>
              &nbsp;Click the "Add" button to compare up to 3 players <br />{" "}
              <br />{" "}
            </Typography>
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
