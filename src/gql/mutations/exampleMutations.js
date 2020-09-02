import { gql } from "apollo-boost";

const TEST_POST = gql`
  mutation PutPost($title: String!) {
    putPost(title: $title) {
      id
      title
    }
  }
`;

const CREATE_GAME = gql`
  mutation createHohochessGameData($input: CreateHohochessGameDataInput!) {
    createHohochessGameData(input: $input) {
      size
      id
    }
  }
`;

const UPDATE_CURRENT_GAME = gql`
  mutation UpdateHohochessGameData($input: UpdateHohochessGameDataInput!) {
    updateHohochessGameData(input: $input) {
      id
    }
  }
`;

const ADD_GAME_ID_TO_USERS = gql`
  mutation UpdateHohochessGameData($input: UpdateHohochessGameDataInput!) {
    updateHohochessGameData(input: $input) {
      size
      id
    }
  }
`;

const CREATE_USER_DATA = gql`
  mutation createUserData($input: CreateUserDataInput!) {
    createUserData(input: $input) {
      id
      currentGames
      previousGames
      isOnline
    }
  }
`;
const UPDATE_USER_DATA = gql`
  mutation updateUserData($input: UpdateUserDataInput!) {
    updateUserData(input: $input) {
      id
      currentGames
      previousGames
      isOnline
    }
  }
`;

export {
  TEST_POST,
  CREATE_GAME,
  UPDATE_CURRENT_GAME,
  CREATE_USER_DATA,
  UPDATE_USER_DATA
};
