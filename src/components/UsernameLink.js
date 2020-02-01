import React from 'react';
import { Link } from 'react-router-dom';

const UsernameLink = props => {
  let usernameStyle = {
    fontSize: '1rem',
    fontStyle: 'italic'
  }
  let username = (props.username === null ? '' : props.username);
  let linkTo = `/messages/filter/user/${username}`;
  return (
    <strong>
      <button
        className="link-button"
        style={usernameStyle}>
      <Link to={linkTo}>
        @{props.username}
      </Link>
      </button>
    </strong>
  );
}

export default UsernameLink;
