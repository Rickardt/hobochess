import { setNextTurn } from "../util/playerFunctions";

import { SET_TURN, SET_NEXT_TURN } from "../constants/actions";

export const initialState = {
  turn: 1
};

const playerReducer = (state, action) => {
  switch (action.type) {
    case SET_NEXT_TURN:
      let nextTurn = setNextTurn(state.turn);
      return {
        ...state,
        turn: nextTurn
      };
    case SET_TURN:
      return {
        ...state,
        turn: action.turn
      };

    default:
      return state;
  }
};

export default playerReducer;
