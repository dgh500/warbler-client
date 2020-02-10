import React, { Component } from 'react';
// import DefaultProfileImg from '../images/default-profile-image.jpg';
import md5 from 'md5';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserStats } from '../store/actions/users';
import ProfileImg from './ProfileImg';

class UserAside extends Component {

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.getUserStats();
  }

  render() {
    const { username, profileImageUrl, email } = this.props.currentUser.user;
    let imgSrc;
    if(profileImageUrl.length > 1) {
      imgSrc = `http://localhost:8081/images/${profileImageUrl}`;
    } else {
        const userEmailHash = md5(email);
        imgSrc = `https://www.gravatar.com/avatar/${userEmailHash}s=200&d=https://localhost:3000/default-profile-image.jpg`;
    }
    return (
      <div id="userAside" className="col-12 col-sm-2">
      <aside>
        <div id="userAsideInner">
            <ProfileImg
              imgSrc={imgSrc}
              username={username}
              width="150"
              height="150"
              className="img-thumb"
              id="userAsideImg"
              />
          <div id="userAsideText">
            <h2>{username}</h2>
            {this.props.postCount !== undefined ? (
            <div className="user-stats">
              <strong>Posts:</strong>{this.props.postCount}<br/>
              <strong>Replies:</strong> {this.props.replyCount}
            </div>
          ) : (
            <div>Loading User Stats</div>
          )}
          </div>
        </div>
      </aside>
      </div>
    );
  }

}

function mapStateToProps(state) {
  if(state.users.userStats === undefined) {
    return {
      currentUser: state.currentUser
    }
  } else {
    return {
      currentUser: state.currentUser,
      postCount: state.users.userStats.postCount,
      replyCount: state.users.userStats.replyCount
    }
  }
}

export default withRouter(connect(mapStateToProps, { getUserStats })(UserAside));
