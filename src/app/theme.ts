import { blue, grey } from "@mui/material/colors";
import { ThemeOptions, createTheme } from "@mui/material/styles";
import { PaletteColorOptions } from "@mui/material/styles/createPalette";

const lineHeight = 1.5;

declare module "@mui/material/styles" {
  interface Palette {
    primary2: PaletteColorOptions;
  }

  interface PaletteOptions {
    primary2: PaletteColorOptions;
  }

  interface Palette {
    third: PaletteColorOptions;
  }

  interface PaletteOptions {
    third: PaletteColorOptions;
  }

  interface Palette {
    fourth: PaletteColorOptions;
  }

  interface PaletteOptions {
    fourth: PaletteColorOptions;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    outlined_colored: true; // Add your custom variant name here
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#69bb7c",
      dark: "#1f4d29",
      light: "#a6d6b1",
    },
    secondary: {
      main: blue[500], //0% light - secondary text
      dark: blue[900], //80% dark - background
      light: blue[200], //30% light - primary text
    },

    primary2: {
      main: grey[700],
      dark: "	#202020",
      light: grey[300],
    },
    third: {
      main: "#ff9800",
      dark: "#995b00",
      light: "#ffb74d",
    },
    fourth: {
      main: "#b684ad", //0% light - secondary text
      dark: "#241a23", //80% dark - background
      light: "#cca9c6", //30% light - primary text
    },
  },
  typography: {
    fontFamily: "'Geist', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontSize: "1.6rem",
      fontWeight: 700,
      color: "white",
      lineHeight: lineHeight,
      [createTheme().breakpoints.up("sm")]: {
        fontSize: "1.875rem",
      },
    },
    h2: {
      fontSize: "1.25rem",
      fontWeight: 700,
      color: "white",
      lineHeight: lineHeight,
      [createTheme().breakpoints.up("sm")]: {
        fontSize: "1.375rem",
      },
    },
    h3: {
      fontSize: "1.125rem",
      fontWeight: 700,
      color: "white",
      lineHeight: lineHeight,
      [createTheme().breakpoints.up("sm")]: {
        fontSize: "1.125rem",
      },
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 700,
      color: "white",
      lineHeight: lineHeight,
      [createTheme().breakpoints.up("sm")]: {
        fontSize: "1rem",
      },
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "white",
      lineHeight: lineHeight,
      [createTheme().breakpoints.up("sm")]: {
        fontSize: "1rem",
      },
    },
    body2: {
      fontSize: "1rem",
      fontWeight: 400,
      color: grey[400],
      lineHeight: lineHeight,
      [createTheme().breakpoints.up("sm")]: {
        fontSize: "1rem",
      },
    },
    caption: {
      fontSize: "0.875rem",
      fontWeight: 400,
      color: grey[400],
      lineHeight: lineHeight,
      [createTheme().breakpoints.up("sm")]: {
        fontSize: "0.875rem",
      },
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "black", // Black background for the table
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "black", // Black background for table container
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: "black", // Black background for the table
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "black", // Black background for header
          "& .MuiTableCell-root": {
            color: "white", // White text for header cells
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          backgroundColor: "black", // Black background for body
          // "& .MuiTableRow-root:hover": {
          //   backgroundColor: grey[900], // Hover effect
          // },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "white", // White text for all table cells
          borderColor: grey[800], // Light border color
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10, // Applies to all variants
          fontSize: "1rem",
          p: 1,
        },

        contained: {
          backgroundColor: "primary.main",
          color: grey[900],
          "&:hover": {
            backgroundColor: "primary.dark",
          },
          "&.Mui-disabled": {
            backgroundColor: grey[800], // Custom background for disabled contained buttons
            color: grey[200], // Custom text color for disabled contained buttons
          },
        },
        outlined: {
          fontSize: "0.9rem",
          borderColor: grey[600],
          // border: "2px",
          border: `1px solid ${grey[600]}`,
          color: grey[500],
          "&:hover": {
            borderColor: grey[500],
            backgroundColor: grey[800],
          },
        },
        text: {
          color: grey[500],
          "&:hover": {
            backgroundColor: "gray",
            color: grey[900],
          },
          "&.Mui-disabled": {
            backgroundColor: grey[800], // Custom background for disabled contained buttons
            color: grey[500], // Custom text color for disabled contained buttons
          },
        },
      },
      variants: [
        {
          props: { variant: "outlined_colored" as any }, // Custom variant name
          style: ({ theme }: { theme: any }) => ({
            // border: 1,
            borderColor: theme.palette.primary.main, // Use theme.palette for dynamic access
            border: `1px solid ${theme.palette.primary.main}`,

            color: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              color: theme.palette.primary.light,
              // borderColor: theme.palette.primary.light,
              border: `1px solid ${theme.palette.primary.light}`,
            },
            "&.Mui-disabled": {
              borderColor: theme.palette.grey[700],
              color: theme.palette.grey[500],
            },
          }),
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: grey[200],
          "&:hover": {
            backgroundColor: grey[800],
          },
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;

// // theme.ts
// import { grey } from "@mui/material/colors";
// import { createTheme, ThemeOptions } from "@mui/material/styles";

// const lineHeight = 1.5;

// const themeOptions: ThemeOptions = {
//   palette: {
//     primary: {
//       main: "#a5c9ac",
//     },
//     secondary: {
//       main: "#b684ad",
//     },
//   },
//   typography: {
//     fontFamily: "'Geist', 'Roboto', 'Arial', sans-serif",
//     h1: {
//       fontSize: "1.875rem",
//       fontWeight: 700,
//       color: "white",
//       lineHeight: lineHeight,
//     },
//     h2: {
//       fontSize: "1.375rem",
//       fontWeight: 700,
//       color: "white",
//       lineHeight: lineHeight,
//     },
//     h3: {
//       fontSize: "1.125rem",
//       fontWeight: 700,
//       color: "white",
//       lineHeight: lineHeight,
//     },
//     h4: {
//       fontSize: "1rem",
//       fontWeight: 700,
//       color: "white",
//       lineHeight: lineHeight,
//     },
//     body1: {
//       fontSize: "1rem",
//       fontWeight: 400,
//       color: "white",
//       lineHeight: lineHeight,
//     },
//     body2: {
//       fontSize: "1rem",
//       fontWeight: 400,
//       color: "white",
//       lineHeight: lineHeight,
//     },
//     caption: {
//       fontSize: "0.875rem",
//       fontWeight: 400,
//       color: "white",
//       lineHeight: lineHeight,
//     },
//     button: { fontWeight: 700, textTransform: "none" },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 10, // Applies to all variants
//           fontSize: "1rem",
//           p: 1,
//         },
//         contained: {
//           backgroundColor: "#a5c9ac",
//           color: grey[900],
//           "&:hover": {
//             backgroundColor: "#73a47d",
//           },
//         },
//         outlined: {
//           borderColor: "#b684ad",
//           color: "#b684ad",
//           "&:hover": {
//             borderColor: "#a3749c",
//             backgroundColor: "rgba(182, 132, 173, 0.1)",
//           },
//         },
//         text: {
//           color: grey[500],
//           "&:hover": {
//             backgroundColor: "gray",
//             color: grey[900],
//           },
//         },
//       },
//     },
//   },
// };

// const theme = createTheme(themeOptions);

// export default theme;
