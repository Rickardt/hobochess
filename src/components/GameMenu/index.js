import React, { useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import { START_PAGE } from "../../constants/routes";

import "./style.css";

function GameMenu({ turn, started, currentGameDuration, history }) {
  const [open, setOpen] = useState(false);

  function toggleMenu() {
    setOpen(!open);
  }

  function exitGame() {
    setOpen(false);
    history.push(START_PAGE);
  }

  const menuContent = () => (
    <div role="presentation">
      <List>
        <ListItemText primary={"Player turn: " + turn} />
      </List>
      <Divider />
      <List>
        <ListItem button key="close" onClick={toggleMenu}>
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          <ListItemText primary="Close menu" />
        </ListItem>
        <Divider />
        <ListItem button key="exit-game" onClick={exitGame}>
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          <ListItemText primary="Exit game" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className="side-menu-container ">
      <IconButton
        className="side-menu-icon"
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        large
        onClick={toggleMenu}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer open={open} onOpen={() => {}} onClose={() => {}}>
        {menuContent()}
      </SwipeableDrawer>
    </div>
  );
}

export default GameMenu;
