"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavButtons } from "./NavButtons";
import { grey, red } from "@mui/material/colors";
import { Grid2, Stack } from "@mui/material";
import { usePathname } from "next/navigation";
import OOLogo from "./OOLogo";
import { isXs } from "@/app/utils/isXs";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

// const drawerWidth = 135;
const iconSpacingWidth = 50;

export default function OOHeaderBig({ drawerWidth }: any) {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <Box sx={{ border: 0, borderColor: "yellow", backgroundColor: "black" }}>
      <Toolbar
        sx={{
          pt: 0,
          m: 0,
          width: "100%",
          border: 0,
          borderColor: "yellow",
        }}
      >
        {isXs() ? null : <OOLogo />}
      </Toolbar>
      <NavButtons />
    </Box>
  );

  return (
    <Box sx={{ display: "flex", backgroundColor: "black" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "black",
          borderBottom: 1,
          borderColor: grey[800],
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            border: 0,
            borderColor: "green",
            p: { xs: 0 },
          }}
        >
          <Box
            sx={{
              width: { xs: iconSpacingWidth, sm: 0 },
              border: 0,
              borderColor: "red",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 1, display: { sm: "none" } }}
            >
              {mobileOpen ? <CloseTwoToneIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
          {mobileOpen ? (
            <Typography
              variant="h1"
              align="center"
              sx={{
                width: "100%",
              }}
            >
              Choose Page
            </Typography>
          ) : (
            <Typography
              variant="h2"
              align="center"
              sx={{
                width: "100%",

                //   width: {
                //     xs: "100%",
                //     // sm: `calc(100% - ${drawerWidth}px)`,
                //   },
                p: 0,
                border: 0,
                ml: 0,
                //   ml: { xs: 0, sm: `${drawerWidth}px` },
              }}
            >
              {pathname === "/" ? "Welcome to the Oll Open!" : "here"}
            </Typography>
          )}

          <Box
            sx={{
              width: { xs: iconSpacingWidth, sm: 0 },
              border: 0,
              borderColor: "red",
            }}
          >
            {isXs() ? <OOLogo logoWidth={iconSpacingWidth} /> : null}
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "100%",
            },
          }}
          slotProps={{
            root: {
              //   keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: 1,
              borderColor: grey[800],
            },
            // width: drawerWidth,
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
