import React from 'react';
import DefaultProfileImg from '../images/default-profile-image.jpg';

const UserAside = ({ profileImageUrl, username }) => (
  <aside className="col-sm-2">
    <div className="panel panel-default">
      <div className="panel-body">
        <h2>{username}</h2>
        <img
        src={profileImageUrl || DefaultProfileImg}
        alt={username}
        width="200"
        height="200"
        className="img-thumb"
        id="userAsideImg" />
      </div>
    </div>
  </aside>
);

export default UserAside;
