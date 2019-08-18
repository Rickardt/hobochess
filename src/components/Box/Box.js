import React, { useState, useEffect } from "react";
import "./Box.css";

function Box({ yCoordinate, xCoordinate, onClick }) {
  const [checked, setChecked] = useState(false);
  const [owner, setOwner] = useState(undefined);
  const [coordinate] = useState({ xCoordinate, yCoordinate });

  function setBoxState() {
    if (checked) return;
    setChecked(true);
    let turn = onClick(coordinate);
    setOwner(turn);
  }

  return (
    <div
      className={`box ${
        owner === undefined ? null : owner ? "circle" : "cross"
      }`}
      onClick={setBoxState}
    />
  );
}
export default Box;
