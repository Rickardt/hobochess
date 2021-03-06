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

function checkForFiveInARow(
  board,
  clickedCoordinates,
  player,
  requiredLengtToWin
) {
  const isHorizontalWin = checkHorizontalWin(
    board,
    clickedCoordinates,
    player,
    requiredLengtToWin
  );
  const isVerticalWin = checkVerticalWin(
    board,
    clickedCoordinates,
    player,
    requiredLengtToWin
  );
  const isDiagonalWin = checkDiagonalWin(
    board,
    clickedCoordinates,
    player,
    requiredLengtToWin
  );
  let fiveInARow = false;
  let winningCoordinates = [];
  if (isHorizontalWin.isWin) {
    fiveInARow = true;
    winningCoordinates = isHorizontalWin.coordinates;
  } else if (isVerticalWin.isWin) {
    winningCoordinates = isVerticalWin.coordinates;
    fiveInARow = true;
  } else if (isDiagonalWin.isWin) {
    winningCoordinates = isDiagonalWin.coordinates;
    fiveInARow = true;
  }

  let checkResault = {
    clickedCoordinates: clickedCoordinates.isWin,
    isHorizontalWin: isHorizontalWin.isWin,
    isVerticalWin: isVerticalWin,
    isDiagonalWin: isDiagonalWin,
    fiveInARow: fiveInARow,
    winningCoordinates: winningCoordinates
  };
  return checkResault;
}

function checkHorizontalWin(
  board,
  clickedCoordinates,
  player,
  requiredLengtToWin
) {
  const { xCoordinate, yCoordinate } = clickedCoordinates;
  let win = { isWin: false, coordinates: null };
  let sequence = [];
  let lookForWin = true;
  console.log("Check horizontal win");

  let lookForWinLeft = true;

  let j = 0;
  while (lookForWinLeft) {
    let coordinate = xCoordinate - j;
    if (coordinate < 0) {
      break;
    }
    let box = board[coordinate][yCoordinate];
    if (box.owner === player) {
      sequence.push(box);
    } else {
      break;
    }
    if (j === requiredLengtToWin) {
      lookForWinLeft = false;
    }
    j++;
  }
  let i = 1;
  while (lookForWinLeft) {
    let coordinate = xCoordinate + i;
    if (coordinate > board.length - 1) {
      break;
    }
    let box = board[coordinate][yCoordinate];
    if (box.owner === player) {
      sequence.push(box);
    } else {
      break;
    }
    if (i === requiredLengtToWin) {
      lookForWinLeft = false;
    }
    i++;
  }
  win.coordinates = sequence;
  console.log("Sequence: ", sequence);
  if (sequence.length >= requiredLengtToWin) {
    win.isWin = true;
  }
  return win;
}

function checkVerticalWin(
  board,
  clickedCoordinates,
  player,
  requiredLengtToWin
) {
  const { xCoordinate, yCoordinate } = clickedCoordinates;
  let win = { isWin: false, coordinates: null };
  let sequence = [];
  let lookForWin = true;
  console.log("Check vertical win");

  let j = 0;
  while (lookForWin) {
    let coordinate = yCoordinate - j;
    if (coordinate < 0) {
      break;
    }
    let box = board[xCoordinate][coordinate];
    if (box.owner === player) {
      sequence.push(box);
    } else {
      break;
    }
    if (j === requiredLengtToWin) {
      lookForWin = false;
    }
    j++;
  }
  let i = 1;
  while (lookForWin) {
    let coordinate = yCoordinate + i;
    if (coordinate > board.length - 1) {
      break;
    }
    let box = board[xCoordinate][coordinate];
    if (box.owner === player) {
      sequence.push(box);
    } else {
      break;
    }
    if (i === requiredLengtToWin) {
      lookForWin = false;
    }
    i++;
  }
  win.coordinates = sequence;
  console.log("Sequence: ", sequence);
  if (sequence.length >= requiredLengtToWin) {
    win.isWin = true;
  }
  return win;
}

function checkDiagonalWin(
  board,
  clickedCoordinates,
  player,
  requiredLengtToWin,
  switchDirection = false
) {
  const { xCoordinate, yCoordinate } = clickedCoordinates;
  let win = { isWin: false, coordinates: null };
  let sequence = [];
  let lookForWin = true;
  console.log("Check diagonal win");

  let lookForWinLeft = true;

  let j = 0;
  while (lookForWinLeft) {
    const coorinateX = switchDirection ? xCoordinate - j : xCoordinate + j;
    const coorinateY = switchDirection ? yCoordinate - j : yCoordinate - j;
    const xBoundary = coorinateX > board.length - 1 || coorinateX < 0;
    const yBoundary = coorinateY > board.length - 1 || coorinateY < 0;
    if (xBoundary || yBoundary) {
      break;
    }
    let box = board[coorinateX][coorinateY];
    if (box.owner === player) {
      sequence.push(box);
    } else {
      break;
    }
    if (j === requiredLengtToWin) {
      lookForWinLeft = false;
    }
    j++;
  }
  let i = 1;
  while (lookForWinLeft) {
    const coorinateX = switchDirection ? xCoordinate + i : xCoordinate - i;
    const coorinateY = switchDirection ? yCoordinate + i : yCoordinate + i;
    const xBoundary = coorinateX > board.length - 1 || coorinateX < 0;
    const yBoundary = coorinateY > board.length - 1 || coorinateY < 0;
    if (xBoundary || yBoundary) {
      break;
    }
    let box = board[coorinateX][coorinateY];
    if (box.owner === player) {
      sequence.push(box);
    } else {
      break;
    }
    if (i === requiredLengtToWin) {
      lookForWinLeft = false;
    }
    i++;
  }
  win.coordinates = sequence;
  console.log("Sequence: ", sequence);
  if (sequence.length >= requiredLengtToWin) {
    win.isWin = true;
  }
  if (!win.isWin && !switchDirection) {
    console.log("SwWITCH DIRECTION");
    win = checkDiagonalWin(
      board,
      clickedCoordinates,
      player,
      requiredLengtToWin,
      true
    );
  }
  return win;
}

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
