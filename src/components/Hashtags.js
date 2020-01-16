import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHashTags } from '../store/actions/messages';
import Hashtag from './Hashtag';

class Hashtags extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchHashTags(this.props.user_id);
  }

  render() {

    const warbleHashtagDisplay = this.props.warbleHashtags.map((h) => (
      <Hashtag hashtag={h} />
    ));

    return (
      <div className="col-sm-2 p-0 m-0">
        <h2>Hashtags</h2>
        <h3>Top Warbles</h3>
        {warbleHashtagDisplay}
        <h3>Top Tweets</h3>

      </div>
    );
  }
}

Hashtags.defaultProps = {
  warbleHashtags: []
}

function mapStateToProps(state) {
  if(state.users.userStats === undefined) {
    return {
      user_id: state.currentUser.user.id
    }
  } else {
    return {
      user_id: state.currentUser.user.id,
      warbleHashtags: state.messages.hashtags
    }
  }
}

export default connect(mapStateToProps,{ fetchHashTags })(Hashtags);
