import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CircleIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import SvgIcon from "@material-ui/core/SvgIcon";
import Fade from "@material-ui/core/Fade";

import CrossIcon from "@material-ui/icons/ClearOutlined";
import { useStateValue } from "../../state/state";
import "./Box.css";

function Box({
  yCoordinate,
  xCoordinate,
  onClick,
  initialAnimationTimeout,
  initialBoxOwner
}) {
  const [{ playerState, boardState }, dispatch] = useStateValue();
  const [checked, setChecked] = useState(false);
  const [owner, setOwner] = useState(0);
  const DefaultIcon = () => <SvgIcon />;
  const [boxProperties, setBoxProperties] = useState({
    color: "default",
    icon: DefaultIcon
  });
  const [coordinates] = useState({ xCoordinate, yCoordinate });
  const { board } = boardState;

  const { icon, color } = boxProperties;
  const Icon = icon;

  useEffect(() => {
    if (initialBoxOwner) {
      setBoxOwner();
    }
  }, []);

  function calculateTimeout() {
    const center = board.length / 2;
    const xCenter = (center % xCoordinate) * 100;
    const yCenter = (center % yCoordinate) * 100;
    return xCenter + yCenter;
  }

  function setBoxOwner() {
    const boxOwner = initialBoxOwner ? initialBoxOwner : playerState.turn;
    setOwner(boxOwner);
    if (boxOwner === 1) {
      setBoxProperties({
        color: "primary",
        icon: CircleIcon
      });
    } else {
      setBoxProperties({
        color: "secondary",
        icon: CrossIcon
      });
    }
    setChecked(true);
  }

  function setBoxState() {
    if (checked) return;
    setBoxOwner();
    const turn = onClick(coordinates, owner);
  }

  return (
    <Fade in={true} style={{ transformOrigin: "0 0 0" }} {...{ timeout: 1000 }}>
      <Checkbox
        checked={checked}
        onChange={setBoxState}
        color={color}
        style={{ padding: "0" }}
        value={owner}
        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 90 }} />}
        checkedIcon={<Icon style={{ fontSize: 90 }} />}
      />
    </Fade>
  );
}
export default Box;
