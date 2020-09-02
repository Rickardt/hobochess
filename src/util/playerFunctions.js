function setNextTurn(turn) {
  return turn === 1 ? 2 : 1;
}

function isMyTurn(playerTurn, currentUser) {
  return playerTurn === currentUser;
}

function isUserPartOfGame(players, currentUser) {
  return players.some(id => id === currentUser);
}

export { setNextTurn, isMyTurn, isUserPartOfGame };
