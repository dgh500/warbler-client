import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultProfileImg from '../images/default-profile-image.jpg';

export default class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyMode: false,
      replyMessage: ''
    }
  }

  replyToggle = () => {
    this.setState({replyMode: !this.state.replyMode});
  }

  handleReply = (e) => {
    e.preventDefault();
    // make a POST request to http://localhost:8081/api/users/user_id/messages/message_id/reply
    // needs req.params.user_id ( the current user ) and message_id ( the parent message ) from ^^ and req.body.text ( the reply's text )
  }

  render() {
    const { date, profileImageUrl, text, username, removeMessage, isCorrectUser, messageId } = this.props;
    const { replyMode } = this.state;
    return (
      <>
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
            <a onClick={this.replyToggle} className="btn btn-sm btn-success ml-1">Reply</a>
            </>
          )}
          </div>
        </li>
      </div>
      {replyMode && (
        <li className="list-group-item reply">
        <form onSubmit={this.handleReply}>
          ---> <input
            type="text"
            className="form-control"
            value={this.state.replyMessage}
            onChange={e => this.setState({ replyMessage: e.target.value })}
            />
            <button className="btn btn-sm btn-success ml-2">
              Reply
            </button>
        </form>
        </li>
      )}
      </>
    );
  }
}
