import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function RSVPInfo() {
  return (
    <Box
      sx={{
        mb: 1,
        width: "100%",
        border: 1.5,
        borderRadius: 3,
        borderColor: "primary2.main",
        px: 0.5,
      }}
    >
      <Typography
        align="center"
        variant="body1"
        sx={{
          mb: 0.5,
          fontWeight: 700,
        }}
      >
        2026 Oll Open RSVPs!
      </Typography>

      <Box
        component="img"
        sx={{
          // height: "auto",
          width: "100%",
          border: 0,
          borderColor: grey[800],
          borderRadius: 2,
          // maxHeight: { xs: 233, md: 167 },
          // maxWidth: { xs: 350, sm: 400 },
        }}
        alt="RSVPs"
        src={`/photos/2026rsvplist.png`}
      />
    </Box>
  );
}
