import { SET_CURRENT_USER } from '../actionTypes';

/**
 * Each reducer has it's own state - this state is the state for the currentUser of the application
 * isAuthenticated - Boolean - true when logged in
 * user - Object - an object with all user information when logged in
 */
const DEFAULT_STATE = {
  isAuthenticated: false, // Will be true when user logged in
  user: {} // All user information when logged in
}

/**
 * @param {object} state - The state for currentUser
 * @param {string} action - an action to be dispatched. One of: SET_CURRENT_USER
 */
export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        /*
         * This !! notation ( not not ) just converts a length of zero (no keys on user) to DEFAULT_STATE
         * or converts a truthy value ( > 0 ) to true. It could be written as Boolean(...) but apparently
         * this !! is fairly common, so worth recognising
         */
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
      };
    default:
      return state;
  }
};
