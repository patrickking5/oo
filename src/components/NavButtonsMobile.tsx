// src/components/OOButton.tsx
"use client";

import { Box, Button, IconButton, Stack, Typography } from "@mui/material"; // Optional, if using Material UI
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BarChartIcon from "@mui/icons-material/BarChart";
import CollectionsIcon from "@mui/icons-material/Collections";
import { grey } from "@mui/material/colors";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";

interface SingleNavButtonProps {
  button_path: string;
  current_path: string;
  text: string;
  icon: any;
  match_prefix?: boolean;
}

const NavButton: React.FC<SingleNavButtonProps> = ({
  button_path,
  current_path,
  text,
  icon,
  match_prefix = false, // Defaults to strict match
}) => {
  const button_width = 120;

  const isActive = match_prefix
    ? current_path.startsWith(button_path) // Highlight if prefix matches
    : current_path === button_path; // Highlight if paths match exactly

  return (
    <IconButton
      color="inherit"
      href={button_path}
      sx={{
        flexDirection: "column",
        width: "20%",
        // borderRadius: 0,
        color: isActive ? "primary.light" : "primary2.main",
        fontSize: "1rem",
        mt: 1,
        // borderBottom: isActive ? 2 : 0,
        borderRadius: 6,
        bgcolor: isActive ? "primary.dark" : null,
        border: isActive ? 1 : 0,
        // borderColor: isActive ? "primary.dark" : null,
      }}
    >
      {icon}
      <Typography
        variant="caption"
        sx={{ color: isActive ? "primary.light" : null }}
      >
        {text}
      </Typography>
    </IconButton>
  );
};

export const NavButtonsMobile: React.FC = () => {
  const pathname = usePathname();

  return (
    <Stack
      spacing={1}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        pl: 0,
        px: 3,
        // border: 1,
        // borderColor: "red",
        // width: "100%",
        width: { xs: "100%", md: "70%", lg: "60%" },

        height: "100%",
        pt: 3,
      }}
    >
      {/* <Typography>{pathname}</Typography> */}
      <NavButton
        button_path="/"
        current_path={pathname}
        text="Home"
        icon={<HomeIcon />}
      />
      <NavButton
        button_path="/results"
        current_path={pathname}
        text="Opens"
        icon={<EmojiEventsIcon />}
        match_prefix={true}
      />
      <NavButton
        button_path="/stats"
        current_path={pathname}
        text="Stats"
        icon={<BarChartIcon />}
      />
      <NavButton
        button_path="/players"
        current_path={pathname}
        text="Players"
        icon={<PeopleAltTwoToneIcon />}
      />
      <NavButton
        button_path="/gallery"
        current_path={pathname}
        text="Gallery"
        icon={<CollectionsIcon />}
      />
    </Stack>
  );
};
