import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

const wageringItems = [
  "Daily $5 NET skins pool — new game since we are now popping every hole. Exciting game and easy money for everyone.",
  "Daily $5 GROSS birdie pool. Eagles count as 2 birdies. Birdie pool is NOT handicapped — enter at your own risk.",
  "Daily $5 QUOTA pool — same as in the past. Your quota will be 36 minus your current handicap, paying approximately 60% to WIN, 30% to PLACE, 10% to SHOW.",
  "Eagles count as 8 points in Quota calculation.",
  "Longest Putt on #18 for $1.",
  "Daily Closest-to-the-Pin for $1.",
  "Optional $100 hole-in-one game. Player(s) with an ace receive $100 from every player who has opted IN for the hole-in-one game.",
  "$51 maximum burn if you are IN for ALL games ALL 3 days. Small bills are greatly appreciated: some 10s, 5s, and 1s. Please think.",
];

export default function NewsWagering() {
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
        Optional Wagering
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "primary2.light",
          fontWeight: 700,
          px: 0.5,
          mb: 0.5,
        }}
      >
        Entering a NET game requires a CDGA, GHIN, or documented HDCP — no
        exceptions.
      </Typography>
      <List dense sx={{ py: 0 }}>
        {wageringItems.map((item) => (
          <ListItem key={item} sx={{ alignItems: "flex-start", px: 0 }}>
            <ListItemText
              primary={item}
              slotProps={{
                primary: {
                  variant: "body2",
                  sx: {
                    color: "primary2.light",
                    fontSize: { xs: 13, sm: 14 },
                    lineHeight: 1.35,
                  },
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
