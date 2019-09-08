import React, { useState } from "react";
import classNames from "classnames";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CircleIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import SvgIcon from "@material-ui/core/SvgIcon";

import CrossIcon from "@material-ui/icons/ClearOutlined";
import { useStateValue } from "../../state/state";
import "./Box.css";

function Box({ yCoordinate, xCoordinate, onClick, initialAnimationTimeout }) {
  const [{ playerState }, dispatch] = useStateValue();
  const [checked, setChecked] = useState(false);
  const [owner, setOwner] = useState(0);
  const DefaultIcon = () => <SvgIcon />;
  const [boxProperties, setBoxProperties] = useState({
    color: "default",
    icon: DefaultIcon
  });
  const [coordinates] = useState({ xCoordinate, yCoordinate });
  const { icon, color } = boxProperties;
  const Icon = icon;

  function setBoxState() {
    if (checked) return;
    const boxOwner = playerState.turn;
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

    const turn = onClick(coordinates, boxOwner);
    console.log("Box turn", boxOwner);
  }

  return (
    <Checkbox
      checked={checked}
      onChange={setBoxState}
      color={color}
      style={{ padding: "0" }}
      value={owner}
      icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 90 }} />}
      checkedIcon={<Icon style={{ fontSize: 90 }} />}
    />
  );
}
export default Box;
