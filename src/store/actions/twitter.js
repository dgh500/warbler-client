import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_TWITTER_HASHTAGS } from '../actionTypes';

export const loadTwitterHashtags = twitterHashtags => ({
  type: LOAD_TWITTER_HASHTAGS,
  twitterHashtags: twitterHashtags
});

export const getTwitterHashtags = () => (dispatch, getState) => {
  return apiCall('get',`/api/twitter/12334`)
    .then(twitterHashtags => {
      dispatch(loadTwitterHashtags(twitterHashtags));
    })
    .catch(err => {
      dispatch(addError(err.message));
    });
};
