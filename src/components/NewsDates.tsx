import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import DateRangeTwoToneIcon from "@mui/icons-material/DateRangeTwoTone";
import GolfCourseTwoToneIcon from "@mui/icons-material/GolfCourseTwoTone";
import { Box, Stack, Typography } from "@mui/material";

const RoundBoxLine: any = ({ icon, text }: any) => {
  return (
    <Stack
      direction={"row"}
      spacing={0.25}
      alignItems={"center"}
      justifyContent={"left"}
    >
      {icon}
      <Typography
        variant={"caption"}
        sx={{
          fontWeight: 400,
          color: "primary2.light",
          fontSize: { xs: 12, sm: 14 },
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
        border: 2,
        bgcolor: "primary2.dark",
        borderRadius: 2,
        p: 0.5,
        borderColor: "primary2.main",
      }}
    >
      <Typography align="center" variant="h4">
        Round {roundNum}
      </Typography>
      <RoundBoxLine
        icon={
          <DateRangeTwoToneIcon sx={{ width: 18, color: "primary.light" }} />
        }
        text={roundDate}
      />
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
  );
};

export default function NewsDates() {
  return (
    <Box sx={{ mb: 1 }}>
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
      <Stack direction={"row"} spacing={1} justifyContent={"center"}>
        <RoundBox
          roundNum={1}
          roundDate="Aug 22nd"
          roundCourse=" Course TBD"
          roundTeeTimes="Tee Times TBD"
        />
        <RoundBox
          roundNum={2}
          roundDate="Aug 23rd"
          roundCourse=" Course TBD"
          roundTeeTimes="Tee Times TBD"
        />
        <RoundBox
          roundNum={3}
          roundDate="Aug 24th"
          roundCourse=" Course TBD"
          roundTeeTimes="Tee Times TBD"
        />
      </Stack>
    </Box>
  );
}
