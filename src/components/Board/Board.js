import React, { useEffect } from "react";
import Box from "../Box/Box";
import Column from "../Column/Column";
import "./Board.css";
import { initializeBoard, checkForFiveInARow } from "../../util/boardFunctions";
import { setNextTurn } from "../../util/playerFunctions";
import { useStateValue } from "../../state/state";
import {
  SET_BOARD,
  SET_TURN,
  UPDATE_BOARD,
  SET_NEXT_TURN
} from "../../constants/actions";

function Board({ size }) {
  const [{ boardState, playerState }, dispatch] = useStateValue();
  const { board } = boardState;
  const { turn } = playerState;
  console.log(board);

  useEffect(() => {
    let initialBoard = initializeBoard({
      size,
      component: Box,
      onClick: onBoxClick
    });
    dispatch({
      type: SET_BOARD,
      board: initialBoard
    });
    dispatch({
      type: SET_TURN,
      turn: 1
    });
  }, []);

  function onBoxClick(coordinates, owner) {
    console.log("Clicked coordinates: ", coordinates);
    dispatch({
      type: SET_NEXT_TURN
    });
    dispatch({
      type: UPDATE_BOARD,
      update: { coordinates, owner }
    });
    return turn;
  }

  function renderBoard(boardFromState) {
    let rederedBoard = [];

    if (boardFromState) {
      boardFromState.forEach((column, i) => {
        let columnHolder = Array(column.lenth).fill();
        column.forEach((box, j) => {
          columnHolder[j] = box.component;
        });
        rederedBoard.push([
          <Column key={i} timeOut={i * 200} children={columnHolder} />
        ]);
      });
    }
    return rederedBoard;
  }

  return <div className="board">{renderBoard(board)}</div>;
}

export default Board;
