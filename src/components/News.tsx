import { Box, Typography } from "@mui/material";
import ComponentTypography from "./ComponentTypography";
import NewsRules from "./NewsRules";
import NewsWagering from "./NewsWagering";
import RSVPInfo from "./RSVPInfo";

export default function News() {
  return (
    <Box
      sx={{
        border: 0.5,
        px: 1,
        bgcolor: "primary2.dark",
        borderRadius: 3,
        borderColor: "primary2.main",
        mb: 2,
      }}
    >
      <ComponentTypography title={"News"} />

      <Box
        sx={{
          border: 1.5,
          borderRadius: 3,
          borderColor: "primary2.main",
          p: 1,
          mb: 1,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          Welcome to the 40th Annual Oll Open!
        </Typography>
        <Typography variant="body2" sx={{ color: "primary2.light", mt: 0.5 }}>
          Thank you to everyone who RSVP&apos;d. Please review the information
          from the boxes below.
        </Typography>
      </Box>

      <RSVPInfo />
      {/* <NewsDates /> */}
      <NewsRules />
      <NewsWagering />
    </Box>
  );
}
