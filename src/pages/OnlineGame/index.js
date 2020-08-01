import React from "react";
import { OnlineGameContainer, Authenticator } from "../../components";
import Board from "../../models/board";
import "./style.css";
import { GET_GAME_BY_ID } from "../../gql/queries/examleQueries";

import { useQuery, useMutation } from "@apollo/react-hooks";
import Box from "../../components/Box/Box";

function OnlineGame({ history, location, match }) {
  const gameId = match.params.id;
  const initialGameData = useQuery(GET_GAME_BY_ID, {
    variables: { id: gameId }
  });

  let gameData;
  if (initialGameData.data) {
    gameData = initialGameData.data.getHohochessGameData;
  }
  const {
    size,
    requiredLengtToWin,
    playerOneCoordinates,
    playerTwoCoordinates
  } = gameData ? gameData : {};
  const board = new Board(size, Box, requiredLengtToWin);

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
        />
      </div>
    </Authenticator>
  );
}
export default OnlineGame;
