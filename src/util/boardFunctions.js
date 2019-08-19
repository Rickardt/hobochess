import React from "react";

function initializeBoard({ size, onBoxClick, Component }) {
  let arrayX = new Array(size).fill();

  for (let i = 0; i < size; i++) {
    let column = new Array(size).fill();
    for (let j = 0; j < size; j++) {
      column[j] = (
        <Component
          key={j}
          xCoordinate={i}
          yCoordinate={j}
          onClick={onBoxClick}
        />
      );
    }
    arrayX[i] = <div key={i}>{column}</div>;
  }

  return arrayX;
}

function checkForFiveInARow(board, clickedCoordinates, player) {
  const isHorizontalWin = checkHorizontalWin(board, clickedCoordinates);
  const isVerticalWin = checkVerticalWin(board, clickedCoordinates);
  const isDiagonalWin = checkDiagonalWin(board, clickedCoordinates);
  const fiveInARow = isHorizontalWin || isVerticalWin || isDiagonalWin;

  let checkResault = {
    clickedCoordinates: clickedCoordinates,
    isHorizontalWin: isHorizontalWin,
    isVerticalWin: isVerticalWin,
    isDiagonalWin: isDiagonalWin,
    fiveInARow: fiveInARow,
    winningCoordinates: []
  };
  return checkResault;
}

function checkHorizontalWin(board, clickedCoordinates, player) {
  const { xCoordinate, yCoordinate } = clickedCoordinates;
  console.log(board[(xCoordinate, yCoordinate)]);
}

function checkVerticalWin(board, clickedCoordinates, player) {}

function checkDiagonalWin(board, clickedCoordinates, player) {}

export { initializeBoard, checkForFiveInARow };
