import { apiCall } from '../../services/api';
import { getUserStats } from './users';
import { addError } from './errors';
import { LOAD_MESSAGES, REMOVE_MESSAGE, EDIT_MESSAGE, MESSAGE_COUNT, LOAD_HASHTAGS, LOAD_FOOTER_MESSAGES } from '../actionTypes';

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages: messages
});

export const loadFooterMessages = footerMessages => ({
  type: LOAD_FOOTER_MESSAGES,
  footerMessages: footerMessages
});

export const changeMessage = message => ({
  type: EDIT_MESSAGE,
  messageToEdit: message
});

export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
});

export const messageCountUpdate = messageCount => ({
  type: MESSAGE_COUNT,
  messageCount
});

export const fetchHashtags = hashtags => ({
  type: LOAD_HASHTAGS,
  hashtags
});

export const fetchHashTags = (user_id) => {
  return dispatch => {
    return apiCall('get', `/api/users/${user_id}/messages/hashtags`)
      .then((res) => {
        dispatch(fetchHashtags(res));
      })
      .catch((err) => {
        dispatch(addError(err.message));
      });
  }
}

export const removeMessage = (user_id, message_id) => {
  return dispatch => {
    // console.log(`/api/users/${user_id}/messages/${message_id}`);
    return apiCall(
      'delete',
      `/api/users/${user_id}/messages/${message_id}`)
    .then(() => {
    dispatch(remove(message_id));
    dispatch(fetchMessages());
    dispatch(getUserStats());
  })
    .catch(err => dispatch(addError(err.message)));
  }
}

export const fetchMessageCount = () => {
  return dispatch => {
    return apiCall('get', '/api/messages')
      .then((res) => {
        dispatch(messageCountUpdate(res.length));
      })
      .catch((err) => {
        dispatch(addError(err.message));
      });
  }
}

export const fetchMessages = ( id, mode, q='', orderBy='newest', orderDir='desc', limit='0', where='feed') => {
  let url;
  switch(mode) {
    case 'hashtagFilter':
      url = `/api/users/${id}/messages?mode=hashtags&q=${q}&orderBy=${orderBy}&orderDir=${orderDir}&limit=${limit}`;
      break;
    case 'userFilter':
      url = `/api/users/${id}/messages?mode=users&q=${q}&orderBy=${orderBy}&orderDir=${orderDir}&limit=${limit}`;
      break;
    case 'all':
    default:
      url = `/api/users/${id}/messages?orderBy=${orderBy}&orderDir=${orderDir}&limit=${limit}`;
  }
  return dispatch => {
    return apiCall('get', url)
      .then((res) => {
        switch(where) {
          case 'footer':
            dispatch(loadFooterMessages(res));
          break;
          case 'feed':
          default:
            dispatch(loadMessages(res));
          break;
        }
        dispatch(fetchMessageCount());
        dispatch(getUserStats());
        dispatch(fetchHashTags());
      })
      .catch((err) => {
        dispatch(addError(err.message));
      });
  };
};

export const fetchOneMessage = message_id => (dispatch, getState) => {
  // console.log('1');
    let { currentUser } = getState();
    const id = currentUser.user.id;
     // console.log(id);
    return apiCall('get', `/api/users/${id}/messages/${message_id}`)
      .then((res) => {
        // console.log(res);
        dispatch(changeMessage(res));
      })
      .catch((err) => {
        dispatch(addError(err.message));
      });
};

export const editMessage = text => (dispatch, getState) => {
  let { currentUser, messages } = getState();
  let message_id = messages.messages[0]._id;
  const id = currentUser.user.id;
  return apiCall('put',`/api/users/${id}/messages/${message_id}`, { text })
    .then(res => {})
    .catch(err => {
      dispatch(addError(err.message));
    });
};

export const postNewMessage = text => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall('post',`/api/users/${id}/messages`, { text })
    /*
     * No dispatch as redirected to '/' in the MessageForm component, which then dispatches loadMessages
     * so the user sees their message straight away
     */
    .then(res => {})
    .catch(err => {
      dispatch(addError(err.message));
    });
}

export const replyToMessage = (text, message_id) => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall('post',`/api/users/${id}/messages/${message_id}/reply`, { text })
    .then(res => {
      dispatch(fetchMessages());
    })
    .catch(err => {
      dispatch(addError(err.message));
    });
}

// This is just for sanity - the arrow function translates to...
// export const postNewMessage = function(text) {
//   return function(dispatch, getState) {
//     let { currentUser } = getState();
//     const id = currentUser.user.id;
//     return apiCall('post',`/api/users/${id}/messages`, { text })
//       .then(res => {})
//       .catch(err => {
//         dispatch(addError(err.message));
//       });
//     }
// }
