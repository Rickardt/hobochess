import React from "react";

function initializeBoard({ size, component, onClick }) {
  let arrayX = new Array(size).fill();

  for (let i = 0; i < size; i++) {
    let column = new Array(size).fill();
    for (let j = 0; j < size; j++) {
      column[j] = createBoxObject({
        xCoordinate: i,
        yCoordinate: j,
        owner: 0,
        component: component,
        onClick: onClick,
        key: `${i}${j}`
      });
    }
    arrayX[i] = column;
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
  // const { xCoordinate, yCoordinate } = clickedCoordinates;
  // console.log(board[(xCoordinate, yCoordinate)]);
}

function checkVerticalWin(board, clickedCoordinates, player) {}

function checkDiagonalWin(board, clickedCoordinates, player) {}

function createBoxObject({
  xCoordinate,
  yCoordinate,
  owner,
  component,
  onClick,
  key
}) {
  const Component = component;
  return {
    xCoordinate: xCoordinate,
    yCoordinate: yCoordinate,
    owner: owner,
    component: (
      <Component
        xCoordinate={xCoordinate}
        yCoordinate={yCoordinate}
        owner={owner}
        onClick={onClick}
        key={key}
      />
    )
  };
}

function updateBoxObject({
  xCoordinate,
  yCoordinate,
  owner,
  component,
  onClick
}) {
  return {
    xCoordinate: xCoordinate,
    yCoordinate: yCoordinate,
    owner: owner,
    component: component
  };
}

function updateBoard(board, coordinates, owner) {
  const { xCoordinate, yCoordinate } = coordinates;
  let updatedBoard = board;
  updatedBoard[xCoordinate][yCoordinate] = updateBoxObject({
    xCoordinate: xCoordinate,
    yCoordinate: yCoordinate,
    owner: owner,
    component: updatedBoard[xCoordinate][yCoordinate].component
  });
  return updatedBoard;
}

export {
  initializeBoard,
  checkForFiveInARow,
  createBoxObject,
  updateBoard,
  updateBoxObject
};
