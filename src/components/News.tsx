import { Box } from "@mui/material";
import ComponentTypography from "./ComponentTypography";
import NewsDates from "./NewsDates";

export default function News() {
  return (
    <Box
      sx={{
        border: 0.5,
        px: 1,
        bgcolor: "primary2.dark",
        borderRadius: 3,
        borderColor: "primary2.main",
        mb: 2,
      }}
    >
      <ComponentTypography title={"News"} />

      <NewsDates />
    </Box>
  );
}
