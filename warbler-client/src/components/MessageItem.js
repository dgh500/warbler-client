import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultProfileImg from '../images/default-profile-image.jpg';

const MessageItem = ({ date, profileImageUrl, text, username, removeMessage, isCorrectUser, messageId }) => (
  <div>
  <li className="list-group-item">
    <img
      src={profileImageUrl && profileImageUrl.length > 1 ? `http://localhost:8081/images/${profileImageUrl}` : DefaultProfileImg}
      alt={username}
      height="100"
      width="100"
      className="timeline-image" />
    <div className="message-area">
      <Link to="/">@{username} &nbsp;</Link>
      <span className="text-muted">
        <Moment className="text-muted" format="Do MMM YYYY">
          {date}
        </Moment>
      </span>
      <p>{text}</p>
      {isCorrectUser && (
        <>
        <a onClick={removeMessage} className="btn btn-sm btn-danger">Delete</a>
          <Link to={`/editMessage/${messageId}`} className="btn btn-sm btn-warning ml-1">Edit</Link>
        </>
      )}
    </div>
    </li>
  </div>
);

export default MessageItem;
