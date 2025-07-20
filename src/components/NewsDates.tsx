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
        borderTop: 2,
        bgcolor: "primary2.dark",
        // borderRadius: 2,
        p: 0.5,
        borderColor: "primary2.main",
      }}
    >
      <Typography align="center" variant="h4">
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
    <Box sx={{ mb: 1, width: "100%" }}>
      <Typography
        align="center"
        variant="body1"
        sx={{
          mb: 0.5,
          // color: grey[200],
        }}
      >
        The committee has decided on the 2025 Oll Open Dates!
      </Typography>
      <Stack direction={"column"} spacing={1} justifyContent={"center"}>
        <RoundBox
          roundNum={1}
          roundDate="Aug 22nd"
          roundCourse="ISU - Weibring"
          roundTeeTimes="11 AM - Noon"
        />
        <RoundBox
          roundNum={2}
          roundDate="Aug 23rd"
          roundCourse="Weaver Ridge"
          roundTeeTimes="9:30 - 10:30 AM"
        />
        <RoundBox
          roundNum={3}
          roundDate="Aug 24th"
          roundCourse="Metamora Fields"
          roundTeeTimes="9 - 10 AM"
        />
      </Stack>
    </Box>
  );
}
