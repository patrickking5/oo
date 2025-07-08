import { EmojiEvents } from "@mui/icons-material";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import { Box, List, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { red } from "@mui/material/colors";
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
          outline: "none",
          border: 3,
          borderRadius: 3,
          borderColor: "primary2.main",
          backgroundColor: "primary2.dark",
          width: { xs: "100%" },
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
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
            px: { xs: 0.5 },
            mx: { xs: 0, sm: 5, md: 10, lg: 20, xl: 30 },
            columnCount: { xs: 3, md: 4, lg: 5 },
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

                fontSize: { xs: "0.7rem", sm: "0.875rem" },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "0.7rem", sm: "0.875rem" },
                  color: selectedPlayers?.includes(playerName)
                    ? "grey.400"
                    : "primary2.light",
                }}
              >
                {playerName}
              </Typography>

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
                        ? "grey.400"
                        : "gold",
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: selectedPlayers?.includes(playerName)
                        ? "grey.400"
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
