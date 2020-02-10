import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'md5';

/**
 * Renders the user's profile image from their username
 * @public
 * @param {string} username - The user to render the profile image of
 * @param {int} width - Image width ( defaults to 100 ) in pixels
 * @param {int} height - Image width ( defaults to match height )
 */
const ProfileImg = props => {

  const { profileImgUrl=null, username, email="", width, height, className="img-thumb", id="" } = props;
  let imgSrc;
  if(profileImgUrl.length > 1) {
    imgSrc = `https://localhost:8081/images/${profileImgUrl}`;
  } else {
    const userEmailHash = md5(email);
    imgSrc = `https://www.gravatar.com/avatar/${userEmailHash}s=200&d=https://localhost:3000/default-profile-image.jpg`;
  }
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
