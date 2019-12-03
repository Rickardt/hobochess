import boardReducer from "./boardReducer";
import playerReducer from "./playerReducer";

const mainReducer = ({ boardState, playerState }, action) => {
  console.log("ACTION: ", action);
  const state = {
    boardState: boardReducer(boardState, action),
    playerState: playerReducer(playerState, action)
  };
  console.log("STATE: ", state);
  return state;
};

export default mainReducer;
