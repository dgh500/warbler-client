import { LOAD_MESSAGES, REMOVE_MESSAGE, EDIT_MESSAGE } from '../actionTypes';

const message = (state = [], action ) => {
  switch(action.type) {
    case LOAD_MESSAGES:
      return [...action.messages];
    case EDIT_MESSAGE:
      return [action.messageToEdit];
    case REMOVE_MESSAGE:
      return state.filter(message => message._id !== action.id);
    default:
      return state;
  }
}

export default message;
