import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import GolfCourseTwoToneIcon from "@mui/icons-material/GolfCourseTwoTone";
import { Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const RoundBoxLine: any = ({ icon, text }: any) => {
  return (
    <Stack
      direction={"row"}
      spacing={0.5}
      alignItems={"center"}
      justifyContent={"left"}
    >
      {icon}
      <Typography
        variant={"caption"}
        sx={{
          fontWeight: 500,
          color: "primary2.light",
          fontSize: { xs: 14, sm: 16 },
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

const RoundBox: any = ({
  roundNum,
  roundDate = "null",
  roundCourse = "TBD",
  roundTeeTimes = "TBD",
}: any) => {
  return (
    <Stack
      sx={{
        border: 0,
        borderTop: 2,
        bgcolor: "primary2.dark",
        // borderRadius: 2,
        p: 0.5,
        borderColor: "primary2.main",
      }}
    >
      <Typography align="center" variant="body2">
        {roundDate} - Round {roundNum}
      </Typography>
      {/* <RoundBoxLine
        icon={
          <DateRangeTwoToneIcon sx={{ width: 18, color: "primary.light" }} />
        }
        text={roundDate}
      /> */}
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ width: "100%", justifyContent: "center" }}
      >
        <RoundBoxLine
          icon={
            <GolfCourseTwoToneIcon sx={{ width: 18, color: "primary.light" }} />
          }
          text={roundCourse}
        />
        <RoundBoxLine
          icon={
            <AccessTimeTwoToneIcon sx={{ width: 18, color: "primary.light" }} />
          }
          text={roundTeeTimes}
        />
      </Stack>
    </Stack>
  );
};

export default function RSVPInfo() {
  return (
    <Box
      sx={{
        mb: 1,
        width: "100%",
        border: 1.5,
        borderRadius: 3,
        borderColor: "primary2.main",
        px: 0.5,
      }}
    >
      <Typography
        align="center"
        variant="body1"
        sx={{
          mb: 0.5,
          fontWeight: 700,
        }}
      >
        2025 Oll Open RSVPs!
      </Typography>

      <Box
        component="img"
        sx={{
          // height: "auto",
          width: "100%",
          border: 0,
          borderColor: grey[800],
          borderRadius: 2,
          // maxHeight: { xs: 233, md: 167 },
          // maxWidth: { xs: 350, sm: 400 },
        }}
        alt="RSVPs"
        src={`/photos/2025rsvplist.png`}
      />
    </Box>
  );
}
