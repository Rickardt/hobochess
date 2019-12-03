import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Divider from "@material-ui/core/Divider";

import { useStateValue } from "../../state/state";

import { SET_BOARD_RULES } from "../../constants/actions";
import { LOCAL_GAME_PAGE } from "../../constants/routes";

function CreateGame({ history }) {
  const [{}, dispatch] = useStateValue();
  const [boardSize, setBoardSize] = useState(8);
  const [requiredLengtToWin, setRequiredLengtToWin] = useState(5);

  function onSizeChange(event, val) {
    setBoardSize(val);
  }

  function onLengthToWinChange(event, val) {
    setRequiredLengtToWin(val);
  }

  function onStartClick() {
    dispatch({
      type: SET_BOARD_RULES,
      setBoardRules: {
        boardSize: boardSize,
        requiredLengtToWin: requiredLengtToWin
      }
    });
    history.push(LOCAL_GAME_PAGE);
  }

  return (
    <div>
      <h1>Game settings</h1>
      <h2>Before we start, let's set up the board!</h2>
      <Card>
        <CardContent>
          <h2>Select the size of the board</h2>
          <div className="margin-Divider" />
          <Slider
            defaultValue={8}
            aria-labelledby="discrete-slider-always"
            step={1}
            valueLabelDisplay="on"
            min={3}
            max={20}
            onChange={(event, val) => {
              onSizeChange(event, val);
            }}
          />

          <Divider className="margin-Divider" />

          <h2>Select the required length to win</h2>
          <div className="margin-Divider" />
          <Slider
            defaultValue={5}
            aria-labelledby="discrete-slider-always"
            step={1}
            valueLabelDisplay="on"
            min={3}
            max={10}
            onChange={(event, val) => {
              onLengthToWinChange(event, val);
            }}
          />

          <div className="margin-Divider" />
        </CardContent>

        <Card className="width-hundred-percent">
          <CardActionArea onClick={onStartClick}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Start the game!
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Card>
    </div>
  );
}

export default CreateGame;
