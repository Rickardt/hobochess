import Amplify, { Auth, API } from "aws-amplify";
import AWS from "aws-sdk";

let nextToken;

async function getUserList(limit) {
  let allUsers = [];
  let params = {
    UserPoolId: "eu-west-1_9lAjKfcMK"
  };
  const cognito = new AWS.CognitoIdentityServiceProvider();
  const rawUsers = await cognito.listUsers(params).promise();
  allUsers = allUsers.concat(rawUsers.Users);
  return allUsers;
}

function login(username, password) {
  return Auth.signIn({ username: username, password: password })
    .then(user => {
      let context = {};
      context.user = user;
      switch (user.challengeName) {
        case "SMS_MFA" || "SOFTWARE_TOKEN_MFA":
          context.mfaRequired = true;
          break;
        case "NEW_PASSWORD_REQUIRED":
          context.newPasswordRequired = true;
          break;
        case "MFA_SETUP":
          context.mfaSetup = true;
          break;
        default:
      }

      storeToken(user.Session);
      return context;
    })
    .catch(err => {
      let context = {};
      context.error = err;
      switch (err.code) {
        case "UserNotConfirmedException":
          context.error.message = "This user is not confirmed yet";
          break;
        case "PasswordResetRequiredException":
          context.error.message = "Reset your password to continue";
          break;
        case "NotAuthorizedException":
          context.error.message = "Incorrect password";
          break;
        case "UserNotFoundException":
          context.error.message = "User not found";
          break;
        default:
      }

      return context;
    });
}

function createAccount({ username, password, email, phone_number }) {
  let context = {};
  return Auth.signUp({
    username,
    password,
    attributes: {
      email
      // other custom attributes
    }
  })
    .then(data => {
      return data;
    })
    .catch(err => {
      context.error = err;
      return context;
    });
}
function confirmCreatedAccount(username, code) {
  return Auth.confirmSignUp(username, code, {})
    .then(data => data)
    .catch(err => err);
}
function logout() {
  return Auth.signOut()
    .then(data => data)
    .catch(err => err);
}

function storeToken(token) {
  localStorage.setItem("token", token);
}
async function getToken() {
  const session = await getSession();
  if (session) {
    return session.accessToken.jwtToken;
  } else {
    return undefined;
  }
}
function removeToken() {
  localStorage.removeItem("token");
}

function getSession() {
  return Auth.currentSession()
    .then(data => data)
    .catch(err => console.log(err));
}

async function getUser() {
  return await Auth.currentAuthenticatedUser({
    bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  })
    .then(user => user)
    .catch(err => console.log(err));
}

function getUserId() {
  return getUser();
}

export {
  login,
  getToken,
  removeToken,
  createAccount,
  confirmCreatedAccount,
  logout,
  getSession,
  getUser,
  getUserId,
  getUserList
};
