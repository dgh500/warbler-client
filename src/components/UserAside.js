import React, { Component } from 'react';
import DefaultProfileImg from '../images/default-profile-image.jpg';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserStats } from '../store/actions/users';

class UserAside extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserStats();
  }

  render() {
    const { username, profileImageUrl } = this.props.currentUser.user;
    return (
      <aside className="col-sm-2 p-0 m-0">
        <div className="panel panel-default">
          <div className="panel-body">
            <h2>{username}</h2>
            <img
            src={profileImageUrl.length > 1 ? `http://localhost:8081/images/${profileImageUrl}` : DefaultProfileImg}
            alt={username}
            width="200"
            height="200"
            className="img-thumb"
            id="userAsideImg" />
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
