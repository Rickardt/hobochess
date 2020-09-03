import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  GET_GAME_BY_ID,
  GET_USER_BY_ID
} from "../../gql/queries/examleQueries";
import { CREATE_GAME } from "../../gql/mutations/exampleMutations";

import { getUserList, getUser } from "../../util/authFunctions";

function ProfileFeed() {
  const [tabVaule, setTabValue] = useState(0);
  const [gameList, setGameList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState("");

  const [createGame, { createdGameData }] = useMutation(CREATE_GAME);

  const [executeGetCurrentGame, { loading, data }] = useLazyQuery(
    GET_GAME_BY_ID
  );

  if (data) {
  }
  //81202156-5865-4e71-9bc9-5dd8f22b091b Rickie game
  //5ff7b736-9cd4-4a79-bd14-b779a79207b3
  useEffect(() => {
    async function getGameData() {
      executeGetCurrentGame({
        variables: { id: "81202156-5865-4e71-9bc9-5dd8f22b091b" }
      });
    }

    async function checkUserSession() {
      const data = await getUser();
      if (data) {
        setUserId(data.attributes.sub);
      }
    }
    checkUserSession();

    async function getUsers() {
      const users = await getUserList(10);
      setUserList(users);
    }
    getGameData();
    getUsers();
  }, []);

  async function createNewGame(challengedUserId) {
    const today = new Date();
    createGame({
      variables: {
        input: {
          size: 8,
          createdByUserId: userId,
          playerOne: userId,
          playerTwo: challengedUserId,
          playerTurn: userId,
          startedTime: today,
          lastMoveTime: today,
          requiredLengthToWin: 5
        }
      }
    });
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }

  function renderGameList(gameData) {
    if (gameData) {
      return [
        <Link
          key="test-link"
          to={"/online-game/" + gameData.getHohochessGameData.id}
        >
          <Card>
            <h4>Game: {gameData.getHohochessGameData.id}</h4>
            <h3>Started: {gameData.getHohochessGameData.startedTime}</h3>
            <h3>Last move: {gameData.getHohochessGameData.lastMoveTime}</h3>

            <h3>
              {gameData.getHohochessGameData.win
                ? "Game is over"
                : "Game is in progress!"}
            </h3>
            <h3>Game size: {gameData.getHohochessGameData.size}</h3>
            <h4>Go to game!</h4>
          </Card>
        </Link>
      ];
    } else {
      return [];
    }
  }

  function renderUsersList() {
    return userList.map((user, i) => {
      console.log("user: ", user);
      return (
        <Card key={i}>
          <p>{user.Username}</p>
          <p>Member since: {user.UserCreateDate.toString()}</p>
          <p>ID: {user.Attributes[0].Value}</p>
          <Button
            onClick={() => {
              createNewGame(user.Attributes[0].Value);
            }}
          >
            Challenge!
          </Button>
        </Card>
      );
    });
  }

  function handleChangeTab(val) {
    setTabValue(val);
  }
  function handleChange(event, val) {
    setTabValue(val);
  }

  return (
    <div>
      {" "}
      <Tabs
        key="tabs"
        value={tabVaule}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Games" />
        <Tab label="People online" />
      </Tabs>
      ,
      <SwipeableViews
        key="views"
        axis={"x"}
        index={tabVaule}
        onChangeIndex={handleChangeTab}
      >
        <TabPanel value={tabVaule} index={0}>
          <h1>Games</h1>
          {loading ? <CircularProgress /> : renderGameList(data)}
        </TabPanel>
        <TabPanel value={tabVaule} index={1}>
          <h1>People online</h1>
          <div style={{ overflow: "auto", maxHeight: "500px" }}>
            {renderUsersList()}
          </div>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

export default ProfileFeed;
