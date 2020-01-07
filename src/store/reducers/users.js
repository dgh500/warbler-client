import { LOAD_STATS } from '../actionTypes';

const userInfo = (state = [], action ) => {
  switch(action.type) {
    case LOAD_STATS:
      return { ...state, userStats: action.stats };
    default:
      return state;
  }
}

export default userInfo;
