import { Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import * as React from "react";
import GroupIcon from "@mui/icons-material/Group";

export default function SingleImage({ year, image_metadata }: any) {
  return (
    <Box
      sx={{
        border: 0,
        // width: 250,
        mb: 10,
      }}
    >
      <Box
        component="img"
        sx={{
          // height: "auto",
          height: 300,
          width: "auto",
          border: 2,
          borderColor: grey[800],
          borderRadius: 2,
          // maxHeight: { xs: 233, md: 167 },
          // maxWidth: { xs: 350, sm: 400 },
        }}
        alt="Defending Champion Picture"
        src={`/photos/${year}/${image_metadata.img_name}`}
      />
      <Stack spacing={0.5} direction={"row"}>
        <GroupIcon sx={{ fontSize: "0.875rem" }} />
        {image_metadata.img_people.map((player: any, index: number) => (
          <Typography variant="caption" key={index}>
            {player}
            {index === image_metadata.img_people.length - 1 ? null : " |"}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}
