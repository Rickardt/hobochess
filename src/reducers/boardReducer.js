import {
  SET_BOARD,
  UPDATE_BOARD,
  SET_BOARD_RULES,
  RESET_BOARD
} from "../constants/actions";
import { updateBoard, checkForFiveInARow } from "../util/boardFunctions";

export const initialState = {
  fiveInARow: false,
  board: [],
  requiredLengtToWin: 5,
  boardSize: 8,
  winningPlayer: null
};

const boardReducer = (state, action) => {
  switch (action.type) {
    case SET_BOARD:
      const { board } = action.setBoard;
      return {
        ...state,
        board: board
      };

    case SET_BOARD_RULES:
      const { boardSize, requiredLengtToWin } = action.setBoardRules;
      return {
        ...state,
        boardSize: boardSize,
        requiredLengtToWin: requiredLengtToWin
      };
    case RESET_BOARD:
      return {
        ...state,
        initialState
      };
    case UPDATE_BOARD:
      const { coordinates, owner } = action.update;
      const updatedBoard = updateBoard(state.board, coordinates, owner);
      let win = checkForFiveInARow(
        updatedBoard,
        coordinates,
        owner,
        state.requiredLengtToWin
      );
      return {
        ...state,
        board: updatedBoard,
        fiveInARow: win.fiveInARow,
        winningPlayer: owner
      };

    default:
      return state;
  }
};

export default boardReducer;
