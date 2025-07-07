import { Box, Divider, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { useRouter } from "next/navigation";
import { EmojiEvents } from "@mui/icons-material";

function ResultsList({ sortedItems }: any) {
  const router = useRouter();

  function handleYearClicked(year: string, index: number): void {
    router.push(`/results/${year}?opennum=${index}`);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1.5,
        width: "100%",
        justifyContent: "center",
      }}
    >
      {sortedItems.map(
        (
          item: { players: any[]; champion_full_name: any; year: number },
          index: any
        ) => {
          const championData = item.players.find(
            (player: any) => player.player_full_name === item.champion_full_name
          );

          return (
            <Box
              key={item.year}
              onClick={() =>
                handleYearClicked(`${item.year}`, item.year - 1986)
              }
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: grey[800] },
                border: 0.5,
                borderColor: "primary2.main",
                p: 1,
                bgcolor: "primary2.dark",
                color: "primary2.light",
                borderRadius: 3,
                width: { xs: "100%", sm: "100%", md: "49%", lg: "49%" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  width: "100%",
                }}
              >
                {/* Left: Year and number */}
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ width: 70 }}
                >
                  <Typography variant="caption">#{item.year - 1986}</Typography>
                  <Typography variant="h3" sx={{ color: "primary2.light" }}>
                    {item.year}
                  </Typography>
                </Stack>

                {/* Center: Champion */}
                <Stack
                  direction="row"
                  spacing={0.25}
                  alignItems="center"
                  sx={{ flexGrow: 1, justifyContent: "left" }}
                >
                  <EmojiEvents sx={{ color: "primary2.main" }} />
                  <Typography
                    variant="body1"
                    sx={{
                      color: "primary2.light",
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      textAlign: "center",
                    }}
                  >
                    {item.champion_full_name}
                  </Typography>
                </Stack>

                {/* Right: Scores */}
                {championData ? (
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    sx={{ minWidth: 100, justifyContent: "flex-end" }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: "primary.main" }}
                    >
                      {championData.scores.join("-")}
                    </Typography>
                    <Divider
                      orientation="vertical"
                      sx={{ height: 20, bgcolor: "primary2.main" }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: "primary.main", fontWeight: 700 }}
                    >
                      {championData.totalScore}
                    </Typography>
                  </Stack>
                ) : (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "primary2.main",
                      fontStyle: "italic",
                      minWidth: 100,
                      textAlign: "right",
                    }}
                  >
                    no data
                  </Typography>
                )}
              </Box>
            </Box>
          );
        }
      )}
    </Box>
  );
}

export default ResultsList;
