"use client";

import React from "react";
import { ThemeProvider } from "@mui/material/styles";

import theme from "@/styles/theme";

import DiceGame from "@/components/DiceGame";

const Home: React.FC = () => {
  console.log("Тема:", theme);
  return (
    <ThemeProvider theme={theme}>
      <DiceGame />
    </ThemeProvider>
  );
};

export default Home;
