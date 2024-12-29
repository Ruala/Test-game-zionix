"use client";

import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Button,
  Slider,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

import { IGameResult } from "@/interfaces/game";
import { GameCondition } from "@/constants/gameCondition";

import HistoryTable from "@/components/HistoryTable";
import ResultSnackbar from "@/components/ResultSnackbar";

import styles from "./styles.module.scss";

type GameConditionType = (typeof GameCondition)[keyof typeof GameCondition];

const DiceGame: React.FC = () => {
  const [threshold, setThreshold] = useState<number>(20);
  const [condition, setCondition] = useState<GameConditionType>(
    GameCondition.UNDER,
  );
  const [currentResult, setCurrentResult] = useState<IGameResult | null>(null);
  const [history, setHistory] = useState<IGameResult[]>([]);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const handlePlay = useCallback(() => {
    const roll = Math.floor(Math.random() * 100) + 1;

    const success =
      (condition === GameCondition.OVER && roll > threshold) ||
      (condition === GameCondition.UNDER && roll < threshold);

    const result: IGameResult = {
      result: roll,
      condition,
      success,
      time: new Date().toLocaleTimeString("en-US", { hour12: false }),
      threshold,
    };

    setCurrentResult(result);
    setHistory((prev) => {
      const newHistory = [result, ...prev];
      return newHistory.slice(0, 10);
    });

    setAlertOpen(true);
  }, [condition, threshold]);

  const handleCloseAlert = useCallback(() => {
    setAlertOpen(false);
  }, []);

  const marks = useMemo(
    () => [
      { value: 0, label: "0" },
      { value: 100, label: "100" },
    ],
    [],
  );

  return (
    <Box className={styles.container}>
      <Box className={styles.game}>
        <Box className={styles.result}>
          <Typography variant="h1">{currentResult?.result ?? 100}</Typography>
        </Box>

        <Box>
          <RadioGroup
            className={styles.condition}
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            row
          >
            <FormControlLabel
              value={GameCondition.UNDER}
              control={<Radio color="secondary" size="small" />}
              label={GameCondition.UNDER}
              labelPlacement="start"
              sx={{ marginRight: 0 }}
            />
            <FormControlLabel
              value={GameCondition.OVER}
              control={<Radio color="secondary" size="small" />}
              label={GameCondition.OVER}
              labelPlacement="start"
              sx={{ marginRight: 0 }}
            />
          </RadioGroup>

          <Slider
            value={threshold}
            color="secondary"
            onChange={(_, newValue) => setThreshold(newValue as number)}
            valueLabelDisplay="on"
            shiftStep={20}
            min={0}
            max={100}
            marks={marks}
            size="small"
          />
        </Box>

        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={handlePlay}
          fullWidth
        >
          Play
        </Button>
      </Box>

      {history.length > 0 && <HistoryTable history={history} />}

      <ResultSnackbar
        currentResult={currentResult}
        alertOpen={alertOpen}
        onClose={handleCloseAlert}
      />
    </Box>
  );
};

export default DiceGame;
