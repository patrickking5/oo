"use client";

import { useOpensData } from "@/context/ItemContext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button, Divider, Grid2, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter, useSearchParams } from "next/navigation";
import ResultsTable from "./ResultsTable";

import { useHeader } from "@/context/HeaderContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useEffect } from "react";
import YearDetails from "./YearDetails";

export default function YearResults() {
  const items = useOpensData();

  const router = useRouter();

  const searchParams = useSearchParams();

  const index = searchParams.get("opennum");

  const parsedIndex = index !== null ? parseInt(index, 10) : null;
  // console.log(parsedIndex);
  if (
    parsedIndex === null ||
    isNaN(parsedIndex) ||
    parsedIndex < 0 ||
    parsedIndex >= items.length + 1
  ) {
    return (
      <Box
        sx={{
          bgcolor: "black",
          py: 4,
          px: 2,
          color: grey[400],
          textAlign: "center",
        }}
      >
        <Typography variant="h6">Invalid or missing index.</Typography>
      </Box>
    );
  }
  const nextIndex = parsedIndex + 1;
  const prevIndex = parsedIndex - 1;
  // Validate the parsed index and ensure it exists in the array

  const year_data =
    parsedIndex !== null &&
    !isNaN(parsedIndex) &&
    parsedIndex >= 1 &&
    parsedIndex < items.length + 1
      ? items[parsedIndex - 1]
      : null;

  if (!year_data) {
    return (
      <Box
        sx={{
          bgcolor: "black",
          py: 4,
          px: 2,
          color: grey[400],
          textAlign: "center",
        }}
      >
        <Typography variant="h6">Invalid or missing index.</Typography>
      </Box>
    );
  }

  const { setHeaderContent } = useHeader();

  useEffect(() => {
    setHeaderContent({
      title: `${year_data.year} Oll Open`,
      icon: "opens",
      gutters: false,
      barHeight: 102,
      children: (
        <Grid2
          container
          sx={{
            border: 0,
            width: "100%",
            borderColor: "blue",
            alignItems: "center",
          }}
        >
          <Grid2 size={2}>
            <Button
              onClick={() => router.push("/results")}
              variant="outlined"
              startIcon={<KeyboardBackspaceIcon />}
              sx={{
                // width: 110,
                color: "primary2.light",
                fontSize: {
                  xs: "0.875rem",
                  md: "1rem",
                },
                borderColor: "primary2.light",
              }}
            >
              Back
            </Button>
          </Grid2>
          <Grid2 size={8}>
            <Stack
              direction={"row"}
              spacing={1}
              alignItems={"center"}
              sx={{
                py: 0.5,
                justifyContent: "center",
                width: "100%",
                border: 1,
                // borderColor: "blue",
              }}
            >
              {parseInt(year_data.year) - 1 === 1986 ? null : (
                <Button
                  onClick={() =>
                    router.push(
                      `/results/${parseInt(year_data.year) - 1}?opennum=${
                        parsedIndex - 1
                      }`
                    )
                  }
                  startIcon={<ArrowBackIosNewIcon />}
                  variant="text"
                  sx={{
                    width: 80,
                    // color: "primary.main",
                    fontSize: {
                      xs: "0.875rem",
                      md: "1rem",
                    },
                  }}
                >
                  {parseInt(year_data.year) - 1}
                </Button>
              )}
              <Divider
                orientation="vertical"
                sx={{
                  bgcolor: "primary2.light",
                  height: 20,
                  alignItems: "center",
                }}
              />

              <Button
                disabled={parseInt(year_data.year) + 1 === 2025}
                onClick={() =>
                  router.push(
                    `/results/${parseInt(year_data.year) + 1}?opennum=${
                      parsedIndex + 1
                    }`
                  )
                }
                endIcon={<ArrowForwardIosIcon />}
                variant="text"
                sx={{
                  width: 80,
                  // color: "primary.main",
                  fontSize: {
                    xs: "0.875rem",
                    md: "1rem",
                  },
                  "&:disabled": {
                    backgroundColor: "black",
                    color: grey[800],
                  },
                }}
              >
                {parseInt(year_data.year) + 1}
              </Button>
            </Stack>
          </Grid2>
          <Grid2 size={2}></Grid2>
        </Grid2>
      ),
    });
  }, []);

  console.log("YEAR DATA!");
  console.log(year_data);
  return (
    <Box
      sx={{
        bgcolor: "black",
        py: 1,
        // px: 1,
        px: { xs: 1, md: 2 },
        // textAlign: "center",
      }}
    >
      {year_data.players.length > 0 ? (
        <Box
          sx={{
            width: "100%",
            p: 0,
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
          }}
        >
          {/* Box1 - Half the screen on md and up */}
          <Box
            sx={{
              flex: 1,
              pr: { md: 1 },
            }}
          >
            <ResultsTable year_data={year_data} />
          </Box>

          {/* Box2 - Half the screen on md and up */}
          <Box
            sx={{
              flex: 1,
              pl: { md: 1 },
            }}
          >
            <YearDetails year_data={year_data} />
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography
            variant="h2"
            align="center"
            sx={{ color: "primary.light" }}
          >
            * NO SCORING DATA FOR {year_data.year} *
          </Typography>
          <Typography
            variant="h2"
            align="center"
            sx={{ color: "primary.main" }}
          >
            CHAMPION: {year_data.champion_full_name}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
