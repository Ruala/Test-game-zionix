import React from "react";
import { ThemeProvider } from "@mui/material/styles";

import theme from "@/styles/theme";

import DiceGame from "@/components/DiceGame";

const Home: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <DiceGame />
    </ThemeProvider>
  );
};

export default Home;
