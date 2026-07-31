import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

const specialRules = [
  "NO GIMMES — not even tap-ins.",
  "LCP in your OWN fairway ONLY. This includes removing balls from divots, aeration holes, burnt-out fairway, etc. Use common sense; for example, #5 at ISU is always GUR.",
  "1st cut / collar around the greens constitutes a fairway.",
  'Ball-in-hand in ALL bunkers for ALL lies. Groom and move ball 6" maximum, no closer to the hole. If you are on a front / back slope, retain relative position.',
  "Group consensus on GROUND UNDER REPAIR for rough in horrible condition. Examples: ISU #5 to the left and ISU #16 to the right.",
  "Metamora Fields — driving range on the left of 7 and 18 fairways is OB.",
];

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
        Special Oll Open Rules / All 3 Days
      </Typography>
      <List dense sx={{ py: 0 }}>
        {specialRules.map((rule) => (
          <ListItem key={rule} sx={{ alignItems: "flex-start", px: 0 }}>
            <ListItemText
              primary={rule}
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
