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
  LoginPage,
  Dashboard
} from "./pages";
import {
  START_PAGE,
  LOGIN_PAGE,
  LOCAL_GAME_PAGE,
  CREATE_GAME,
  DASHBOARD
} from "./constants/routes";

import Background from "./components/Background/Background";
import { createBrowserHistory } from "history";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Auth } from "aws-amplify";
import { awsAuthConfig } from "./config/awsAuthConfig";

Auth.configure(awsAuthConfig);

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io"
});

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
      <ApolloProvider client={client}>
        <div className="App">
          <StateProvider initialState={initialState} reducer={mainReducer}>
            <ThemeProvider theme={theme}>
              <Router history={history}>
                <Route
                  render={({ location }) => (
                    <Background location={location}>
                      <Switch location={location}>
                        <Route path={START_PAGE} exact component={StartPage} />
                        <Route path={LOCAL_GAME_PAGE} component={LocalGame} />
                        <Route path={CREATE_GAME} component={CreateGame} />
                        <Route path={LOGIN_PAGE} component={LoginPage} />
                        <Route path={DASHBOARD} component={Dashboard} />
                      </Switch>
                    </Background>
                  )}
                />
              </Router>
            </ThemeProvider>
          </StateProvider>
        </div>
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default App;
