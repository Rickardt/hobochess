import React, { useEffect, useState } from "react";
import {
  Authenticator,
  ProfileMenu,
  ProfileFeed,
  ProfileScoreBoard
} from "../../components";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/react-hooks";
import { TEST_POST } from "../../gql/mutations/exampleMutations";
import { getUser } from "../../util/authFunctions";
import "./style.css";

function Dashboard({ history }) {
  const [putPost, { data }] = useMutation(TEST_POST);
  const [user, setUser] = useState({ username: "" });

  async function sendPost() {
    putPost("123", "Hello world");
  }

  useEffect(() => {
    async function checkUserSession() {
      const data = await getUser();
      if (data) {
        setUser(data);
      }
    }
    checkUserSession();
  }, []);

  return (
    <Authenticator>
      <div className="dashboard-container">
        <div className="profile-container">
          <ProfileMenu history={history} userName={user.username} />
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
