import { SET_BOARD, UPDATE_BOARD } from "../constants/actions";
import { updateBoard } from "../util/boardFunctions";

const boardReducer = (state, action) => {
  switch (action.type) {
    case SET_BOARD:
      return {
        ...state,
        board: action.board
      };
    case UPDATE_BOARD:
      const { coordinates, owner } = action.update;
      let board = updateBoard(state.board, coordinates, owner);
      return {
        ...state,
        board: board
      };

    default:
      return state;
  }
};

export default boardReducer;
