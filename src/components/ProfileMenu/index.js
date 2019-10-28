import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
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

function Profile() {
  return (
    <div>
      <div>
        <Avatar>
          <AccountCircleIcon />
        </Avatar>
        Rickard
      </div>
      <div role="presentation">
        <List>
          <ListItemText primary="Menu" />
        </List>
        <Divider />
        <List>
          <ListItem button key="close">
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary="Profile settings" />
          </ListItem>
          <Divider />
          <ListItem button key="exit-game">
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default Profile;
