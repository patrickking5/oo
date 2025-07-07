import { AppBar, Box, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useRef, useState, ReactNode } from "react";

interface StatsAppBarProps {
  children: ReactNode;
}

export default function PageAppBar({ children }: StatsAppBarProps) {
  const appBarRef = useRef<HTMLDivElement | null>(null);
  const [appBarHeight, setAppBarHeight] = useState(0);

  useEffect(() => {
    if (appBarRef.current) {
      setAppBarHeight(appBarRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (appBarRef.current) {
        setAppBarHeight(appBarRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        ref={appBarRef}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 10,
          bgcolor: "black",
          p: 1.5,
          // borderBottom: `1px solid ${grey[900]}`,
          borderBottom: 1,
          borderBottomColor: "primary.dark",
        }}
      >
        {children}
      </AppBar>
      {/* Spacer to prevent content from being overlapped */}
      <Box sx={{ mt: `${appBarHeight}px` }} />
    </>
  );
}
