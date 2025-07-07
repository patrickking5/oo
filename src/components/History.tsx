import { Box, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import ComponentTypography from "./ComponentTypography";

function History() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: 0.5,
        px: 1,
        bgcolor: "primary2.dark",
        borderRadius: 3,
        borderColor: "primary2.main",
        mt: { xs: 2, md: 0 },
      }}
    >
      <ComponentTypography title={`History of the "Oll Open"`} />

      <Typography variant="caption" component="div" sx={{ px: 1, pb: 1 }}>
        The{" "}
        <span style={{ color: theme.palette.primary.light, fontWeight: 700 }}>
          Oll Open
        </span>{" "}
        was an idea conceived back in 1987 by <strong>Mike King</strong>, who
        back then was more commonly referred to as “Oll”, and is now known as
        “Chuck”, “Burl”, or just “Jabber”. This notion hit “Oll” in between one
        of his FREQUENT naps at the infamous Sesame Street house in Bloomington,
        Illinois, where he resided with Oak, Dick and Chief.
        <br />
        <br /> What a “brilliant” idea, “have an annual golf outing with the
        same group of guys, complete with a traveling trophy and jacket to the
        victor.” It would be a weekend of male bonding, acting like “fraternity
        brothers that have never grown up” and playing golf with the{" "}
        <strong>GREATEST FRIENDS</strong> in the world.
        <br />
        <br /> At no other time in the golf season, do you want to bring your
        “A” game to the course! The unprecedented pressure on that first Tee on
        Saturday morning, with all of your closest friends secretly hoping that
        you shank or snap hook your first shot out-of-bounds, and your
        determination to keep her in play and see a second shot.
        <br />
        <br /> As the records reflect, there was parity early with four
        legitimate contenders for the crown jewel. But in recent years, the
        unprecedented domination by Mig has surely been a masterpiece and an
        example of others’ games deteriorating to the point that they are
        realistically no longer threats to win anything, but an occasional skin.
        <br />
        <br />
        In the illustrious 18 years of the of the Oll Open, there has been many
        thrills, many chokes, many shanks, many jabs, many tight forearms and
        butt cheeks, some mega-partying, some heavy barfing and most
        importantly, enough laughing to last a lifetime.
        <br />
        <br /> May the Oll Open live, until the last of the dudes are slouched
        over in their wheelchairs, sitting in the hallway down at Restmoor,
        shitting their pants and drooling all over themselves. And even then,
        may these memories continue to brighten all of our final days!
        <br />
        <br />
        Faithfully submitted,
        <br />
        <span style={{ color: theme.palette.primary.light, fontWeight: 700 }}>
          Chief (1960 - _____)
        </span>
      </Typography>
    </Box>
  );
}

export default History;
