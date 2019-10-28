import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function ProfileFeed() {
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
        </TabPanel>
        <TabPanel value={tabVaule} index={1}>
          <h1>People online</h1>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

export default ProfileFeed;
