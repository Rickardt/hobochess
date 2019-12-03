import React from "react";
import Divider from "@material-ui/core/Divider";
import "./style.css";

function ProfileScoreBoard({ hostory }) {
  return (
    <div>
      <h1>Score board</h1>
      Rickie 30 wins <Divider />
      Peggy 29 wins
    </div>
  );
}
export default ProfileScoreBoard;
