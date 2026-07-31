import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import GolfCourseTwoToneIcon from "@mui/icons-material/GolfCourseTwoTone";
import { Box, Stack, Typography } from "@mui/material";

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
        borderRadius: 3,
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

export default function NewsDates() {
  return (
    <Box
      sx={{
        mb: 1,
        width: "100%",
        border: 1.5,
        borderRadius: 3,
        borderColor: "primary2.main",
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
        2026 Oll Open Dates!
      </Typography>
      <Stack direction={"column"} spacing={1} justifyContent={"center"}>
        <RoundBox
          roundNum={1}
          roundDate="Fri, Aug 7"
          roundCourse="ISU"
          roundTeeTimes="11:00 AM - 12:00 PM"
        />
        <RoundBox
          roundNum={2}
          roundDate="Sat, Aug 8"
          roundCourse="Metamora Fields"
          roundTeeTimes="9:06 - 10:00 AM"
        />
        <RoundBox
          roundNum={3}
          roundDate="Sun, Aug 9"
          roundCourse="Weaver Ridge"
          roundTeeTimes="8:00 - 8:50 AM"
        />
      </Stack>
    </Box>
  );
}
