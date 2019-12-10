import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './errors';

/**
 * Action creator - setCurrentUser
 * @param {object} user - An object that is either empty (to logout) or an object with required user fields (this isn't enforced?)
 * @return {object} - the action for the reducer
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

/**
 * Alias of api/setTokenHeader
 */
export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

/**
 * Thunk - logs the user out by clearing localStorage, clearing the Bearer authorization header and setting current user to empty object
 * @return {undefined}
 */
export function logout() {
  return dispatch => {
    // Remove the jwtToken in localStorage
    localStorage.clear();
    // Remove Authorization Bearer header in axios
    setAuthorizationToken(false);
    // Dispatch setCurrentUser action with an empty object
    dispatch(setCurrentUser({}));
  }
}

/**
 * Thunk - Multi-purpose authorisation action for both signin and signup
 * @param {string} type - either 'signup' or 'signin'
 * this is to map to the correct API endpoint
 * @param {object} userData - a full user object, as signin requires req.body.email and signup requires req.body to be the user
 * @returns {promise}
 */
// type - signup or signin, userData - some data from the request
export function authUser(type, userData) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData)
      .then(({token, ...user}) => {
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user));
          resolve();
      })
      .catch(err => {
        dispatch(addError(err.message));
        reject();
      });
    });
  }
}
