import { CheckTwoTone } from "@mui/icons-material";
import { Button, Stack, createTheme } from "@mui/material";

export default function TourneyTopListSelect({
  handleSelect,
  statRankings,
  listMode,
}: any) {
  const buttonProps = {
    sx: {
      p: 0.5,
      fontSize: "0.85rem",
      [createTheme().breakpoints.down("sm")]: {
        fontSize: "0.65rem",
      },
    },
  };

  return (
    <Stack direction={"row"} spacing={0.25} alignItems={"center"}>
      {[
        {
          label: "AVG Score",
          stat: statRankings.best_avg_score,
          rounds: 5,
          note: "* MIN. 5 rounds played to qualify *",
        },
        { label: "RDs < 80", stat: statRankings.most_rds_below_80, rounds: 1 },
        {
          label: "Strokes",
          stat: statRankings.most_total_strokes,
          rounds: 1,
        },
        {
          label: "Most Opens",
          stat: statRankings.most_opens,
          rounds: 1,
        },
        {
          label: "Lowest Rds",
          stat: statRankings.lowest_individual_scores,
          showNumRdsCaption: false,
          rounds: 1,
        },
      ].map(({ label, stat, rounds, showNumRdsCaption = true, note }) => (
        <Button
          startIcon={
            listMode === label ? (
              <CheckTwoTone
                sx={{
                  [createTheme().breakpoints.down("sm")]: {
                    width: 10,
                  },
                  mx: 0.25,
                  mr: -0.75,
                }}
              />
            ) : null
          }
          key={label}
          {...buttonProps}
          onClick={() =>
            handleSelect(rounds, stat, label, showNumRdsCaption, note)
          }
          variant={listMode === label ? "outlined_colored" : "outlined"}
        >
          {label}
        </Button>
      ))}
    </Stack>
  );
}
