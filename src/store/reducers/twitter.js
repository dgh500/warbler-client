import { LOAD_TWITTER_HASHTAGS } from '../actionTypes';

const DEFAULT_STATE = {
  twitterHashtags: []
}

const twitterHashtags = ( state = DEFAULT_STATE, action ) => {
  switch(action.type) {
    case LOAD_TWITTER_HASHTAGS:
      return { ...state, twitterHashtags: action.twitterHashtags.resultTags };
    default:
      return state;
  }
}

export default twitterHashtags;
