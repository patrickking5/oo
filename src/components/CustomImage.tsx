import { formatDate } from "@/app/utils/formatDate";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import { Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

function CustomImage({ alt, year, img_width = "100%", img_metadata }: any) {
  const imgBorderRadius = 2;
  return (
    <Stack
      sx={{
        border: 0.5,
        width: img_width,
        p: 0.5,
        // px: 0.5,
        borderRadius: imgBorderRadius,
        height: "auto",
        display: "flex",
        bgcolor: grey[800],
        // bgcolor: "#27342a",
        borderColor: grey[700],
      }}
    >
      <Typography
        align="center"
        variant="caption"
        dangerouslySetInnerHTML={{ __html: img_metadata.img_description }}
        sx={{ color: "primary2.light", pb: 0.5 }}
      >
        {/* {img_metadata.img_description} */}
      </Typography>

      <Box
        component="img"
        sx={{
          height: "auto",
          my: 0,
          width: "100%",
          borderRadius: imgBorderRadius,
          // maxHeight: { xs: 233, md: 167 },
          // maxWidth: { xs: 350, sm: 400 },
        }}
        alt={alt}
        src={`/photos/${year}/${img_metadata.img_name}`}
      />
      <Stack
        direction={"row"}
        spacing={0.2}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ pt: 0.5 }}
      >
        <CalendarMonthIcon sx={{ fontSize: 14, color: "primary2.light" }} />
        <Typography
          variant="caption"
          sx={{
            fontSize: { xs: 12, sm: 14 },
            color: "primary2.light",
          }}
        >
          {formatDate(img_metadata.img_date)}
        </Typography>
        <Box
          sx={{
            width: 10,
            mx: 1,
            height: 15,
            display: "flex",
            justifyContent: "center",
          }}
        />
        <PlaceIcon sx={{ fontSize: 14, sm: 16, color: "primary2.light" }} />

        <Typography
          variant="caption"
          sx={{ fontSize: { xs: 12, sm: 14 }, color: "primary2.light" }}
        >
          {img_metadata.img_location}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default CustomImage;
