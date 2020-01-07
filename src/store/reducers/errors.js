import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';
/*
 * The errors reducer is used to either add or remove a message from state
 */
export default (state = { message: null }, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return { ...state, message: action.error };
    case REMOVE_ERROR:
      return { ...state, message: null };
    default:
      return state;
  }
};
