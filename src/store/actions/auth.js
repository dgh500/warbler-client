import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError } from './errors';

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
  // This (and all) thunk functions have dispatch (and getState() if they ask for it) due to magic of redux-thunk
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData)
      // The /api/auth/signin route returns an object with 'token' and other properties. Destructure into token, and spread the rest of the returned object into an object called user
      .then(({token, ...user}) => {
          // Window.localStorage - JS, not React/Redux specific - https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
          localStorage.setItem("jwtToken", token);
          // Set Axios auth header to this token
          setAuthorizationToken(token);
          // Update store
          dispatch(setCurrentUser(user));
          // Resolve successfully
          resolve();
      })
      .catch(err => {
        dispatch(addError(err.message));
        reject();
      });
    });
  }
}
