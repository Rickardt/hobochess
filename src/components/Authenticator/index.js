import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { LOGIN_PAGE } from "../../constants/routes";
import { getToken } from "../../util/authFunctions";

function Authenticator({ children }) {
  const [token, setToken] = useState(true);

  useEffect(() => {
    async function checkToken() {
      const token = await getToken();
      setToken(token);
    }
    checkToken();
  }, []);

  return (
    <Route render={() => (token ? children : <Redirect to={LOGIN_PAGE} />)} />
  );
}

export default Authenticator;
