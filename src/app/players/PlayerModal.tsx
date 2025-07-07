import * as React from "react";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { EmojiEvents } from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CheckIcon from "@mui/icons-material/Check";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
export default function PlayerModal({
  stats,
  selectedPlayers,
  setSelectedPlayers,
  anchorEl,
  setAnchorEl,
  modalTitle = "Player Filter",
  indexOfPlayer = null,
  type = "primary",
  handleRemove = null,
}: any) {
  const open = Boolean(anchorEl);
  //   const open = true;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (playerName: string) => {
    if (indexOfPlayer !== null) {
      const newList = [...selectedPlayers];
      newList[indexOfPlayer] = playerName;
      setSelectedPlayers(newList);
    } else {
      setSelectedPlayers([...selectedPlayers, playerName]);
    }
    handleClose();
  };

  const handleRemoveFromModal = () => {
    handleRemove();
    handleClose();
  };

  const sortedPlayers = Object.keys(stats).sort((a, b) => {
    // Sort by wins (descending) if either has wins > 0
    if (stats[a].wins > 0 || stats[b].wins > 0) {
      return stats[b].wins - stats[a].wins;
    }
    // Otherwise, sort alphabetically by first name
    return a.localeCompare(b);
  });
  return (
    <Modal sx={{ mx: 1, mt: 2 }} open={open} onClose={handleClose}>
      <Box
        sx={{
          border: 3,
          borderRadius: 5,
          borderColor: "primary2.main",
          backgroundColor: "primary2.dark",
          width: { xs: "100%", sm: 500 },
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          sx={{
            borderBottom: 1,
            borderColor: "primary2.main",
            pl: 1,
            py: 0.5,
            color: "primary2.light",
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              px: 1,
              py: 0.5,
              color: "primary2.light",
            }}
          >
            {modalTitle}
          </Typography>
          {/* <Typography
            variant="h4"
            sx={{
              pl: 1,
              py: 0.5,
              color: grey[500],
            }}
          >
            {modalSubTitle}
          </Typography> */}
          {type == "player" ? (
            <Button
              variant="text"
              onClick={handleRemoveFromModal}
              startIcon={<DeleteForeverTwoToneIcon sx={{ mr: -1 }} />}
              sx={{
                backgroundColor: red[400],
                color: "primary2.dark",
                py: 0.5,
                px: 1,
              }}
            >
              Remove
            </Button>
          ) : null}
        </Stack>

        <List
          sx={{
            // p: 0,
            py: 0.5,
            px: 0.5,

            columnCount: 3,
          }}
        >
          {sortedPlayers.map((playerName: any, index: number) => (
            // <MenuItem
            //   // sx={{ backgroundColor: "black" }}
            //   key={index}
            //   onClick={() => handleSelect(playerName)}
            //   sx={{ px: 0, py: 0 }}
            // >
            <Button
              key={index}
              onClick={() => handleSelect(playerName)}
              disabled={selectedPlayers?.includes(playerName)}
              variant={
                selectedPlayers?.includes(playerName) ? "contained" : "text"
              }
              //   disabled={comparedPlayer === playerName}
              sx={{
                px: 0.5,
                my: 0.2,
                minWidth: "100%",
                // backgroundColor:
                //   selectedPlayer === playerName || comparedPlayer === playerName
                //     ? grey[400]
                //     : null,
                // color:
                //   selectedPlayer === playerName || comparedPlayer === playerName
                //     ? "black"
                //     : null,
                fontSize: { xs: "0.7rem", sm: "0.875rem" },
              }}
            >
              {playerName}
              {stats[playerName].wins > 0 ? (
                <Stack
                  alignItems={"center"}
                  spacing={0}
                  direction={"row"}
                  sx={{ pl: 0.5 }}
                >
                  <EmojiEvents
                    sx={{
                      // pl: 0.5,
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      color: selectedPlayers?.includes(playerName)
                        ? "black"
                        : "gold",
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: selectedPlayers?.includes(playerName)
                        ? "black"
                        : "gold",
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                    }}
                  >
                    {stats[playerName].wins}x
                  </Typography>
                </Stack>
              ) : null}
            </Button>
            // </MenuItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
}
