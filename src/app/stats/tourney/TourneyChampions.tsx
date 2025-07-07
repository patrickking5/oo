import ComponentTypography from "@/components/ComponentTypography";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  createTheme,
} from "@mui/material";
import { useState } from "react";

function TourneyChampions({ Tstats }: any) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const MAX_VISIBLE = 4; // Number of years to show before "See all"

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Box
      sx={{
        border: 0.5,
        px: 1,
        bgcolor: "primary2.dark",
        borderRadius: 3,
        borderColor: "primary2.main",
        mt: { lg: -2 },
      }}
    >
      <ComponentTypography title={"Champions"} />

      <TableContainer sx={{ display: "flex" }}>
        <Table size="small">
          <TableBody>
            {Object.keys(Tstats.champions)
              .sort(
                (a, b) =>
                  Tstats.champions[b].length - Tstats.champions[a].length
              )
              .map((champ, index) => {
                const years = Tstats.champions[champ];
                const showAll = expandedIndex === index;
                const visibleYears = showAll
                  ? years
                  : years.slice(0, MAX_VISIBLE);

                return (
                  <TableRow key={index} sx={{ bgcolor: "primary2.dark" }}>
                    <TableCell sx={{ p: 0, pl: 0, width: 45 }} align="center">
                      <Typography variant="h3" sx={{ color: "primary.light" }}>
                        {years.length}x
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ p: 0, py: 1, mr: 0.5, maxWidth: 50 }}
                    >
                      <Typography
                        sx={{
                          [createTheme().breakpoints.down("sm")]: {
                            fontSize: "0.75rem",
                          },
                        }}
                      >
                        {champ}
                      </Typography>
                    </TableCell>

                    <TableCell
                      sx={{
                        p: 0,
                        pl: 0,
                        maxWidth: 100,
                      }}
                      align="center"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            [createTheme().breakpoints.down("sm")]: {
                              fontSize: "0.8rem",
                            },
                          }}
                        >
                          {visibleYears.join(", ")}
                          {years.length > MAX_VISIBLE && !showAll
                            ? " ... "
                            : null}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ p: 0, pl: 0.5, width: 55 }}>
                      {years.length > MAX_VISIBLE && (
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            textTransform: "none",
                            ml: 0.5,
                            my: 0.5,
                            width: 100,
                            [createTheme().breakpoints.down("sm")]: {
                              fontSize: "0.65rem",
                              width: 80,
                            },
                          }}
                          onClick={() => toggleExpand(index)}
                        >
                          {showAll ? "Show less" : `Show all ${years.length}`}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TourneyChampions;
