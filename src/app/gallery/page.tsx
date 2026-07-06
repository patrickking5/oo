"use client";

import { useHeader } from "@/context/HeaderContext";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Close,
  Download,
  Share,
} from "@mui/icons-material";
import {
  Box,
  Dialog,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";

type GalleryPhoto = {
  fileName: string;
  date: string;
};

const photoRoot = "/photos/throughTheYears/web";

const photos: GalleryPhoto[] = [
  { fileName: "IMG_2647.jpg", date: "2020-07-10" },
  { fileName: "IMG_2662.jpg", date: "2020-07-11" },
  { fileName: "IMG_2674.jpg", date: "2020-07-11" },
  { fileName: "IMG_2680.jpg", date: "2020-07-11" },
  { fileName: "IMG_2683.jpg", date: "2020-07-11" },
  { fileName: "IMG_2706.jpg", date: "2020-07-12" },
  { fileName: "IMG_2709.jpg", date: "2020-07-12" },
  { fileName: "IMG_2717.jpg", date: "2020-07-13" },
  { fileName: "IMG_3792.jpg", date: "2023-07-14" },
  { fileName: "IMG_3808.jpg", date: "2023-07-15" },
  { fileName: "IMG_3834.jpg", date: "2023-07-16" },
  { fileName: "IMG_1722.jpg", date: "2023-07-16" },
  { fileName: "IMG_3840.jpg", date: "2023-07-16" },
  { fileName: "IMG_6825.jpg", date: "2024-07-14" },
  { fileName: "IMG_6832.jpg", date: "2024-07-14" },
  { fileName: "IMG_6842.jpg", date: "2024-07-14" },
  { fileName: "IMG_6848.jpg", date: "2024-07-14" },
  { fileName: "IMG_9844.jpg", date: "2025-08-19" },
  { fileName: "IMG_9873.jpg", date: "2025-08-22" },
  { fileName: "IMG_9882.jpg", date: "2025-08-23" },
  { fileName: "IMG_9891.jpg", date: "2025-08-24" },
  { fileName: "IMG_9897.jpg", date: "2025-08-24" },
  { fileName: "IMG_3622.jpg", date: "2025-08-24" },
];

const photoUrl = (photo: GalleryPhoto) => `${photoRoot}/${photo.fileName}`;

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

export default function Gallery() {
  const { setHeaderContent } = useHeader();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setHeaderContent({ title: "Gallery", icon: "gallery", topChildren: null });
  }, [setHeaderContent]);

  const photosByYear = useMemo(
    () =>
      photos.reduce<Record<string, GalleryPhoto[]>>((groups, photo) => {
        const year = photo.date.slice(0, 4);
        groups[year] = [...(groups[year] ?? []), photo];
        return groups;
      }, {}),
    [],
  );

  const closePhoto = () => setSelectedIndex(null);

  const changePhoto = useCallback((direction: number) => {
    setSelectedIndex((current) => {
      if (current === null) return null;
      return (current + direction + photos.length) % photos.length;
    });
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") changePhoto(-1);
      if (event.key === "ArrowRight") changePhoto(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changePhoto, selectedIndex]);

  const sharePhoto = async (photo: GalleryPhoto) => {
    const url = new URL(photoUrl(photo), window.location.origin).href;

    try {
      if (navigator.share) {
        const response = await fetch(url);
        const file = new File([await response.blob()], photo.fileName, {
          type: "image/jpeg",
        });
        const shareData = {
          title: "OLL Open — Through the Years",
          files: [file],
        };

        if (!navigator.canShare || navigator.canShare(shareData)) {
          await navigator.share(shareData);
        } else {
          await navigator.share({
            title: "OLL Open — Through the Years",
            text: "A photo from the OLL Open",
            url,
          });
        }
        return;
      }

      await navigator.clipboard.writeText(url);
      setMessage("Photo link copied");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setMessage("Sharing is not available on this device");
    }
  };

  const selectedPhoto = selectedIndex === null ? null : photos[selectedIndex];

  return (
    <Box sx={{ bgcolor: "black", px: { xs: 1.5, sm: 2.5, lg: 4 }, pb: 3 }}>
      <Box sx={{ maxWidth: 1400, mx: "auto" }}>
        <Typography variant="h1" sx={{ color: "primary.main", pt: 1 }}>
          Through the Years
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5, mb: 0 }}>
          A look back at the people and moments that make the OLL Open.
        </Typography>
        <Typography
          variant="caption"
          sx={{
            mb: 1,
            borderBottom: 1,
            borderColor: "primary2.main",
            display: "block",
            color: "primary.light",
          }}
        >
          (More photos coming soon. Contact Duck King with photos if you want
          them added!)
        </Typography>

        {Object.entries(photosByYear)
          .reverse()
          .map(([year, yearPhotos]) => (
            <Box component="section" key={year} sx={{ mb: 4 }}>
              <Stack
                direction="row"
                alignItems="baseline"
                spacing={1}
                sx={{ mb: 1.25 }}
              >
                <Typography variant="h2">{year}</Typography>
                <Typography variant="caption">
                  {yearPhotos.length}{" "}
                  {yearPhotos.length === 1 ? "photo" : "photos"}
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, minmax(0, 1fr))",
                    sm: "repeat(3, minmax(0, 1fr))",
                    lg: "repeat(4, minmax(0, 1fr))",
                  },
                  gap: { xs: 1, sm: 1.5 },
                }}
              >
                {yearPhotos.map((photo) => {
                  const index = photos.indexOf(photo);
                  return (
                    <Box
                      component="button"
                      type="button"
                      key={photo.fileName}
                      onClick={() => setSelectedIndex(index)}
                      aria-label={`View OLL Open photo from ${formatDate(photo.date)}`}
                      sx={{
                        appearance: "none",
                        bgcolor: "primary2.dark",
                        border: 1,
                        borderColor: "primary2.main",
                        borderRadius: 2,
                        cursor: "pointer",
                        overflow: "hidden",
                        p: 0,
                        position: "relative",
                        aspectRatio: "4 / 3",
                        transition: "border-color 150ms, transform 150ms",
                        "&:hover, &:focus-visible": {
                          borderColor: "primary.main",
                          transform: "translateY(-2px)",
                          outline: "none",
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={photoUrl(photo)}
                        alt={`OLL Open, ${formatDate(photo.date)}`}
                        loading="lazy"
                        sx={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          ))}
      </Box>

      <Dialog
        fullScreen
        open={selectedPhoto !== null}
        onClose={closePhoto}
        PaperProps={{ sx: { bgcolor: "rgba(0, 0, 0, 0.96)" } }}
      >
        {selectedPhoto && (
          <Stack sx={{ height: "100dvh", minHeight: 0 }}>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ flexShrink: 0, minHeight: 64, px: { xs: 0.5, sm: 2 } }}
            >
              <IconButton
                onClick={closePhoto}
                aria-label="Close photo"
                sx={{ color: "white" }}
              >
                <Close />
              </IconButton>
              <Box sx={{ flex: 1, minWidth: 0, px: 1 }}>
                <Typography variant="body1">
                  {formatDate(selectedPhoto.date)}
                </Typography>
                <Typography variant="caption">
                  {(selectedIndex ?? 0) + 1} of {photos.length}
                </Typography>
              </Box>
              <IconButton
                component="a"
                href={photoUrl(selectedPhoto)}
                download={selectedPhoto.fileName}
                aria-label="Download photo"
                sx={{ color: "white" }}
              >
                <Download />
              </IconButton>
              <IconButton
                onClick={() => sharePhoto(selectedPhoto)}
                aria-label="Share photo"
                sx={{ color: "white" }}
              >
                <Share />
              </IconButton>
            </Stack>

            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                position: "relative",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Box
                component="img"
                src={photoUrl(selectedPhoto)}
                alt={`OLL Open, ${formatDate(selectedPhoto.date)}`}
                sx={{
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
              <IconButton
                onClick={() => changePhoto(-1)}
                aria-label="Previous photo"
                sx={{
                  position: "absolute",
                  left: { xs: 4, sm: 16 },
                  bgcolor: "rgba(0, 0, 0, 0.55)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(0, 0, 0, 0.75)" },
                }}
              >
                <ArrowBackIosNew />
              </IconButton>
              <IconButton
                onClick={() => changePhoto(1)}
                aria-label="Next photo"
                sx={{
                  position: "absolute",
                  right: { xs: 4, sm: 16 },
                  bgcolor: "rgba(0, 0, 0, 0.55)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(0, 0, 0, 0.75)" },
                }}
              >
                <ArrowForwardIos />
              </IconButton>
            </Box>
          </Stack>
        )}
      </Dialog>

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
        message={message}
      />
    </Box>
  );
}
