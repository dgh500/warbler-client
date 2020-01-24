import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { geolocated } from 'react-geolocated';
import { apiCall } from '../services/api';
import Hashtag from './Hashtag';
import { getTwitterHashtags } from '../store/actions/twitter';

class RemoteHashtags extends Component {

  constructor(props) {
    super(props);
    this.state = {
      remoteLoaded: false,
      woeid: 1
    };
  }

  componentDidMount() {
    this.props.getTwitterHashtags(this.state.woeid);
  }

  componentDidUpdate() {
    if(this.props.isGeolocationAvailable === true && this.props.isGeolocationEnabled === true && this.props.coords !== null && this.state.remoteLoaded === false) {
        apiCall('get',`http://localhost:8081/api/twitter/lookup/${this.props.coords.latitude}/${this.props.coords.longitude}`)
        .then((res) => {
            this.setState({woeid: res.woeid});
            this.props.getTwitterHashtags(this.state.woeid).then(this.setState({remoteLoaded: true}));
        })
        .catch((err) => {
            console.log(err);
        });
    }
  }

  render() {
    const hashtagDisplay = this.props.twitterHashtags.map((h,i) => (
      <span key={i}><Hashtag
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

export default withRouter(connect(mapStateToProps, { getTwitterHashtags })(geolocated({positionOptions: {enableHighAccuracy: false},userDecisionTimeout: 5000})(RemoteHashtags)));
