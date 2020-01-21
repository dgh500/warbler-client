import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Hashtag from './Hashtag';
import { getTwitterHashtags } from '../store/actions/twitter';

class RemoteHashtags extends Component {

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.getTwitterHashtags(30079);
  }

  render() {

    const hashtagDisplay = this.props.twitterHashtags.map((h,i) => (
      <span><Hashtag
        key={i}
        hashtag={h} /> </span>
    ));
    // console.log(hashtagDisplay);

    return (
      <div id="remoteTweets">
        {hashtagDisplay}
      </div>
    );
  }

}

function mapStateToProps(state) {
  if(state.twitterHashtags.twitterHashtags === undefined) {
    return {
      currentUser: state.currentUser
    }
  } else {
    // when loaded
    return {
      currentUser: state.currentUser,
      twitterHashtags: state.twitterHashtags.twitterHashtags
    }
  }
}

export default withRouter(connect(mapStateToProps, { getTwitterHashtags })(RemoteHashtags));
