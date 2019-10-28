import React from "react";
import {
  Authenticator,
  ProfileMenu,
  ProfileFeed,
  ProfileScoreBoard
} from "../../components";
import "./style.css";

function Dashboard({ hostory }) {
  return (
    <Authenticator>
      <div className="dashboard-container">
        <div className="profile-container">
          <ProfileMenu />
        </div>
        <div className="feed-container">
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
