import React, { useState, useEffect } from "react";
import { useStateValue } from "../../state/state";
import Board from "../Board/Board";
import GameMenu from "../GameMenu";
import "./style.css";
import { GameStatsSnack } from "../";
import moment from "moment";

function GameContainer({ history }) {
  const [{ playerState, boardState }, dispatch] = useStateValue();
  const {
    fiveInARow,
    winningPlayer,
    requiredLengtToWin,
    boardSize
  } = boardState;
  const { turn } = playerState;
  const snackText = "Player turn: ";
  const date = new moment().valueOf();
  console.log(date);

  useEffect(() => {}, []);

  function renderWin() {
    return (
      <div>
        Winning player: {winningPlayer}
        <img src="https://i.pinimg.com/originals/00/ed/7e/00ed7ea3401fe1605ecaffeca76dc7ec.gif" />
      </div>
    );
  }
  console.log("ASD", boardSize);
  return (
    <div className="game-container">
      <GameStatsSnack text={snackText} turn={turn} />
      <GameMenu turn={turn} history={history} />
      {fiveInARow ? (
        renderWin()
      ) : (
        <Board size={boardSize} requiredLengtToWin={requiredLengtToWin} />
      )}
    </div>
  );
}
export default GameContainer;
