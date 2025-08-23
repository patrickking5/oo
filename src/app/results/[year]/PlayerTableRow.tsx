import { TableCell, TableRow, Typography } from "@mui/material";
import { grey, orange } from "@mui/material/colors";

export default function PlayerTableRow({ player_data, index, eligible }: any) {
  return (
    <TableRow key={index} sx={{ backgroundColor: "primary2.dark" }}>
      <TableCell
        align="center"
        sx={{
          width: 10,
          px: 0.5,
          m: 0,
          backgroundColor:
            player_data.rank === "1st"
              ? "#383500"
              : player_data.rank === "2nd" || player_data.rank === "T2"
              ? "#363531"
              : player_data.rank === "3rd" || player_data.rank === "T3"
              ? "#4d1c00"
              : null,
        }}
        component="th"
        scope="row"
      >
        <Typography
          variant="caption"
          sx={{
            fontSize: { xs: "0.75rem", sm: "1rem" },
            color:
              player_data.rank === "1st"
                ? "gold"
                : player_data.rank === "2nd" || player_data.rank === "T2"
                ? "silver"
                : player_data.rank === "3rd" || player_data.rank === "T3"
                ? orange[600]
                : eligible
                ? grey[500]
                : "#161616",
            fontWeight:
              player_data.rank === "1st" ||
              player_data.rank === "2nd" ||
              player_data.rank === "T2" ||
              player_data.rank === "3rd" ||
              player_data.rank === "T3"
                ? 700
                : 400,
          }}
        >
          {player_data.rank !== "-1" ? player_data.rank : ""}
        </Typography>
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        sx={{ color: eligible ? "white" : grey[500], pl: 1 }}
      >
        <Typography
          variant="body1"
          sx={{
            color: eligible ? "white" : grey[500],
            fontSize: { xs: "0.8rem", sm: "1rem" },
          }}
        >
          {player_data.player_full_name}
        </Typography>
      </TableCell>
      {player_data.scores.map((score: number, index: number) => (
        <TableCell
          align="center"
          key={index}
          component="th"
          scope="row"
          sx={{
            color: eligible ? "white" : grey[500],
            p: 0,
          }}
        >
          <Typography
            sx={{
              p: 0,
              color: eligible ? "white" : grey[500],
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
          >
            {score > -1 ? score : "-"}
          </Typography>
        </TableCell>
      ))}

      <TableCell
        align="center"
        component="th"
        scope="row"
        sx={{ borderLeft: 1, borderColor: grey[800], p: 0 }}
      >
        <Typography
          variant="body1"
          sx={{
            color: eligible ? "white" : grey[500],
            fontSize: { xs: "0.8rem", sm: "1rem" },
          }}
        >
          {player_data.totalScore > -1 ? player_data.totalScore : "-"}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
