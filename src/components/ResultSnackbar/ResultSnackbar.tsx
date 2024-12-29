import React from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

import { IGameResult } from "@/interfaces/game";
import { GameCondition } from "@/constants/gameCondition";

interface IResultSnackbarProps {
  currentResult: IGameResult | null;
  alertOpen: boolean;
  onClose: () => void;
}

const ResultSnackbar: React.FC<IResultSnackbarProps> = ({
  currentResult,
  alertOpen,
  onClose,
}) => {
  if (!currentResult) return null;

  const resultMessage = currentResult.success ? "You Won!" : `You Lost.`;

  const description = `Number was ${
    currentResult.condition === GameCondition.UNDER &&
    currentResult.result > currentResult.threshold
      ? "higher"
      : currentResult.condition === GameCondition.OVER &&
          currentResult.result < currentResult.threshold
        ? "lower"
        : "exactly at threshold"
  }`;

  return (
    <Snackbar
      key={currentResult?.result}
      open={alertOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={onClose}
      sx={{
        "@media (min-width: 600px)": {
          top: "1rem",
          width: "600px",
          maxWidth: "100%",
        },
      }}
    >
      <Alert
        variant="filled"
        severity={currentResult.success ? "success" : "error"}
        sx={{ width: "100%" }}
      >
        {currentResult.success ? (
          resultMessage
        ) : (
          <>
            <AlertTitle>{resultMessage}</AlertTitle>
            {description}
          </>
        )}
      </Alert>
    </Snackbar>
  );
};

export default ResultSnackbar;
