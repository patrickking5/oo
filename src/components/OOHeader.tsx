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
import { grey, red } from "@mui/material/colors";
import { Grid2, Stack } from "@mui/material";
import { usePathname } from "next/navigation";
import OOLogo from "./OOLogo";
import { isXs } from "@/app/utils/isXs";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import OOHeaderBig from "./OOHeaderBig";
import { NavButtonsMobile } from "./NavButtonsMobile";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

// const drawerWidth = 135;
const iconSpacingWidth = 50;

export default function OOHeader({ drawerWidth }: any) {
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
      {/* <NavButtons /> */}
    </Box>
  );

  return (
    <React.Fragment>
      {isXs() ? (
        <>
          <CssBaseline />

          <AppBar
            position="fixed"
            sx={{ top: "auto", bottom: 0, bgcolor: "black" }}
          >
            <Toolbar>
              <NavButtonsMobile />
            </Toolbar>
          </AppBar>
        </>
      ) : (
        <OOHeaderBig drawerWidth={drawerWidth} />
      )}
    </React.Fragment>
  );
}
