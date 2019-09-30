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
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import StartPage from "./pages/StartPage/StartPage";
import LoginPage from "./pages/LoginPage/LoginPage";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const initialState = {
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
    <div className="App">
      <Router history={history}>
        <StateProvider initialState={initialState} reducer={mainReducer}>
          <ThemeProvider theme={theme}>
            <Route path="/" exact component={StartPage} />
            <Route path="/local-game" component={GameContainer} />
            <Route path="/login" component={LoginPage} />
          </ThemeProvider>
        </StateProvider>
      </Router>
    </div>
  );
}

export default App;
