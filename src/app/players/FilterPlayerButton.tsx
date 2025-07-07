import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import PlayerModal from "./PlayerModal";
import SelectedPlayerButton from "./SelectedPlayerButton";

export default function FilterPlayerButton({
  stats,
  type = "primary",
  indexOfPlayer = null,
  playerToShow = null,
  selectedPlayers,
  setSelectedPlayers,
  lockedPlayer = null,
  modalTitle = "Select a Player",
  buttonTitle = "Select a Player",
  buttonTextVariant = "h3",
  modalSubTitle = null,
  colorMap = null,
}: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = () => {
    setSelectedPlayers((prev: string[]) => {
      if (!prev) return null;
      const newList = [...prev];
      newList.splice(indexOfPlayer, 1); // Remove the item at the given index
      return newList;
    });
    handleClose();
  };

  return (
    <Box sx={{ py: 0.5 }}>
      {type === "primary" ? (
        <Button
          onClick={handleClick}
          startIcon={<PersonAddAltIcon sx={{ mr: -0.75, width: 18 }} />}
          variant="outlined"
          sx={{ py: 0.5, px: 1 }}
        >
          <Typography
            variant={buttonTextVariant}
            sx={{ fontSize: { sm: "1rem" } }}
          >
            {buttonTitle}
          </Typography>
        </Button>
      ) : type === "player" ? (
        <SelectedPlayerButton
          handleClick={handleClick}
          selectedPlayer={playerToShow}
          setSelectedPlayers={setSelectedPlayers}
          indexOfPlayer={indexOfPlayer}
          textColor={colorMap[indexOfPlayer]}
          handleRemove={handleRemove}
        />
      ) : null}
      {type === "primary" ? (
        <PlayerModal
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
          stats={stats}
          modalTitle={modalTitle}
          modalSubTitle={modalSubTitle}
        />
      ) : type === "player" ? (
        <PlayerModal
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
          stats={stats}
          modalTitle={`Edit Player ${indexOfPlayer + 1} or `}
          modalSubTitle={modalSubTitle}
          indexOfPlayer={indexOfPlayer}
          type={type}
          handleRemove={handleRemove}
        />
      ) : null}
    </Box>
  );
}
