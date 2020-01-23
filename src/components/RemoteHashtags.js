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
      remoteLoaded: false
    };
  }

  componentDidMount() {
    // let woeid;
    // // console.log(this.props);
    // if(this.props.isGeolocationAvailable === true && this.props.isGeolocationEnabled === true && this.props.coords !== null) {
    //   let locationIqResult = apiCall('get',`https://eu1.locationiq.com/v1/reverse.php?key=4d509ae7d11400&lat=${this.props.coords.latitude}&lon=-${this.props.coords.longitude}&format=json`);
    //   console.log(locationIqResult);
    //   woeid = 30079;
    // } else {
    //   woeid = 1;
    // }

    this.props.getTwitterHashtags(1);
  }

  componentDidUpdate() {
    let woeid  = 1;
    if(this.props.isGeolocationAvailable === true && this.props.isGeolocationEnabled === true && this.props.coords !== null && this.state.remoteLoaded === false) {
      let locationIqResult = apiCall('get',`http://localhost:8081/api/locationIq/${this.props.coords.latitude}/${this.props.coords.longitude}`)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });

      woeid = 30079;
      this.props.getTwitterHashtags(woeid).then(this.setState({remoteLoaded: true}));
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
