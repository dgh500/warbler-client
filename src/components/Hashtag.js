import React from 'react';
import { Link } from 'react-router-dom';

const Hashtag = props => {
  let hashtagStyle = {
    fontSize: '1rem',
    fontStyle: 'italic'
  }
  let noHashLink = (props.hashtag === null ? '' : props.hashtag.substring(1,props.hashtag.length));
  let linkTo = `/messages/filter/hashtag/${noHashLink}`;
  return (
    <strong>
      <button
        className="link-button"
        style={hashtagStyle}>
      <Link to={linkTo}>
        {props.hashtag}
      </Link>
      </button>
    </strong>
  );
}

export default Hashtag;
