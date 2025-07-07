import ComponentTypography from "@/components/ComponentTypography";
import { Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { formatDate } from "../../utils/formatDate";
import PlayerTableRow from "./PlayerTableRow";

export default function ResultsTable({ year_data }: any) {
  const numCols = year_data.number_of_rounds + 3;
  console.log(year_data);
  return (
    <TableContainer
      sx={{
        border: 0.5,
        borderColor: "primary2.main",
        px: 1,
        py: 0.5,
        bgcolor: "primary2.dark",
        color: "primary2.light",
        borderRadius: 3,
      }}
    >
      <Table
        size="small"
        aria-label="results table"
        sx={{ backgroundColor: "primary2.dark" }}
      >
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "primary2.dark",
              borderColor: "primary2.main",
            }}
          >
            <TableCell
              align="center"
              sx={{ p: 0, borderColor: "primary2.main", border: 0 }}
              colSpan={numCols}
            >
              <ComponentTypography title={`${year_data.year} Leaderboard`} />
            </TableCell>
          </TableRow>
          <TableRow sx={{ backgroundColor: "primary2.dark" }}>
            <TableCell align="left" sx={{ p: 0 }} colSpan={2}>
              <Stack sx={{ pl: 0, py: 0.5 }}>
                {year_data.dates.map((date: string, index: number) => (
                  <Stack key={index} spacing={0.5} direction={"row"}>
                    <Typography
                      sx={{ fontSize: { xs: "0.6rem", sm: "1rem" } }}
                      key={index}
                      variant="caption"
                    >
                      R{index + 1}
                    </Typography>
                    <Typography
                      sx={{ fontSize: { xs: "0.6rem", sm: "1rem" } }}
                      key={date}
                      variant="caption"
                    >
                      {formatDate(date)}
                    </Typography>
                    <Typography
                      sx={{ fontSize: { xs: "0.6rem", sm: "1rem" } }}
                      key={year_data.courses[index]}
                      variant="caption"
                    >
                      {year_data.courses[index]}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </TableCell>
            {year_data.dates.map((date: string, index: number) => (
              <TableCell
                align="center"
                style={{ verticalAlign: "bottom" }}
                key={index}
                sx={{ p: 0.5 }}
              >
                <Typography
                  sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
                  variant="caption"
                >
                  R{index + 1}
                </Typography>
              </TableCell>
            ))}
            <TableCell
              align="center"
              sx={{ p: 0.5 }}
              style={{ verticalAlign: "bottom" }}
            >
              <Typography
                sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
                variant="caption"
              >
                Total
              </Typography>
            </TableCell>
          </TableRow>
          {/* <TableRow>
            <TableCell colSpan={2}></TableCell>

            {year_data.dates.map((date: string, index: number) => (
              <TableCell align="center" key={index} colSpan={1}>
                <Typography
                  variant="caption"
                  sx={{ fontSize: { xs: "0.6rem", sm: "0.75rem" } }}
                >
                  {formatDate(date)}
                </Typography>
              </TableCell>
            ))}
            <TableCell colSpan={1} />
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}></TableCell>

            {year_data.courses.map((course: string, index: number) => (
              <TableCell align="center" key={index} colSpan={1}>
                <Typography
                  variant="caption"
                  sx={{ fontSize: { xs: "0.5rem", sm: "0.75rem" } }}
                >
                  {course}
                </Typography>
              </TableCell>
            ))}
            <TableCell colSpan={1} />
          </TableRow> */}
        </TableHead>
        <TableBody>
          {year_data.players.map((player_data: any, index: number) => (
            <PlayerTableRow
              key={index}
              player_data={player_data}
              index={index}
              eligible={true}
            />
          ))}
          {year_data.ineligible_players.map(
            (player_data: any, index: number) => (
              <PlayerTableRow
                key={index}
                player_data={player_data}
                index={index}
                eligible={false}
              />
            )
          )}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell>{year_data.stats.average_tournament_score}</TableCell>
            <TableCell>{year_data.stats.t_rounds_played}</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </TableContainer>
  );
}
