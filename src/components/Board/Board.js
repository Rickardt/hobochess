import React, { useState } from "react";
import Box from "../Box/Box";
import "./Board.css";
import { initializeBoard } from "../../util/boardFunctions";
import { getTurn } from "../../util/playerFunctions";

function Board({ size }) {
  const [turn, setTurn] = useState(0);
  let board = initializeBoard({ size, onBoxClick });

  function onBoxClick(data) {
    setTurn(getTurn(turn));
    console.log(data);
    return getTurn(turn);
  }

  return <div className="board">{board}</div>;
}

export default Board;
