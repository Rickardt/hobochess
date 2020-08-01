import { Auth } from "aws-amplify";
import { createAppSyncLink, AUTH_TYPE } from "aws-appsync";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const API_URL =
  "https://wyo23ywn7ve57ezgb6kv72nh5q.appsync-api.eu-west-1.amazonaws.com/graphql";
const REGION = "eu-west-1";

const httpLink = createHttpLink({
  uri: API_URL
});

const awsLink = createAppSyncLink({
  url: API_URL,
  region: REGION,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    credentials: () => Auth.currentCredentials(),
    jwtToken: async () =>
      (await Auth.currentSession()).getAccessToken().getJwtToken()
  },
  complexObjectsCredentials: () => Auth.currentCredentials()
});

export default new ApolloClient({
  link: awsLink.concat(httpLink),
  cache: new InMemoryCache()
});
