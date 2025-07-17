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
            {(() => {
              const value = allPlayerStats[playerName][columnName];
              if (
                ["wins", "runner_ups", "third_place_finishes"].includes(
                  columnName
                )
              ) {
                return value > 0 ? `${value}x` : "-";
              }
              return value.toLocaleString();
            })()}
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
  checkPodium = false,
}: any) {
  const allNames = Object.keys(allPlayerStats);

  const hasPodium = (playerName: string) => {
    const stats = allPlayerStats[playerName] || {};
    return (
      (stats.wins ?? 0) > 0 ||
      (stats.runner_ups ?? 0) > 0 ||
      (stats.third_place_finishes ?? 0) > 0
    );
  };

  let playerNames = allNames;

  if (checkPodium) {
    playerNames = allNames.filter((name) => hasPodium(name));

    if (allNames.length > 1 && playerNames.length === 0) {
      return null; // hide entire box
    }
  }
  if (playerNames.length === 0) {
    return null;
  }

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
