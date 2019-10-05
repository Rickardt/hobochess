import React from "react";
import { Redirect } from "react-router-dom";
import { LOGIN_PAGE } from "../../constants/routes";
import { getToken } from "../../util/authFunctions";

function Authenticator({ children }) {
  if (getToken()) {
    return children;
  } else {
    return <Redirect to={LOGIN_PAGE} />;
  }
}

export default Authenticator;
