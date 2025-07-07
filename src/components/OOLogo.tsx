import { Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

function OOLogo({ logoWidth = "100%" }: any) {
  return (
    <Box
      sx={{
        border: 0,
        borderColor: "blue",
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        component="img"
        sx={{
          // height: "auto",
          // height: 300,
          width: "auto",
          height: "35px",
          border: 0,
          borderColor: grey[800],
          // borderRadius: 2,
          // maxHeight: { xs: 233, md: 167 },
          // maxWidth: { xs: 350, sm: 400 },
        }}
        alt="Logo"
        src={`/photos/logo.png`}
      />
    </Box>
    // <Stack
    //   alignItems={"center"}
    //   spacing={-0.75}
    //   sx={{
    //     p: 0,
    //     m: 0,
    //     border: 0,
    //     borderColor: "blue",
    //     width: logoWidth,
    //     verticalAlign: "center",
    //   }}
    // >
    //   <Typography
    //     align="center"
    //     variant="h4"
    //     sx={{
    //       p: 0,
    //       m: 0,
    //       width: logoWidth,
    //       color: "primary.main",
    //       fontSize: { xs: "0.66rem", sm: "1rem" },
    //     }}
    //   >
    //     Oll
    //   </Typography>
    //   <Typography
    //     align="center"
    //     variant="h4"
    //     sx={{
    //       p: 0,
    //       m: 0,
    //       width: logoWidth,
    //       color: "primary.main",
    //       fontSize: { xs: "0.66rem", sm: "1rem" },
    //     }}
    //   >
    //     Open
    //   </Typography>
    // </Stack>
  );
}

export default OOLogo;
