import React, { Component } from 'react';
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
    return (
      <div id="userAside" className="col-12 col-sm-2">
      <aside>
        <div id="userAsideInner">
            <ProfileImg
              profileImgUrl={profileImageUrl}
              username={username}
              email={email}
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
