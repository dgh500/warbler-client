import { apiCall } from '../../services/api';
import { addError } from './errors';
import { setCurrentUser } from './auth';
import { EDIT_USER } from '../actionTypes';

export const changeUser = user => ({
  type: EDIT_USER,
  userToEdit: user
});

export const editUser = inputUser => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall('put',`/api/users/${id}`, inputUser)
    .then(updatedUser => {
      dispatch(setCurrentUser(updatedUser));
    })
    .catch(err => {
      dispatch(addError(err.message));
    });
};
