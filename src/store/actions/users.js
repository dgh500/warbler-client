import { apiCall } from '../../services/api';
import { addError } from './errors';
import { setCurrentUser } from './auth';
import { fetchMessages } from './messages';
import { LOAD_STATS } from '../actionTypes';

export const loadUserStats = stats => ({
  type: LOAD_STATS,
  stats: stats
});

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
      dispatch(fetchMessages());
    })
    .catch(err => {
      dispatch(addError(err.message));
    });
};

// Gets statistics for the current user - returns object with postCount, replyCount
export const getUserStats = () => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall('get',`/api/users/${id}/stats`)
    .then(userStats => {
      dispatch(loadUserStats(userStats));
    })
    .catch(err => {
      dispatch(addError(err.message));
    });
};
