import { Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import { getShortPlayerName } from "../utils/getShortPlayerName";
import { isXs } from "../utils/isXs";
function SelectedPlayerButton({
  handleClick,
  selectedPlayer,
  setSelectedPlayers,
  indexOfPlayer,
  textColor = "primary.light",
  handleRemove,
}: any) {
  return (
    <Stack
      direction={"row"}
      spacing={0}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        // border: 1,
        borderRadius: 5,
        // p: 0.5,
        // py: 0.5,
        backgroundColor: `${textColor}.dark`,
        fontSize: { xs: "1.25rem", sm: "1.375rem" },
        borderColor: "primary.light",
      }}
    >
      <Button
        variant="text"
        onClick={handleClick}
        startIcon={
          <ExpandMoreIcon
            sx={{
              border: 0,
              m: 0,
              mr: -1,
              width: 20,
              height: 20,
              color: `${textColor}.light`,
            }}
          />
        }
        sx={{
          p: 0,
          px: 0.5,
          // borderRadius: 5,
          // borderRight: 1,
          // borderColor: "primary.main",
          // borderTopRightRadius: 0,
          // borderBottomRightRadius: 0,
        }}
      >
        <Typography
          variant={isXs() ? "h4" : "h2"}
          sx={{
            color: selectedPlayer ? `${textColor}.light` : "primary2.main",
          }}
        >
          {selectedPlayer ? `${getShortPlayerName(selectedPlayer)}` : null}
        </Typography>
      </Button>
      {/* <IconButton
        onClick={handleClick}
        sx={{ border: 1, borderColor: "primary.main", width: 30, height: 30 }}
      >
        <EditTwoToneIcon sx={{ color: "primary.light" }} />
      </IconButton> */}
      <IconButton
        onClick={handleRemove}
        sx={{
          border: 2,
          borderColor: `${textColor}.main`,
          // bgcolor: `${textColor}.dark`,
          width: { xs: 25, sm: 30 },
          height: { xs: 25, sm: 30 },
        }}
      >
        <CloseIcon sx={{ color: `${textColor}.light` }} />
      </IconButton>
    </Stack>
  );
}

export default SelectedPlayerButton;
