"use client";

import { AppBar, Box, Grid2, Icon, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useRef, useState, ReactNode } from "react";
import OOLogo from "./OOLogo";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BarChartIcon from "@mui/icons-material/BarChart";
import CollectionsIcon from "@mui/icons-material/Collections";
import Home from "@/app/page";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";

const titleColor = "white";

const iconMap: Record<string, React.ReactElement> = {
  home: <HomeIcon sx={{ mr: 1, fontSize: 30, color: titleColor }} />,
  opens: <EmojiEventsIcon sx={{ mr: 1, fontSize: 30, color: titleColor }} />,
  stats: <BarChartIcon sx={{ mr: 1, fontSize: 30, color: titleColor }} />,
  gallery: <CollectionsIcon sx={{ mr: 1, fontSize: 30, color: titleColor }} />,
  players: (
    <PeopleAltTwoToneIcon sx={{ mr: 1, fontSize: 30, color: titleColor }} />
  ),
};

interface StatsAppBarProps {
  topChildren?: ReactNode;
  children?: ReactNode;
  title?: null | String;
  gutters?: boolean;
  icon?: null | String;
  barHeight?: number;
}

export default function DynamicPageHeader({
  topChildren = null,
  children = null,
  title = null,
  gutters = false,
  icon = null,
  barHeight = 60,
}: StatsAppBarProps) {
  const appBarHeight = barHeight ? barHeight : 60;
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 10,
          bgcolor: "black",
          p: 0.5,
          height: appBarHeight,
          // minHeight: 65, // consistent fallback height

          // borderBottom: `1px solid ${grey[900]}`,
          borderBottom: 2,
          borderBottomColor: "primary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          spacing={-0.5}
          sx={{
            px: 1,
            border: 0,
            borderColor: "blue",

            width: gutters ? { xs: "100%", md: "70%", lg: "60%" } : "100%",
          }}
        >
          <Grid2
            container
            sx={{
              border: 0,
              borderColor: "yellow",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: 0.5,
            }}
          >
            <Grid2 size={10} sx={{ border: 0, borderColor: "red", pb: 0 }}>
              <Stack spacing={3} direction={"row"}>
                <Typography
                  variant="h1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: titleColor,
                  }}
                >
                  {(icon &&
                    iconMap[icon.toLowerCase() as keyof typeof iconMap]) ||
                    iconMap.icon}
                  {title}
                </Typography>
                {topChildren}
              </Stack>
            </Grid2>

            <Grid2
              size={2}
              sx={{
                display: "flex",
                alignItems: "center",
                border: 0,
                borderColor: "red",
              }}
            >
              <OOLogo />
            </Grid2>
          </Grid2>
          {children}
        </Stack>
      </AppBar>
      <Box
        sx={{
          backgroundColor: "black",
          pt: `${appBarHeight + 8}px`, // fallback used on first render
          transition: "margin-top 200ms ease-in-out",
        }}
      />
    </>
  );
}
