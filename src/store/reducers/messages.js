import { LOAD_MESSAGES, REMOVE_MESSAGE, EDIT_MESSAGE, MESSAGE_COUNT, LOAD_HASHTAGS } from '../actionTypes';

const message = (state = {messages: [], messageCount: 0, hashtags: []}, action ) => {
  switch(action.type) {
    case LOAD_MESSAGES:
      return {...state, messages: [...action.messages]};
    case EDIT_MESSAGE:
      return {...state, messages: [action.messageToEdit]};
    case REMOVE_MESSAGE:
      return {...state, messages: state.messages.filter(message => message._id !== action.id)};
    case MESSAGE_COUNT:
      return { ...state, messageCount: action.messageCount };
    case LOAD_HASHTAGS:
        return { ...state, hashtags: action.hashtags };
    default:
      return state;
  }
}

/*

to allow for messagecount (and anything else) need to modify the state to:
messages {
  messages: [ ... ]
  messageCount: x
}

*/

export default message;
