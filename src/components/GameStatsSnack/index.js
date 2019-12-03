import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CrossIcon from "@material-ui/icons/ClearOutlined";
import CircleIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";

const GameStatsSnack = ({ text, turn }) => {
  const [open, setOpen] = useState(false);
  let Icon = CrossIcon;
  if (turn === 2) {
    Icon = CrossIcon;
  } else {
    Icon = CircleIcon;
  }

  const handleOpen = () => {
    setOpen({ open: true });
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 3000);
  }, []);

  const style = {
    display: "flex",
    justifyContent: "center"
  };

  return (
    <Snackbar
      style={style}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      key={"top, horizontal"}
      open={open}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={
        <span>
          {text}
          <Icon />
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
};

export default GameStatsSnack;
