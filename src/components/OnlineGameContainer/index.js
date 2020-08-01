import React, { useState, useEffect } from "react";
import { useStateValue } from "../../state/state";
import GameMenu from "../GameMenu";
import "./style.css";
import { GameStatsSnack, OnlineBoard } from "../";
import moment from "moment";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import { SUBSCRIBE_TO_GAME_BY_ID } from "../../gql/subscriptions/exampleSubscription";
import { UPDATE_CURRENT_GAME } from "../../gql/mutations/exampleMutations";
import LinearProgress from "@material-ui/core/LinearProgress";

function OnlineGameContainer({
  history,
  gameId,
  board,
  playerOneCoordinates,
  playerTwoCoordinates
}) {
  const yourTurnText = "Your turn!";
  const waitingForOpponentText = "Waiting for opponent";
  const size = board.getSize();
  const { data, loading } = useSubscription(SUBSCRIBE_TO_GAME_BY_ID, {
    variables: {
      id: gameId
    }
  });
  const [updateCurrentGame, { updatedGameResponse }] = useMutation(
    UPDATE_CURRENT_GAME
  );
  function onClick(coordinates) {
    const x = coordinates.xCoordinate;
    const y = coordinates.yCoordinate;
    board.setCoordinateOwner(x, y, 1);
    const pOneCoordinates = board.getPlayerOneCoordinates();
    const pTwoCoordinates = board.getPlayerTwoCoordinates();
    console.log(pOneCoordinates);
    const today = new Date();
    updateCurrentGame({
      variables: {
        input: {
          id: gameId,
          lastMoveTime: today,
          playerOneCoordinates: pOneCoordinates,
          playerTwoCoordinates: pTwoCoordinates,
          lastPlacedCoordinate: { x, y },
          playerTurn: "2e965173-73ae-4a55-9e64-fb9995ecd604",
          win: false,
          winningPlayer: "na"
        }
      }
    });
  }
  board.setOnClickCallback(onClick);
  board.setPlayerOneCoordinates(playerOneCoordinates);
  board.setPlayerTwoCoordinates(playerTwoCoordinates);

  return (
    <div className="game-container">
      {loading ? (
        <LinearProgress
          style={{ position: "absolute", top: "0px", width: "100%" }}
        />
      ) : null}
      <GameStatsSnack text={yourTurnText} />
      <GameMenu turn={1} history={history} />
      <OnlineBoard size={size} board={board} />
    </div>
  );
}
export default OnlineGameContainer;
