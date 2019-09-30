import { SET_BOARD, UPDATE_BOARD } from "../constants/actions";
import { updateBoard, checkForFiveInARow } from "../util/boardFunctions";

export const initialState = {
  fiveInARow: false,
  board: [],
  requiredLengtToWin: 5,
  winningPlayer: null
};

const boardReducer = (state, action) => {
  switch (action.type) {
    case SET_BOARD:
      const { board, requiredLengtToWin } = action.setBoard;
      return {
        ...state,
        board: board,
        requiredLengtToWin: requiredLengtToWin
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
      console.log("Is it a win? ", win);
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
