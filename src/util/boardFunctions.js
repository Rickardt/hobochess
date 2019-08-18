import React from "react";
import Box from "../components/Box/Box";
import Column from "../components/Column/Column";

function initializeBoard({ size, onBoxClick }) {
  let arrayX = new Array(size).fill();

  for (let i = 0; i < size; i++) {
    let column = new Array(size).fill();
    for (let j = 0; j < size; j++) {
      column[j] = (
        <Box key={j} xCoordinate={i} yCoordinate={j} onClick={onBoxClick} />
      );
    }
    arrayX[i] = <div key={i}>{column}</div>;
  }

  return arrayX;
}

export { initializeBoard };
