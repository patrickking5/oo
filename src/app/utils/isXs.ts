import { useMediaQuery } from "@mui/material";

export const isXs = (): boolean => {
  return useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
};
