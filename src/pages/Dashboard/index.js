import React, { useEffect, useState } from "react";
import {
  Authenticator,
  ProfileMenu,
  ProfileFeed,
  ProfileScoreBoard
} from "../../components";
import Button from "@material-ui/core/Button";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
  CREATE_GAME,
  UPDATE_CURRENT_GAME,
  CREATE_USER_DATA,
  UPDATE_USER_DATA
} from "../../gql/mutations/exampleMutations";
import {
  GET_GAME_BY_ID,
  GET_USER_BY_ID
} from "../../gql/queries/examleQueries";
import { getUser } from "../../util/authFunctions";
import "./style.css";

function Dashboard({ history }) {
  const [user, setUser] = useState({ username: "" });
  const [userId, setUserId] = useState("");
  const [gameList, setGameList] = useState([]);

  const [createGame, { createdGameData }] = useMutation(CREATE_GAME);
  const [createUser, { createdUserData }] = useMutation(CREATE_USER_DATA);
  const [updateUser, { updateUserData }] = useMutation(UPDATE_USER_DATA);

  const [updateCurrentGame, { updatedGameData }] = useMutation(
    UPDATE_CURRENT_GAME
  );

  const [executeGetUserById, { loading, currentUser }] = useLazyQuery(
    GET_USER_BY_ID,
    {
      variables: { id: userId }
    }
  );

  // function getGameData() {
  //   executeGetCurrentGame({
  //     variables: { id: "5ff7b736-9cd4-4a79-bd14-b779a79207b3" }
  //   });
  // }

  async function createNewGame() {
    const today = new Date();
    createGame({
      variables: {
        input: {
          size: 8,
          createdByUserId: userId,
          playerOne: userId,
          playerTwo: "57681af8-526b-4076-aaec-3b2ddc8205ac",
          playerTurn: userId,
          startedTime: today,
          lastMoveTime: today,
          requiredLengthToWin: 5
        }
      }
    });
  }
  async function createUserData() {
    createUser({
      variables: {
        input: {
          id: userId,
          currentGames: [],
          previousGames: [],
          isOnline: true
        }
      }
    });
  }

  async function updateGame() {
    const today = new Date();
    updateCurrentGame({
      variables: {
        input: {
          id: "5ff7b736-9cd4-4a79-bd14-b779a79207b3",
          lastMoveTime: today,
          playerOneCoordinates: [{ x: 1, y: 1 }],
          playerTwoCoordinates: [{ x: 2, y: 2 }],
          lastPlacedCoordinate: { x: 1, y: 1 },
          playerTurn: "2e965173-73ae-4a55-9e64-fb9995ecd604",
          win: false,
          winningPlayer: "na"
        }
      }
    });
  }

  function updateCurrentUser() {
    updateUser({
      variables: {
        input: {
          id: userId,
          currentGames: ["5ff7b736-9cd4-4a79-bd14-b779a79207b3"],
          previousGames: [],
          isOnline: true
        }
      }
    });
  }

  useEffect(() => {
    async function checkUserSession() {
      const data = await getUser();
      if (data) {
        console.log("userdata", data);
        setUser(data);
        setUserId(data.attributes.sub);
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
          <Button onClick={createNewGame}> Create new game</Button>
          <Button onClick={updateGame}> Update game</Button>
          <Button onClick={createNewGame}> Get current game</Button>
          <Button onClick={createUserData}> Create user</Button>
          <Button onClick={createNewGame}> Get current user</Button>
          <Button onClick={updateCurrentUser}> Update current user</Button>
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
