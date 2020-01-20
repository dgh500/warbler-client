import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import messages from './messages';
import twitterHashtags from './twitter';
import users from './users';


const rootReducer = combineReducers({
  currentUser,
  users,
  errors,
  twitterHashtags,
  messages
});

export default rootReducer;
