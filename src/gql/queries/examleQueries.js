import { gql } from "apollo-boost";

const EXCHANGE_RATES = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const GET_GAME_BY_ID = gql`
  query getHohochessGameData($id: ID!) {
    getHohochessGameData(id: $id) {
      id
      size
      createdByUserId
      playerOne
      playerTwo
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
      win
      winningPlayer
    }
  }
`;

const GET_USER_BY_ID = gql`
  query getUserData($id: ID!) {
    getUserData(id: $id) {
      id
      currentGames
      previousGames
      isOnline
    }
  }
`;
export { EXCHANGE_RATES, GET_GAME_BY_ID, GET_USER_BY_ID };
