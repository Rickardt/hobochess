import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./LoginPage.css";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { CONFIRM_ACCOUNT, LOGIN_PAGE } from "../../constants/routes";
import { Login, CreateAccount, ConfirmAccount } from "../../components";
import { Router, Route, Link, Switch } from "react-router-dom";

function LoginPage({ history }) {
  const [tabVaule, setTabValue] = useState(0);

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

  function handleChangeTab(val) {
    setTabValue(val);
  }
  function handleChange(event, val) {
    setTabValue(val);
  }

  return (
    <div className="login-container">
      <Route
        exact
        path={LOGIN_PAGE}
        render={() => [
          <Tabs
            key="tabs"
            value={tabVaule}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Login" />
            <Tab label="Create account" />
          </Tabs>,
          <SwipeableViews
            key="views"
            axis={"x"}
            index={tabVaule}
            onChangeIndex={handleChangeTab}
          >
            <TabPanel value={tabVaule} index={0}>
              <Login history={history} />
            </TabPanel>
            <TabPanel value={tabVaule} index={1}>
              <CreateAccount history={history} />
            </TabPanel>
          </SwipeableViews>
        ]}
      />
      <Route
        path={CONFIRM_ACCOUNT}
        render={() => <ConfirmAccount history={history} />}
      />
    </div>
  );
}

export default LoginPage;
