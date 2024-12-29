"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        root: {
          padding: "20px 0",
        },
        markLabel: {
          top: "42px",
        },
        valueLabel: {
          padding: "4px 12px",
          fontSize: "14px",
          lineHeight: "22px",
          borderRadius: "4px",
        },
        thumbColorSecondary: {
          "&:hover": {
            boxShadow: `0 0 0 10px rgba(156, 39, 176, 0.16)`,
          },
        },
      },
    },
  },
});

export default theme;
