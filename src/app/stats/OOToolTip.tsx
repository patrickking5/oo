import { Box, Divider, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { getShortPlayerName } from "../utils/getShortPlayerName";

export const OOToolTip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          border: 5,
          borderRadius: 3,
          borderColor: grey[800],
          backgroundColor: grey[900],
          p: 1,
        }}
      >
        {/* Year Label */}
        <Typography align="center" variant="h4">
          {label}
        </Typography>

        {/* Divider */}
        <Divider
          sx={{
            height: 2,
            width: "100%",
            backgroundColor: grey[800],
            my: 0.25,
          }}
        />

        {/* Dynamically render player stats */}
        <Stack spacing={0.75}>
          {payload.map((entry: any, index: number) => (
            <Stack
              spacing={1}
              key={index}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="caption"
                sx={{ color: entry.stroke, fontWeight: 400 }}
              >
                {getShortPlayerName(entry.name)}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: entry.stroke, fontWeight: 700 }}
              >
                {entry.value ?? "N/A"}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    );
  }

  return null;
};
