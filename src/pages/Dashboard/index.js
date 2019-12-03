import React from "react";
import {
  Authenticator,
  ProfileMenu,
  ProfileFeed,
  ProfileScoreBoard
} from "../../components";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/react-hooks";
import { TEST_POST } from "../../gql/mutations/exampleMutations";
import { getSession } from "../../util/authFunctions";
import "./style.css";

function Dashboard({ hostory }) {
  const [putPost, { data }] = useMutation(TEST_POST);
  async function sendPost() {
    const data = await getSession();
    console.log(data);
    putPost("123", "Hello world");
  }

  return (
    <Authenticator>
      <div className="dashboard-container">
        <div className="profile-container">
          <ProfileMenu />
        </div>
        <div className="feed-container">
          <Button onClick={sendPost}> GQL TEST</Button>
          <ProfileFeed />
        </div>
        <div className="score-board-container">
          <ProfileScoreBoard />
        </div>
      </div>
    </Authenticator>
  );
}
export default Dashboard;
