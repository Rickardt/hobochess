import React from "react";
import { StateProvider } from "./state/state";
import logo from "./logo.svg";
import "./App.css";
import Box from "./components/Box/Box";
import Board from "./components/Board/Board";
import boardReducer from "./reducers/boardReducer";
import playerReducer from "./reducers/playerReducer";

export const initialState = {
  boardState: [],
  playerState: {
    turn: 1
  }
};
const mainReducer = ({ boardState, playerState }, action) => {
  console.log("ACTION: ", action);
  return {
    boardState: boardReducer(boardState, action),
    playerState: playerReducer(playerState, action)
  };
};

function App() {
  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <div className="App">
        <Board size={10} />
      </div>
    </StateProvider>
  );
}

export default App;
