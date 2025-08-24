"use client";

import ComponentTypography from "@/components/ComponentTypography";
import CustomImage from "@/components/CustomImage";
import History from "@/components/History";
import { useHeader } from "@/context/HeaderContext";
import { PlayCircleFilledTwoTone } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { useEffect } from "react";
import home_img_metadata from "../../data/home_img_metadata.json";

export default function Home() {
  const { setHeaderContent } = useHeader();

  useEffect(() => {
    setHeaderContent({
      title: "Home",
      icon: "home",
      topChildren: (
        <Button
          href={"/results/2025?opennum=39"}
          startIcon={<PlayCircleFilledTwoTone />}
          sx={{ bgcolor: "red", color: "white" }}
        >
          2025 RESULTS!!!
        </Button>
      ),
    });
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "black",
        px: { xs: 1, md: 2 },

        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row" },
      }}
    >
      {/* <PageHeader title={"Home"} gutters={true} icon={"home"}>
        <></>
      </PageHeader> */}

      <Box
        sx={{
          flex: 1,

          mr: { xs: 0, md: 1 },
        }}
      >
        {/* <News /> */}
        <Stack
          spacing={2}
          sx={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            border: 1,
            bgcolor: "primary2.dark",
            borderColor: "primary2.main",
            px: 1,
            pb: 2,
            borderRadius: 3,
          }}
        >
          <ComponentTypography title={"2025 Oll Open"} />

          {/* <Stack direction={"row"} spacing={0.5}> */}
          <CustomImage
            alt={"Defending Champ"}
            year={"2025"}
            img_width={"60%"}
            img_metadata={home_img_metadata.champ}
          />
          {/* <Stack sx={{ width: "40%" }}>
              <Typography
                align="center"
                variant="h3"
                sx={{ color: "primary.light", textDecoration: "underline" }}
              >
                Recap
              </Typography>
              <Typography
                variant="caption"
                component="div"
                sx={{ px: 0.5, pb: 1 }}
              >
                The 2024 Oll Open crowned a new and deserving champion -{" "}
                <strong>Jay Pettit.</strong>
              </Typography>
            </Stack> */}
          {/* </Stack> */}
          <CustomImage
            alt={"Group"}
            year={"2025"}
            img_width={"100%"}
            img_metadata={home_img_metadata.group}
          />
        </Stack>
      </Box>
      <Box
        sx={{
          flex: 1,

          ml: { xs: 0, md: 1 },
        }}
      >
        <History />
      </Box>
    </Box>
  );
}
