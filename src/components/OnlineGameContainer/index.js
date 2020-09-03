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
import { getUser } from "../../util/authFunctions";

function OnlineGameContainer({
  history,
  gameId,
  board,
  playerOneCoordinates,
  playerTwoCoordinates,
  playerTurn,
  playerOne,
  playerTwo,
  loading,
  gameData
}) {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");

  const yourTurnText = "Your turn!";
  const waitingForOpponentText = "Waiting for opponent";
  const size = board.getSize();

  const [updateCurrentGame, { updatedGameResponse }] = useMutation(
    UPDATE_CURRENT_GAME
  );
  const isMyTurn = board.isMyTurn(userId);
  console.log("user", user);
  console.log("board", board);
  function onClick(coordinates) {
    // if (isMyTurn) {
    const x = coordinates.xCoordinate;
    const y = coordinates.yCoordinate;
    const ownerNumber = board.isUserPlayerOne(userId) ? 1 : 2;
    board.setCoordinateOwner(x, y, ownerNumber);
    const pOneCoordinates = board.getPlayerOneCoordinates();
    const pTwoCoordinates = board.getPlayerTwoCoordinates();
    const today = new Date().toString();
    const nextPlayerTurn = board.getNextPlayerTurn();

    updateCurrentGame({
      variables: {
        input: {
          id: gameId,
          lastMoveTime: today,
          playerOneCoordinates: pOneCoordinates,
          playerTwoCoordinates: pTwoCoordinates,
          lastPlacedCoordinate: { x, y },
          playerTurn: nextPlayerTurn,
          win: false,
          winningPlayer: "na"
        }
      }
    });
    // }
  }
  board.setOnClickCallback(onClick);
  board.setPlayerOneCoordinates(playerOneCoordinates);
  board.setPlayerTwoCoordinates(playerTwoCoordinates);
  useEffect(() => {
    async function checkUserSession() {
      const data = await getUser();
      if (data) {
        setUser(data);
        setUserId(data.attributes.sub);
      }
    }
    checkUserSession();
  }, []);
  return (
    <div className="game-container">
      {loading && !isMyTurn ? (
        <LinearProgress
          style={{ position: "absolute", top: "0px", width: "100%" }}
        />
      ) : null}
      <GameStatsSnack text={isMyTurn ? yourTurnText : waitingForOpponentText} />
      <GameMenu turn={1} history={history} />
      <OnlineBoard size={size} board={board} disableBoxes={!isMyTurn} />
    </div>
  );
}
export default OnlineGameContainer;
