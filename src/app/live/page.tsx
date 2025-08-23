"use client";

import { useHeader } from "@/context/HeaderContext";
import { useOpensData } from "@/context/ItemContext";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import ResultsTable from "../results/[year]/ResultsTable";

export default function Live() {
  const live_open_data = useOpensData().live_open_data;
  const { setHeaderContent } = useHeader();

  useEffect(() => {
    setHeaderContent({
      title: "Live Leaderboard",
      icon: "live",
      topChildren: null,
    });
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "black",
        px: { xs: 1, md: 2 },

        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "sm" }}>
        {live_open_data ? (
          <ResultsTable year_data={live_open_data} isLive={true} />
        ) : (
          <Typography align="center" variant="h1" sx={{ color: "red", mt: 10 }}>
            No live open right now....
          </Typography>
        )}
      </Box>

      {/* <Box
        sx={{
          border: 1,
          borderColor: "blue",
          width: "100%",
          p: 1,
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
        }}
      >
        \{" "}
        <Box
          sx={{
            flex: 1,
            border: 1,
            borderColor: "red",
            p: 1,
            m: 1,
          }}
        >
          Box1
        </Box>
        <Box
          sx={{
            flex: 1,
            border: 1,
            borderColor: "green",
            p: 1,
            m: 1,
          }}
        >
          Box2
        </Box>
      </Box>
      {Object.keys(all_img_data).map((year: any, index: number) => (
        <Box key={year}>
          <Typography>{year}</Typography>
          {all_img_data[year].map((image_metadata: any, index: number) => (
            <SingleImage
              key={index}
              year={year}
              image_metadata={image_metadata}
            />
          ))}
        </Box>
      ))} */}
    </Box>
  );
}
