import { SET_BOARD, UPDATE_BOARD } from "../constants/actions";
import { updateBoard, checkForFiveInARow } from "../util/boardFunctions";

const boardReducer = (state, action) => {
  switch (action.type) {
    case SET_BOARD:
      return {
        ...state,
        board: action.board
      };
    case UPDATE_BOARD:
      const { coordinates, owner } = action.update;
      const board = updateBoard(state.board, coordinates, owner);
      let win = checkForFiveInARow(board, coordinates, owner);
      console.log("Is it a win? ", win);
      return {
        ...state,
        board: board
      };

    default:
      return state;
  }
};

export default boardReducer;
