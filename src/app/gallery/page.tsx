"use client";

import { useHeader } from "@/context/HeaderContext";
import { useImgMetadata } from "@/context/ImgContext";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

export default function Gallery() {
  const all_img_data = useImgMetadata();
  const { setHeaderContent } = useHeader();

  useEffect(() => {
    setHeaderContent({
      title: "Gallery",
      icon: "gallery",
      topChildren: null,
    });
  }, []);
  return (
    <Box sx={{ bgcolor: "black", px: { xs: 1, md: 2 } }}>
      <Typography align="center" variant="h1" sx={{ color: "primary2.light" }}>
        Gallery Coming Soon!
      </Typography>
      {/* <Box
        sx={{
          border: 1,
          borderColor: "blue",
          width: "100%",
          p: 1,
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
        }}
      >
        \{" "}
        <Box
          sx={{
            flex: 1,
            border: 1,
            borderColor: "red",
            p: 1,
            m: 1,
          }}
        >
          Box1
        </Box>
        <Box
          sx={{
            flex: 1,
            border: 1,
            borderColor: "green",
            p: 1,
            m: 1,
          }}
        >
          Box2
        </Box>
      </Box>
      {Object.keys(all_img_data).map((year: any, index: number) => (
        <Box key={year}>
          <Typography>{year}</Typography>
          {all_img_data[year].map((image_metadata: any, index: number) => (
            <SingleImage
              key={index}
              year={year}
              image_metadata={image_metadata}
            />
          ))}
        </Box>
      ))} */}
    </Box>
  );
}
