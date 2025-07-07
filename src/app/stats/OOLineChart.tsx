import ComponentTypography from "@/components/ComponentTypography";
import { Stack, useTheme } from "@mui/material";
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
import { OOToolTip } from "./OOToolTip";

export default function OOLineChart({
  seriesData,
  series2Data = null,
  dataKey,
  title,
}: any) {
  const theme = useTheme();
  const [compareOnlyCommonYears, setCompareOnlyCommonYears] = useState(false);

  // Collect all unique years, only include series2Data if it exists
  const allYears = Array.from(
    new Set([
      ...seriesData.map((d: any) => d.year),
      ...(series2Data ? series2Data.map((d: any) => d.year) : []),
    ])
  ).sort((a, b) => a - b); // Ensure years are sorted

  // Merge data based on all unique years, safely handling missing series2Data
  let mergedData = allYears.map((year) => {
    const entry1 = seriesData.find((d: any) => d.year === year);
    const entry2 = series2Data?.find((d: any) => d.year === year); // Check if series2Data exists

    return {
      year,
      AVG: entry1 ? entry1[dataKey] : null,
      secondary_score: entry2 ? entry2[dataKey] : null,
    };
  });
  // console.log("MERGED DATA");
  // console.log(mergedData);
  // Filter out years where one of the datasets is missing data
  if (compareOnlyCommonYears && series2Data) {
    mergedData = mergedData.filter(
      (d) => d.AVG !== null && d.secondary_score !== null
    );
  }

  // Compute min/max values dynamically
  const { min, max } = mergedData.reduce(
    (acc: any, point: any) => ({
      min: Math.floor(
        Math.min(
          acc.min,
          point.AVG ?? acc.min,
          point.secondary_score ?? acc.min
        )
      ),
      max: Math.ceil(
        Math.max(
          acc.max,
          point.AVG ?? acc.max,
          point.secondary_score ?? acc.max
        )
      ),
    }),
    { min: Infinity, max: -Infinity }
  );

  return (
    <Stack
      spacing={0}
      sx={{
        border: 0.5,
        px: 1,
        bgcolor: "primary2.dark",
        borderRadius: 3,
        borderColor: "primary2.main",
      }}
    >
      <ComponentTypography title={title} />

      <ResponsiveContainer width={"100%"} height={200}>
        <LineChart
          data={mergedData}
          margin={{ top: 5, right: 5, left: -32, bottom: 5 }}
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

          {/* <Legend /> */}
          <Line
            dot={true}
            type="monotone"
            dataKey={"AVG"}
            stroke={theme.palette.primary.light}
            strokeWidth={1.25}
            fill={theme.palette.primary.dark}
          />

          {series2Data && (
            <Line
              dot={true}
              type="monotone"
              dataKey={"secondary_score"} // Uses the same key as seriesData
              stroke={theme.palette.secondary.main} // Different color for clarity
              strokeWidth={1.25}
              fill={theme.palette.secondary.dark}
              // strokeDasharray="5 5" // Dashed line to differentiate
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Stack>
  );
}
