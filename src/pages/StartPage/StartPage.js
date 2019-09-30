import React from "react";
import Button from "@material-ui/core/Button";
import "./StartPage.css";
import { Link } from "react-router-dom";

function StartPage({ history }) {
  function onPlayLocalClick() {
    history.push("/local-game");
  }

  return (
    <div className="start-page">
      <div className="start-page-button-container">
        <h1>HOBOCHESS</h1>
        <Button variant="contained">Log in</Button>
        <Button variant="contained" onClick={onPlayLocalClick}>
          Play local game
        </Button>
      </div>
    </div>
  );
}

export default StartPage;
