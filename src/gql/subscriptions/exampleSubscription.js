import { gql } from "apollo-boost";

const SUBSCRIBE_TO_GAME_BY_ID = gql`
  subscription OnUpdateHohochessGameData($id: ID!) {
    onUpdateHohochessGameData(id: $id) {
      id
      size
      createdByUserId
      playerOne
      playerTwo
      playerTurn
      startedTime
      lastMoveTime
      playerOneCoordinates {
        x
        y
      }
      playerTwoCoordinates {
        x
        y
      }
      lastPlacedCoordinate {
        x
        y
      }
      requiredLengthToWin
      win
      winningPlayer
    }
  }
`;
export { SUBSCRIBE_TO_GAME_BY_ID };
