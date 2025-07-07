"use client";

import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { NavButtonsMobile } from "./NavButtonsMobile";

export default function DynamicToolbar({ toolbarHeight }: any) {
  const theme = useTheme();
  //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = true;

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Fallback: default to mobile layout until mounted
  const mobileLayout = mounted ? isMobile : true;

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "black",
          bottom: 0,
          top: "auto",
          left: 0,
          width: "100%",
          height: toolbarHeight,
          display: "flex",
          flexDirection: "row",
          transition: "none",
          pb: 12,
          pt: 0,
          borderTop: 2,
          borderTopColor: "primary.main",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            padding: 0,
          }}
        >
          <NavButtonsMobile />
        </Toolbar>
      </AppBar>

      {/* <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "black",
          bottom: mobileLayout ? 0 : "auto",
          top: mobileLayout ? "auto" : 0,
          left: 0,
          width: mobileLayout ? "100%" : 72,
          height: mobileLayout ? 60 : "100vh",
          display: "flex",
          flexDirection: mobileLayout ? "row" : "column",
          transition: "none",
          pb: 11,
          pt: 0,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            flexDirection: mobileLayout ? "row" : "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            padding: mobileLayout ? 0 : 1,
          }}
        >
          <NavButtonsMobile />
        </Toolbar>
      </AppBar> */}
    </>
  );
}
