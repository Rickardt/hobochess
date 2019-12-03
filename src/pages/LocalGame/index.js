import React from "react";
import { GameContainer } from "../../components";

import "./style.css";

function LocalGame({ history }) {
  return (
    <div className="local-game-container">
      <GameContainer history={history} />
    </div>
  );
}
export default LocalGame;
