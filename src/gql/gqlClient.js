import { Auth } from "aws-amplify";
import { createAppSyncLink, AUTH_TYPE } from "aws-appsync";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const API_URL =
  "https://wyo23ywn7ve57ezgb6kv72nh5q.appsync-api.eu-west-1.amazonaws.com/graphql";

const WS_URL =
  "ws://wyo23ywn7ve57ezgb6kv72nh5q.appsync-api.eu-west-1.amazonaws.com/graphql";

const REGION = "eu-west-1";

const httpLink = createHttpLink({
  uri: API_URL
});

const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true
  }
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

const awsLink = createAppSyncLink({
  url: API_URL,
  region: REGION,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    credentials: () => Auth.currentCredentials(),
    jwtToken: async () =>
      (await Auth.currentSession()).getAccessToken().getJwtToken()
  },
  complexObjectsCredentials: () => Auth.currentCredentials(),
  options: {
    reconnect: true
  }
});

export default new ApolloClient({
  link: awsLink.concat(httpLink).concat(wsLink),
  cache: new InMemoryCache()
});
