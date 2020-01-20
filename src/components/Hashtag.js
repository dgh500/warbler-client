import React from 'react';

const Hashtag = props => {
  let hashtagStyle = {
    fontSize: '12px',
    fontStyle: 'italic'
  }
  return (
    <strong style={hashtagStyle}><a href="#">{props.hashtag}</a> </strong>
  );
}

export default Hashtag;
