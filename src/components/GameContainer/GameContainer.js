import React, { useState } from "react";
import classNames from "classnames";
import { useStateValue } from "../../state/state";
import Board from "../Board/Board";

function GameContainer({}) {
  const [{ playerState, boardState }, dispatch] = useStateValue();
  const { fiveInARow } = boardState;
  const { turn } = playerState;

  function renderWin() {
    return (
      <img src="https://i.pinimg.com/originals/00/ed/7e/00ed7ea3401fe1605ecaffeca76dc7ec.gif" />
    );
  }
  function renderGameStats() {
    return <div>Player turn {turn}</div>;
  }
  return (
    <div>
      {renderGameStats()}
      {fiveInARow ? renderWin() : <Board size={7} requiredLengtToWin={3} />}
    </div>
  );
}
export default GameContainer;
