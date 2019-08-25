import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import "./Box.css";

function Box({ yCoordinate, xCoordinate, onClick, initialAnimationTimeout }) {
  const [checked, setChecked] = useState(false);
  const [owner, setOwner] = useState(0);
  const [coordinates] = useState({ xCoordinate, yCoordinate });
  let circle = owner === 1 ? true : false;
  let cross = owner === 2 ? true : false;

  function setBoxState() {
    if (checked) return;
    setChecked(true);
    const turn = onClick(coordinates, owner);
    console.log("Box turn", turn);
    setOwner(turn);
  }

  return (
    <Checkbox
      checked={checked}
      onChange={setBoxState}
      style={{ padding: "0" }}
      className={classNames("", { circle: circle, cross: cross })}
      value={owner}
      icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 90 }} />}
      checkedIcon={<CheckBoxIcon style={{ fontSize: 90 }} />}
    />
  );
}
export default Box;
