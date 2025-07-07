import { Divider, useTheme } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HeightIcon from "@mui/icons-material/Height";
import { grey } from "@mui/material/colors";

export const DividerPointer: React.FC<any> = ({
  pointUp = true,
  equals = false,
  pointerLocation = "center",
}) => {
  const theme = useTheme();

  return (
    <Divider
      orientation="horizontal"
      textAlign={pointerLocation}
      sx={{
        p: 0,
        width: "70%",
        borderTop: "1px solid", // Divider line using border
        borderColor: grey[900], // Divider color
        display: "flex",
        alignItems: { pointerLocation }, // Vertically center the icon
        justifyContent: { pointerLocation }, // Horizontally center the icon
        position: "relative", // Necessary for absolute positioning
      }}
    >
      {equals ? (
        <HeightIcon
          sx={{
            fontSize: 17,
            position: "absolute", // Ensures the icon is positioned over the divider
            top: "-10px", // Moves the icon above the divider
            left: pointerLocation === "center" ? "50%" : "17%", // Centers the icon horizontally
            transform: "translateX(-50%)", // Offsets the 50% left positioning to perfectly center
            color: grey[400],
          }}
        />
      ) : pointUp ? (
        <ArrowDropUpIcon
          sx={{
            fontSize: 20,
            color: "linear-gradient(to bottom, white, secondary.main)", // Vertical gradient from top to bottom
            position: "absolute", // Ensures the icon is positioned over the divider
            top: "-12px", // Moves the icon above the divider
            left: pointerLocation === "center" ? "50%" : "17%", // Centers the icon horizontally
            transform: "translateX(-50%)", // Offsets the 50% left positioning to perfectly center
          }}
        />
      ) : (
        <ArrowDropDownIcon
          sx={{
            fontSize: 20,
            color: "secondary.main",
            position: "absolute", // Ensures the icon is positioned over the divider
            top: "-10px", // Moves the icon above the divider
            left: pointerLocation === "center" ? "50%" : "17%", // Centers the icon horizontally
            transform: "translateX(-50%)", // Offsets the 50% left positioning to perfectly center
          }}
        />
      )}
    </Divider>
  );
};
