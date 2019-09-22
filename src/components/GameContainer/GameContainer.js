import React, { useState } from "react";
import classNames from "classnames";
import { useStateValue } from "../../state/state";
import Board from "../Board/Board";

function GameContainer({}) {
  const [{ playerState, boardState }, dispatch] = useStateValue();
  const { fiveInARow, winningPlayer } = boardState;
  const { turn } = playerState;

  function renderWin() {
    return (
      <div>
        Winning player: {winningPlayer}
        <img src="https://i.pinimg.com/originals/00/ed/7e/00ed7ea3401fe1605ecaffeca76dc7ec.gif" />
      </div>
    );
  }
  function renderGameStats() {
    return <div>Player turn {turn}</div>;
  }
  return (
    <div>
      {!fiveInARow && renderGameStats()}
      {fiveInARow ? renderWin() : <Board size={7} requiredLengtToWin={3} />}
    </div>
  );
}
export default GameContainer;
