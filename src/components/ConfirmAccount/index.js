import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import { DASHBOARD } from "../../constants/routes";
import { confirmCreatedAccount } from "../../util/authFunctions";

function ConfirmAccount({ history }) {
  const [loading, setLoading] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function submitConfirmationCode() {
    setLoading(true);
    const response = await confirmCreatedAccount("RickieT", confirmationCode);
    console.log(response);
    if (response === "SUCCESS") {
      setLoading(false);
      history.push(DASHBOARD);
    } else {
      setErrorMessage(response.message);
    }
    setLoading(false);
  }

  return [
    <div className="login-credentials-container" key="confirmation-container">
      <h1>Confirm your account</h1>
      <TextField
        label="Confirmation code"
        margin="normal"
        onChange={e => setConfirmationCode(e.target.value)}
      />

      {loading && <LinearProgress />}
      <span className="error-message">{errorMessage}</span>
    </div>,
    <div
      className="confirmation-button-container"
      key="confirmation-button-container"
    >
      <Button variant="contained" onClick={submitConfirmationCode}>
        Login
      </Button>
    </div>
  ];
}

export default ConfirmAccount;
