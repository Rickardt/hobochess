import { SET_BOARD } from "../constants/actions";

export const initialState = {
  board: []
};
const boardReducer = (state, action) => {
  switch (action.type) {
    case SET_BOARD:
      return {
        ...state,
        board: action.board
      };

    default:
      return state;
  }
};

export default boardReducer;
