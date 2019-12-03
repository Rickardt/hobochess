import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./Login.css";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { login } from "../../util/authFunctions";
import { isEmpty } from "../../util/validation";
import { DASHBOARD, CONFIRM_ACCOUNT } from "../../constants/routes";

function Login({ history }) {
  //const { loading, error, data } = useQuery(EXCHANGE_RATES);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function onLoginSubmit() {
    setLoading(true);
    const response = await login(username, password);
    setLoading(false);
    if (response.error) {
      if (response.error.code === "UserNotConfirmedException") {
        console.log(response.error);
        history.push(CONFIRM_ACCOUNT);
      } else {
        console.log(response.error);
        setErrorMessage(response.error.message);
      }
    } else {
      history.push(DASHBOARD);
    }
  }

  return [
    <div
      className="login-credentials-container"
      key="login-credentials-container"
    >
      <h1>Login</h1>
      <TextField
        label="Username"
        margin="normal"
        onChange={ev => setUsername(ev.target.value)}
      />
      <TextField
        id="standard-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        margin="normal"
        onChange={ev => setPassword(ev.target.value)}
      />
      {loading && <LinearProgress />}
      <span className="error-message">{errorMessage}</span>
    </div>,
    <div className="login-button-container" key="ogin-button-container">
      <Button variant="contained" onClick={onLoginSubmit}>
        Login
      </Button>
    </div>
  ];
}

export default Login;
