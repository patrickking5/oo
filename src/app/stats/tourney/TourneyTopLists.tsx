import { getShortCourseName } from "@/app/utils/getShortCourseName";
import { RankingEntry } from "@/app/utils/getStatRankings";
import ComponentTypography from "@/components/ComponentTypography";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import TourneyTopListSelect from "./TourneyTopListSelect";

// const ListModeSelect: React.FC<any> = ({
//   handleSelect,
//   statRankings,
//   listMode,
// }) => {
//   const buttonProps = {
//     sx: {
//       p: 0.5,
//       fontSize: "0.85rem",
//       [createTheme().breakpoints.down("sm")]: {
//         fontSize: "0.65rem",
//       },
//     },
//   };

//   return (
//     <Stack direction={"row"} spacing={0.25} alignItems={"center"}>
//       {[
//         {
//           label: "AVG Score",
//           stat: statRankings.best_avg_score,
//           rounds: 5,
//           note: "* MIN. 5 rounds played to qualify *",
//         },
//         { label: "RDs < 80", stat: statRankings.most_rds_below_80, rounds: 1 },
//         {
//           label: "Strokes",
//           stat: statRankings.most_total_strokes,
//           rounds: 1,
//         },
//         {
//           label: "Most Opens",
//           stat: statRankings.most_opens,
//           rounds: 1,
//         },
//         {
//           label: "Lowest Rds",
//           stat: statRankings.lowest_individual_scores,
//           showNumRdsCaption: false,
//           rounds: 1,
//         },
//       ].map(({ label, stat, rounds, showNumRdsCaption = true, note }) => (
//         <Button
//           startIcon={
//             listMode === label ? (
//               <CheckTwoToneIcon
//                 sx={{
//                   [createTheme().breakpoints.down("sm")]: {
//                     width: 10,
//                   },
//                   mx: 0.25,
//                   mr: -0.75,
//                 }}
//               />
//             ) : null
//           }
//           key={label}
//           {...buttonProps}
//           onClick={() =>
//             handleSelect(rounds, stat, label, showNumRdsCaption, note)
//           }
//           variant={listMode === label ? "outlined_colored" : "outlined"}
//         >
//           {label}
//         </Button>
//       ))}
//     </Stack>
//   );
// };

export default function TourneyTopLists({
  statRankings,
  all_player_stats,
  num_to_show = 10,
}: any) {
  const [listToShow, setListToShow] = useState<RankingEntry[]>(
    statRankings.best_avg_score
  );
  const [listMode, setListMode] = useState<String>("AVG Score");
  const [minRoundsToShow, setMinRoundsToShow] = useState<number>(5);
  const [showNumRdsCaption, setShowNumRdsCaption] = useState<boolean>(true);
  const [note, setNote] = useState<String | null>(
    "* MIN. 5 rounds played to qualify *"
  );

  const filteredList = listToShow
    .filter(
      (data: any) =>
        all_player_stats[data.player]?.num_rounds >= minRoundsToShow
    )
    .slice(0, num_to_show);

  const handleSelect = (
    newMinRoundsToShow: number,
    newListToShow: RankingEntry[],
    newStatsMode: String,
    newShowNumRdsCaption: boolean,
    newNote?: String | null
  ) => {
    setMinRoundsToShow(newMinRoundsToShow);
    setListMode(newStatsMode);
    setListToShow(newListToShow);
    setShowNumRdsCaption(newShowNumRdsCaption);
    setNote(newNote ? newNote : null);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isXs = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        border: 0.5,
        mt: 2,
        px: 1,
        // py: 1,
        bgcolor: "primary2.dark",
        borderRadius: 3,
        borderColor: "primary2.main",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          pb: 0.25,
        }}
        direction="column"
        alignItems={"center"}
        spacing={0.25}
      >
        <ComponentTypography
          title={`Top ${num_to_show} players by: ${listMode}`}
        />
        <Box sx={{ py: 0.5 }}>
          <TourneyTopListSelect
            handleSelect={handleSelect}
            listMode={listMode}
            statRankings={statRankings}
          />
        </Box>
      </Stack>

      <TableContainer>
        <Table sx={{ backgroundColor: "primary2.dark" }}>
          <TableBody sx={{ backgroundColor: "primary2.dark" }}>
            {filteredList.map((data: any, index: number) => (
              <TableRow key={index}>
                <TableCell align="left" sx={{ p: 0, pl: 1, width: 25 }}>
                  <Typography variant="h4">#{index + 1}</Typography>
                </TableCell>
                <TableCell sx={{ p: 0, pl: 1 }}>
                  <Typography>{data.player}</Typography>
                </TableCell>
                <TableCell align="right" sx={{ p: 0, pl: 1 }}>
                  <Typography variant="h4" sx={{ color: "primary.light" }}>
                    {data.value.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="left" sx={{ p: 0, pl: 1 }}>
                  {data.extra ? (
                    <Typography
                      variant="caption"
                      sx={{
                        [createTheme().breakpoints.down("sm")]: {
                          fontSize: "0.55rem",
                        },
                      }}
                    >
                      {data.extra}
                    </Typography>
                  ) : null}
                  {data.course && data.date ? (
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                      <Typography
                        variant="caption"
                        sx={{
                          [createTheme().breakpoints.down("sm")]: {
                            fontSize: "0.65rem",
                          },
                        }}
                      >
                        {isXs ? getShortCourseName(data.course) : data.course}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          [createTheme().breakpoints.down("sm")]: {
                            fontSize: "0.65rem",
                          },
                        }}
                      >
                        {data.date}
                      </Typography>
                    </Stack>
                  ) : null}

                  {showNumRdsCaption ? (
                    <Typography variant="caption">
                      [{all_player_stats[data.player]?.num_rounds} rounds]
                    </Typography>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {note ? (
            <TableFooter>
              <TableRow>
                <TableCell align="center" sx={{ p: 0 }} colSpan={4}>
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    {note}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableFooter>
          ) : null}
        </Table>
      </TableContainer>
    </Box>
  );
}
