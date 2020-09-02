import React, { useEffect } from "react";
import Box from "../Box/Box";
import Column from "../Column/Column";
import "./style.css";
import { initializeBoard, checkForFiveInARow } from "../../util/boardFunctions";

function OnlineBoard({ size, requiredLengtToWin, board }) {
  function renderBoard() {
    let renderedBoard = [];

    if (board.getBoard().length) {
      const boardObj = board.getBoard();
      boardObj.forEach((column, i) => {
        let columnHolder = column.map((box, j) => {
          return box.component;
        });
        renderedBoard.push([
          <Column key={i} timeOut={i * 200} children={columnHolder} />
        ]);
      });
    }
    return renderedBoard;
  }

  return <div className="board">{renderBoard()}</div>;
}

export default OnlineBoard;
