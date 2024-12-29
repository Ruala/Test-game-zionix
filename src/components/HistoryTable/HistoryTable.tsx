import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { IGameResult } from "@/interfaces/game";

interface IHistoryTableProps {
  history: IGameResult[];
}

const HistoryTable: React.FC<IHistoryTableProps> = ({ history }) => {
  const theme = useTheme();

  const HistoryItems = useMemo(
    () =>
      history.map((item, index) => (
        <TableRow key={index}>
          <TableCell>{item.time}</TableCell>
          <TableCell>{`${item.condition} ${item.threshold}`}</TableCell>
          <TableCell
            sx={{
              color: item.success
                ? theme.palette.success.dark
                : theme.palette.error.dark,
            }}
          >
            {item.result}
          </TableCell>
        </TableRow>
      )),
    [history, theme.palette.error.dark, theme.palette.success.dark],
  );

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                padding: "1rem",
              },
            }}
          >
            <TableCell>Time</TableCell>
            <TableCell>Guess</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{HistoryItems}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
