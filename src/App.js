import React from "react";
import { StateProvider } from "./state/state";
import logo from "./logo.svg";
import "./App.css";
import boardReducer, {
  initialState as boardState
} from "./reducers/boardReducer";
import playerReducer, {
  initialState as playerState
} from "./reducers/playerReducer";
import GameContainer from "./components/GameContainer/GameContainer";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme/theme";

export const initialState = {
  boardState,
  playerState
};
const mainReducer = ({ boardState, playerState }, action) => {
  console.log("ACTION: ", action);
  const state = {
    boardState: boardReducer(boardState, action),
    playerState: playerReducer(playerState, action)
  };
  console.log("STATE: ", state);
  return state;
};

function App() {
  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <GameContainer />
        </div>
      </ThemeProvider>
    </StateProvider>
  );
}

export default App;
