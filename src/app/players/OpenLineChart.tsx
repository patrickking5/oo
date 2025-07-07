import ComponentTypography from "@/components/ComponentTypography";
import {
  Checkbox,
  FormControlLabel,
  PaletteColor,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { OOToolTip } from "../stats/OOToolTip";

export default function OpenLineChart({
  allPlayerStats,
  colorMap,
  dataKey,
  title,
}: any) {
  const theme = useTheme();

  const [compareOnlyCommonYears, setCompareOnlyCommonYears] = useState(false);
  const playerNames = Object.keys(allPlayerStats);
  console.log(allPlayerStats);
  // Collect all unique years from all players
  const allYears = Array.from(
    new Set(
      playerNames.flatMap(
        (name: string) =>
          allPlayerStats[name]?.player_opens_data?.map((d: any) => d.year) || []
      )
    )
  ).sort((a, b) => a - b);

  // Merge data per year with each player's score for that year
  let mergedData = allYears.map((year) => {
    const entry: Record<string, number | null> = { year };

    playerNames.forEach((name: string) => {
      const playerData = allPlayerStats[name]?.player_opens_data?.find(
        (d: any) => d.year === year
      );
      entry[name] = playerData ? playerData[dataKey] : null;
    });

    return entry;
  });

  // console.log("MERGED DATA");
  // console.log(mergedData);
  // Filter out years where one of the datasets is missing data
  if (compareOnlyCommonYears) {
    mergedData = mergedData.filter((d) =>
      playerNames.every((name: string) => d[name] !== null)
    );
  }

  const { min, max } = mergedData.reduce(
    (acc: any, point: any) => {
      playerNames.forEach((name) => {
        const val = point[name];
        const valRounded = Math.round(val * 10) / 10;
        if (valRounded != null) {
          acc.min = Math.min(acc.min, valRounded);
          acc.max = Math.max(acc.max, valRounded);
        }
      });
      return acc;
    },
    { min: Infinity, max: -Infinity }
  );

  return (
    <Stack
      spacing={0}
      sx={{
        border: 0.5,
        px: 0.5,
        bgcolor: "primary2.dark",
        borderRadius: 3,
        borderColor: "primary2.main",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "column" }}
        alignItems={{ xs: "center", sm: "center" }}
        sx={{
          // mt: 1,
          mb: 1.5,
          // pb: series2Data ? 0 : 0.5,
          color: grey[300],
        }}
      >
        <ComponentTypography title={title} />

        {playerNames.length > 1 && (
          <FormControlLabel
            control={
              <Checkbox
                checked={compareOnlyCommonYears}
                onChange={(e) => setCompareOnlyCommonYears(e.target.checked)}
                sx={{ color: "primary2.main", p: 0.5 }}
              />
            }
            label={
              <Typography variant="caption">
                Only show years selected players played
              </Typography>
            }
            sx={{ color: grey[300], mt: -1, p: 0 }}
          />
        )}
      </Stack>

      <ResponsiveContainer width={"100%"} height={200}>
        <LineChart
          data={mergedData}
          margin={{ top: 5, right: 5, left: -18, bottom: 5 }}
        >
          <XAxis
            padding={{ left: 10, right: 10 }}
            dataKey="year"
            fontSize={"0.8rem"}
            tickMargin={1}
            stroke={grey[500]}
          />
          <YAxis
            stroke={grey[500]}
            type="number"
            domain={[min, max]}
            fontSize={"0.8rem"}
            // tickFormatter={(value: number) => Math.round(value).toString()} // Ensures only whole numbers are displayed
            interval="preserveStartEnd" // Prevent duplicate labels and optimize placement
          />
          <Tooltip content={<OOToolTip />} cursor={{ fill: "transparent" }} />

          {playerNames.map((name, index) => {
            const colorKey = (colorMap?.[index] ||
              "primary") as keyof typeof theme.palette;
            const paletteColor = theme.palette[colorKey] as PaletteColor;

            return (
              <Line
                key={name}
                type="monotone"
                dot={{ stroke: paletteColor.light, strokeWidth: 0.5 }}
                dataKey={name}
                stroke={paletteColor.main}
                strokeWidth={1.25}
                fill={paletteColor.dark}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </Stack>
  );
}
