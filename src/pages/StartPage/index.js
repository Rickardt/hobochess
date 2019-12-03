import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import "./StartPage.css";
import { Link } from "react-router-dom";
import { CREATE_GAME, LOGIN_PAGE } from "../../constants/routes";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";

import Background from "../../components/Background/Background";

function StartPage({ history }) {
  function onPlayLocalClick() {
    history.push(CREATE_GAME);
  }
  function onLoginClick() {
    history.push(LOGIN_PAGE);
  }

  return (
    <div className="start-page-button-container">
      <Grow in={true} style={{ transformOrigin: "0 0 0" }}>
        <h1>HOBÓCHESS</h1>
      </Grow>
      <Grow
        in={true}
        style={{ transformOrigin: "0 0 0" }}
        {...{ timeout: 500 }}
      >
        <Card className="width-hundred-percent">
          <CardActionArea onClick={onLoginClick}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Log in
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Log in and challenge your friends in a game of hobochess
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grow>
      <Grow
        in={true}
        style={{ transformOrigin: "0 0 0" }}
        {...{ timeout: 700 }}
      >
        <Card className="width-hundred-percent">
          <CardActionArea onClick={onPlayLocalClick}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Play local
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Want to play right now? click here to start a new local game
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grow>
    </div>
  );
}

export default StartPage;
