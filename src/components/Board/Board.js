import React, { useState, useEffect } from "react";
import Box from "../Box/Box";
import "./Board.css";
import { initializeBoard, checkForFiveInARow } from "../../util/boardFunctions";
import { getTurn } from "../../util/playerFunctions";
import { useStateValue } from "../../state/state";
import { SET_BOARD } from "../../constants/actions";

function Board({ size }) {
  const [turn, setTurn] = useState(0);
  const [{ board }, dispatch] = useStateValue();
  let initialBoard;

  useEffect(() => {
    initialBoard = initializeBoard({ size, onBoxClick, Component: Box });
    dispatch({
      type: SET_BOARD,
      board: initialBoard
    });
  }, []);

  function onBoxClick(coordinates) {
    console.log(coordinates);
    checkForFiveInARow(board, coordinates, turn);
    setTurn(getTurn(turn));
    return getTurn(turn);
  }

  return <div className="board">{board}</div>;
}

export default Board;
