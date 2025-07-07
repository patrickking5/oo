import ComponentTypography from "@/components/ComponentTypography";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import * as React from "react";
import { getShortPlayerName } from "../utils/getShortPlayerName";

const LabelRow: React.FC<any> = ({ labels }) => {
  return (
    <TableRow sx={{ p: 0, bgcolor: "primary2.dark" }}>
      {labels.map((label: string, index: number) => (
        <TableCell
          align="center"
          key={index}
          sx={{ p: 0, width: label == "" ? 80 : null }}
        >
          <Typography variant="caption" sx={{ color: `primary2.light` }}>
            {label}
          </Typography>
        </TableCell>
      ))}
    </TableRow>
  );
};

const StatRow: React.FC<any> = ({
  allPlayerStats,
  columnNames,
  playerName,
  currentColor = "primary",
}) => {
  return (
    <TableRow sx={{ p: 0, bgcolor: "primary2.dark" }}>
      <TableCell align="center" sx={{ p: 0 }}>
        <Typography variant="caption" sx={{ color: `${currentColor}.light` }}>
          {getShortPlayerName(playerName)}
        </Typography>
      </TableCell>
      {columnNames.map((columnName: string, index: number) => (
        <TableCell align="center" key={index} sx={{ p: 0 }}>
          <Typography variant="h1" sx={{ color: `${currentColor}.light` }}>
            {allPlayerStats[playerName][columnName].toLocaleString()}
            {["wins", "runner_ups", "third_place_finishes"].includes(columnName)
              ? "x"
              : null}
          </Typography>

          {/* <Typography variant="caption">{subText}</Typography> */}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default function PlayerStatsBox({
  allPlayerStats,
  colorMap,
  title,
  labels,
  columnNames,
}: any) {
  // console.log(allPlayerStats);
  const playerNames = Object.keys(allPlayerStats);

  return (
    <Box
      sx={{
        border: 0.5,
        px: 0.5,
        bgcolor: "primary2.dark",
        borderRadius: 3,
        borderColor: "primary2.main",
      }}
    >
      <ComponentTypography title={title} />

      <TableContainer>
        <Table size="small" sx={{ backgroundColor: "primary2.dark" }}>
          <TableBody>
            <LabelRow labels={labels} />
            {playerNames.map((playerName: string, index: number) => (
              <StatRow
                key={index}
                allPlayerStats={allPlayerStats}
                columnNames={columnNames}
                playerName={playerName}
                currentColor={colorMap[index]}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
