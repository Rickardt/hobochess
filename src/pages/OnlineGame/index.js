import React from "react";
import { OnlineGameContainer, Authenticator } from "../../components";
import Board from "../../models/board";
import "./style.css";
import { GET_GAME_BY_ID } from "../../gql/queries/examleQueries";
import { SUBSCRIBE_TO_GAME_BY_ID } from "../../gql/subscriptions/exampleSubscription";

import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import Box from "../../components/Box/Box";

function OnlineGame({ history, location, match }) {
  const gameId = match.params.id;
  const initialGameData = useQuery(GET_GAME_BY_ID, {
    variables: { id: gameId }
  });

  const { data, loading } = useSubscription(SUBSCRIBE_TO_GAME_BY_ID, {
    variables: {
      id: gameId
    }
  });

  let gameData;
  console.log("DATA");
  if (initialGameData.data) {
    gameData = initialGameData.data.getHohochessGameData;
  }
  const {
    size,
    requiredLengtToWin,
    playerOneCoordinates,
    playerTwoCoordinates,
    playerTurn,
    playerOne,
    playerTwo
  } = gameData ? gameData : {};
  const board = new Board(size, Box, requiredLengtToWin)
    .setPlayerOne(playerOne)
    .setPlayerTwo(playerTwo)
    .setPlayerTurn(playerTurn);

  board.initializeBoard();

  return (
    <Authenticator>
      <div className="local-game-container">
        <OnlineGameContainer
          history={history}
          gameId={gameId}
          board={board}
          playerOneCoordinates={playerOneCoordinates}
          playerTwoCoordinates={playerTwoCoordinates}
          playerTurn={playerTurn}
          playerOne={playerOne}
          playerTwo={playerTwo}
          loading={loading}
          gameData={data}
        />
      </div>
    </Authenticator>
  );
}
export default OnlineGame;
