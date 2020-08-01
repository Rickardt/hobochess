import React from "react";
import { StateProvider } from "./state/state";
import logo from "./logo.svg";
import "./App.css";
import { initialState as boardState } from "./reducers/boardReducer";
import { initialState as playerState } from "./reducers/playerReducer";
import mainReducer from "./reducers/mainReducer";

import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme/theme";
import { Router, Route, Link, Switch } from "react-router-dom";

import {
  StartPage,
  ErrorBoundary,
  CreateGame,
  LocalGame,
  LoginPage,
  Dashboard,
  OnlineGame
} from "./pages";
import {
  START_PAGE,
  LOGIN_PAGE,
  LOCAL_GAME_PAGE,
  CREATE_GAME,
  DASHBOARD,
  ONLINE_GAME_PAGE
} from "./constants/routes";

import Background from "./components/Background/Background";
import { createBrowserHistory } from "history";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { Auth } from "aws-amplify";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { awsAuthConfig } from "./config/awsAuthConfig";
import { getSession } from "./util/authFunctions";
import GQLClient from "./gql/gqlClient";

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
}

Auth.configure(awsAuthConfig);

const history = createBrowserHistory();

const initialState = {
  boardState,
  playerState
};

function App() {
  return (
    <ErrorBoundary>
      <ApolloProvider client={GQLClient}>
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
                        <Route path={ONLINE_GAME_PAGE} component={OnlineGame} />
                        <Route
                          path={DASHBOARD}
                          history={history}
                          component={Dashboard}
                        />
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
