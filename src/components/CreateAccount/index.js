import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./CreateAccount.css";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import { createAccount } from "../../util/authFunctions";
import { isEmpty } from "../../util/validation";
import { LOGIN_PAGE } from "../../constants/routes";
import { getFormValues } from "../../util/functions";

function CreateAccount({ history }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const userData = getFormValues(event.target);
    const response = await createAccount(userData);
    setLoading(false);
    if (response.error) {
      setErrorMessage(response.error.message);
    } else {
      history.push(LOGIN_PAGE);
    }
  }

  return [
    <div
      className="create-accoumt-credentials-container"
      key="create-accoumt-credentials-container"
    >
      <h1>Create an account</h1>
      <form onSubmit={onSubmit}>
        <TextField label="Username" name="username" margin="normal" fullWidth />
        <TextField
          id="standard-password-input"
          label="E-mail"
          name="email"
          margin="normal"
          fullWidth
        />

        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          margin="normal"
          fullWidth
        />
        <span className="error-message">{errorMessage}</span>
        <Button variant="contained" type="submit">
          Create account
        </Button>
      </form>
    </div>,
    <div
      className="create-accoumt-button-container"
      key="create-accoumt-button-container"
    >
      {loading && <LinearProgress />}
    </div>
  ];
}

export default CreateAccount;
