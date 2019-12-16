import { apiCall } from '../../services/api';
import { addError } from './errors';
import { setCurrentUser } from './auth';
import { fetchMessages } from './messages';
import { EDIT_USER } from '../actionTypes';

export const editUser = inputUser => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall('put',`/api/users/${id}`, inputUser)
    .then(updatedUser => {
      // The database stores ID as ._id but Redux state expects .id, so switch this around...
      let idUser = Object.assign({},updatedUser);
      idUser['id'] = idUser['_id'];
      delete idUser['_id'];
      dispatch(setCurrentUser(idUser));
      fetchMessages();
    })
    .catch(err => {
      dispatch(addError(err.message));
    });
};
