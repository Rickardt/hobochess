import React from "react";
import Box from "../components/Box/Box";

class Board {
  size = 8;
  Component = <div></div>;
  board = [[]];
  requiredLengtToWin = 5;
  isWin = false;
  onClickCallback = null;
  playerOneCoordinates = [];
  playerTwoCoordinates = [];
  playerOne = "";
  playerTwo = "";
  playerTurn = "";

  constructor(size, component, requiredLengtToWin) {
    this.size = size;
    this.Component = component;
    this.requiredLengtToWin = requiredLengtToWin;
  }

  setPlayerOne(playerOne) {
    this.playerOne = playerOne;
    return this;
  }

  getPlayerOne() {
    return this.playerOne;
  }

  setPlayerTwo(playerTwo) {
    this.playerTwo = playerTwo;
    return this;
  }

  getPlayerTwo() {
    return this.playerTwo;
  }

  setPlayerTurn(playerTurn) {
    this.playerTurn = playerTurn;
    return this;
  }

  getPlayerTurn() {
    return this.playerTurn;
  }

  getNextPlayerTurn() {
    return this.playerTurn === this.playerOne ? this.playerTwo : this.playerOne;
  }

  isPlayerPartOfGame(id: Sumber): Boolean {
    return id === this.playerTwo || id === this.playerOne;
  }

  isMyTurn(id: String): Boolean {
    return this.playerTurn === id;
  }

  isUserPlayerOne(id: String): Boolean {
    return this.playerOne === id;
  }

  isUserPlayerTwo(id: String): Boolean {
    return this.playerTwo === id;
  }

  initializeBoard(): void {
    const Component = this.Component;
    this.board = Array(this.size).fill();
    this.board.map((item, i) => {
      this.board[i] = this.board.map((_, j) => {
        return {
          x: i,
          y: j,
          owner: 0,
          key: `${i}${j}`,
          component: (
            <Component
              key={`${i}${j}`}
              onClick={this.onClick.bind(this)}
              xCoordinate={i}
              yCoordinate={j}
            />
          )
        };
      });
    });
  }

  onClick(coordinates) {
    if (this.onClickCallback) {
      this.onClickCallback(coordinates);
    }
  }

  getComponent() {
    return this.Component;
  }

  getBoard(): Array {
    return this.board;
  }

  getSize() {
    return this.size;
  }

  getRequiredLengthToWin() {
    return this.requiredLengtToWin;
  }

  getPlayerOneCoordinates() {
    return this.playerOneCoordinates;
  }

  getPlayerTwoCoordinates() {
    return this.playerTwoCoordinates;
  }

  setCoordinateOwner(xCoordinate: int, yCoordinate: int, owner: int): void {
    this.board[xCoordinate][yCoordinate].owner = owner;
    if (owner === 1) {
      this.playerOneCoordinates.push({ x: xCoordinate, y: yCoordinate });
    } else {
      this.playerTwoCoordinates.push({ x: xCoordinate, y: yCoordinate });
    }
  }

  setPlayerOneCoordinates(playerOneCoordinates: Array): void {
    if (playerOneCoordinates) {
      const Component = this.Component;
      this.playerOneCoordinates = playerOneCoordinates.map(coor => {
        return { x: coor.x, y: coor.y };
      });
      playerOneCoordinates.forEach(coordinates => {
        const { x, y } = coordinates;
        this.board[x][y].owner = 1;
        this.board[x][y].component = (
          <Component
            key={`${x}${y}`}
            onClick={this.onClick.bind(this)}
            xCoordinate={x}
            yCoordinate={y}
            initialBoxOwner={1}
          />
        );
      });
    }
  }

  setPlayerTwoCoordinates(playerTwoCoordinates: Array): void {
    if (playerTwoCoordinates) {
      const Component = this.Component;
      this.playerTwoCoordinates = playerTwoCoordinates.map(coor => {
        return { x: coor.x, y: coor.y };
      });
      playerTwoCoordinates.forEach(coordinates => {
        const { x, y } = coordinates;
        this.board[x][y].owner = 2;
        this.board[x][y].component = (
          <Component
            key={`${x}${y}`}
            onClick={this.onClick.bind(this)}
            xCoordinate={x}
            yCoordinate={y}
            initialBoxOwner={2}
          />
        );
      });
    }
  }

  setOnClickCallback(func) {
    this.onClickCallback = func;
  }
}

export default Board;
