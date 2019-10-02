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

import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme/theme";
import { Router, Route, Link, Switch } from "react-router-dom";

import {
  StartPage,
  ErrorBoundary,
  CreateGame,
  LocalGame,
  LoginPage
} from "./pages";

import Background from "./components/Background/Background";

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
    <ErrorBoundary>
      <div className="App">
        <StateProvider initialState={initialState} reducer={mainReducer}>
          <ThemeProvider theme={theme}>
            <Router history={history}>
              <Route
                render={({ location }) => (
                  <Background location={location}>
                    <Switch location={location}>
                      <Route path="/" exact component={StartPage} />
                      <Route path="/local-game" component={LocalGame} />
                      <Route path="/create-local-game" component={CreateGame} />
                      <Route path="/login" component={LoginPage} />
                    </Switch>
                  </Background>
                )}
              />
            </Router>
          </ThemeProvider>
        </StateProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
