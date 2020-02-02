import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Renders a single hashtag - having this as a separate component means we can change the mechanism here and it'll update all hashtags if required at a later date.
 * Can also allow more styles etc. later if required
 * @public
 * @param {string} hashtag - The hashtag to render a link to
 */
const Hashtag = props => {
  let hashtagStyle = {
    fontSize: '1rem',
    fontStyle: 'italic'
  }
  let noHashLink = (props.hashtag === null ? '' : props.hashtag.substring(1,props.hashtag.length));
  let linkTo = `${process.env.REACT_APP_MESSAGELIST_FILTER_HASHTAG_PREFIX}${noHashLink}`;
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

Hashtag.propTypes = {
  /** The hashtag to render */
  hashtag: PropTypes.string
}


export default Hashtag;
