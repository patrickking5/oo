import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function NewsRules() {
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
        2025 Oll Open Rules!
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
        alt="Rules"
        src={`/photos/2025info.png`}
      />
    </Box>
  );
}
