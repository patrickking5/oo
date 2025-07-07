import { PaletteColor, Typography, useTheme } from "@mui/material";
import React from "react";

function ComponentTypography({ title }: any) {
  const theme = useTheme();
  const paletteColor = theme.palette["primary2"] as PaletteColor;
  return (
    <Typography
      align="center"
      variant="h2"
      sx={(theme) => ({
        position: "relative",
        mb: 1,
        py: 0.5,
        color: "white",
        bgcolor: "primary2.dark",
        width: "100%",
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          bottom: 0,
          height: "1px",
          width: "100%",
          background: `linear-gradient(to right, 
        ${paletteColor.dark}, 
        ${paletteColor.light}, 
        ${paletteColor.dark})`,
        },
      })}
    >
      {title}
    </Typography>
  );
}

export default ComponentTypography;
