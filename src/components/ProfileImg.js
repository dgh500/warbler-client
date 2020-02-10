import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders the user's profile image from their username
 * @public
 * @param {string} username - The user to render the profile image of
 * @param {int} width - Image width ( defaults to 100 ) in pixels
 * @param {int} height - Image width ( defaults to match height )
 */
const ProfileImg = props => {

  const { imgSrc, username, width, height, className="img-thumb", id="" } = props;

  return (
    <img
      src={imgSrc}
      alt={username}
      width={width}
      height={height}
      className={className}
      id={id} />
  );
}

ProfileImg.propTypes = {
  /** The user to load an image for */
  username: PropTypes.string
}


export default ProfileImg;
