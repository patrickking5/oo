"use client";

import { useHeader } from "@/context/HeaderContext";
import { useOpensData } from "@/context/ItemContext";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ResultsList from "./ResultsList";

export default function Results() {
  const { setHeaderContent } = useHeader();

  useEffect(() => {
    setHeaderContent({
      title: "Opens",
      icon: "opens",
      gutters: true,
      topChildren: null,
    });
  }, []);

  const items = useOpensData().opens_data;

  const router = useRouter();

  function handleYearClicked(year: string, index: number): void {
    // Navigate to the dynamic route and pass data as query params
    router.push(`/results/${year}?opennum=${index}`);
  }

  const sortedItems = [...items].sort((a, b) => b.year - a.year);
  return (
    <Box
      sx={{
        bgcolor: "black",
        // p: 1.5,
        px: { xs: 1, md: 2 },

        // pt: { xs: 1.5, sm: 3 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { md: "70%", lg: "60%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ResultsList sortedItems={sortedItems} />
        </Box>
      </Box>
      {/* <TableContainer sx={{ justifyContent: "center", display: "flex" }}>
        <Table size="small" sx={{ maxWidth: { md: "70%", lg: "60%" } }}>
          <TableBody>
            {sortedItems.map((item, index) => {
              const championData = item.players.find(
                (player: any) =>
                  player.player_full_name === item.champion_full_name
              );
              return (
                <TableRow
                  key={index}
                  onClick={() => handleYearClicked(item.year, item.year - 1986)}
                  sx={{
                    cursor: "pointer",

                    "&:hover": {
                      backgroundColor: grey[800],
                    },
                  }}
                >
                  <TableCell sx={{ width: 10, p: 0, px: 0, py: 1.5 }}>
                    <Typography
                      variant="h2"
                      sx={{
                        [createTheme().breakpoints.down("sm")]: {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      {item.year}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ p: 0 }}>
                    <Typography variant="caption">
                      #{item.year - 1986}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ p: 0, pl: 0.5 }}>
                    <Stack
                      spacing={0.5}
                      direction={"row"}
                      alignItems={"center"}
                    >
                      <EmojiEvents sx={{ color: yellow[600] }} />
                      <Typography
                        variant="h4"
                        sx={{
                          color: grey[400],
                          [createTheme().breakpoints.down("sm")]: {
                            fontSize: "0.9rem",
                          },
                        }}
                      >
                        {item.champion_full_name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right" sx={{ p: 0 }}>
                    {championData ? (
                      <Stack
                        spacing={0.5}
                        direction={"row"}
                        justifyContent={"right"}
                      >
                        <Typography variant="caption" sx={{ color: grey[500] }}>
                          {championData.scores.join("-")}
                        </Typography>
                        <Divider
                          orientation="vertical"
                          sx={{ height: 20, bgcolor: grey[600] }}
                        />
                        <Typography
                          variant="caption"
                          sx={{ color: grey[500], fontWeight: 700 }}
                        >
                          {championData.totalScore}
                        </Typography>
                      </Stack>
                    ) : (
                      <Typography
                        variant="caption"
                        sx={{ color: grey[600], fontStyle: "italic" }}
                      >
                        no score data
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer> */}
      {/* <List
        sx={{
          columnCount: { xs: 2, sm: 2, md: 3 },
          columnGap: 1, // Adjust spacing between columns
        }}
      >
        {sortedItems.map((item: any, index: number) => (
          <ListItem
            // component={Button}
            onClick={() => handleYearClicked(item.year, index + 1)}
            key={index + 1}
          >
            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                alignItems: "center",
                pl: 2,
                // border: 1,
                borderRadius: 3,
                py: 1,
                // borderColor: "var(--bg-color-2)",
                // p: 1,
                width: "100%",
                backgroundColor: grey[900],
                "&:hover": {
                  backgroundColor: grey[800],
                },
              }}
            >
              <Typography
                sx={{ color: grey[400], width: "25px" }}
                variant="caption"
              >
                #{+item.year - 1986}
              </Typography>
              <Typography variant="h4" sx={{ color: grey[600], width: "45px" }}>
                {item.year}
              </Typography>
              <EmojiEvents sx={{ color: yellow[200] }} />
              <Typography variant="body1">{item.champion_full_name}</Typography>
            </Stack>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );
}
