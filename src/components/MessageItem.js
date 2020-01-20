import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link, withRouter } from 'react-router-dom';
import DefaultProfileImg from '../images/default-profile-image.jpg';
import { replyToMessage } from '../store/actions/messages';
import Hashtag from './Hashtag';

class MessageItem extends Component {
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
    this.props.replyToMessage(this.state.replyMessage,this.props.messageId);
    this.setState({ replyMessage: "", replyMode: false });
    this.props.history.push('/');
  }

  render() {
    const { date, profileImageUrl, text, username, removeMessage, isCorrectUser, currentUser, messageId, replies, isReply } = this.props;
    const { replyMode } = this.state;

    // Render message replies if they exist
    let repliesDisplay = null;
    if(replies.length > 0) {
      repliesDisplay = replies.map(m => (
        <MessageItem
          key={m._id}
          date={m.createdAt}
          text={m.text}
          username={m.user.username}
          profileImageUrl={m.user.profileImageUrl}
          removeMessage={removeMessage.bind(this, m.user._id, m._id)}
          messageId={m._id}
          replies={m.replies}
          isCorrectUser={currentUser === m.user._id}
          isReply={true}
          />
        ));
      }

    // Add hashtag links to text
    let regex = /#[a-zA-Z\d]*/g;
    // let modifiedText = text.replace(regex,'<a href="/filter/hashtag/$&">$&</a>');
    let modifiedText = text.split(' ').map((w,i) => (
      (w[0] === '#' ? <Hashtag hashtag={w} key={i} /> : <span key={i}>{w}</span>)
    ));

    // let modifiedText = text.replace(regex,'<Hashtag hashtag=$& />`)

    // Render message
    return (
      <>
      <li className={isReply ? "list-group-item reply-item" : "list-group-item"}>
        <img
          src={profileImageUrl && profileImageUrl.length > 1 ? `http://localhost:8081/images/${profileImageUrl}` : DefaultProfileImg}
          alt={username}
          height="100"
          width="100"
          className="timeline-image" />
          <div className="message-area">
            <Link to="/">@{username} &nbsp;</Link>
            <span className="text-muted">
              <Moment className="text-muted" format="ddd Do MMM [']YY [@] HH[:]ma">
                {date}
              </Moment>
            </span>
            <p>{modifiedText}</p>
            { /* }<p dangerouslySetInnerHTML={{__html: modifiedText}}></p> */ }
            {(isCorrectUser && !isReply) && (
              <>
              <a onClick={removeMessage} className="btn btn-sm btn-danger">Delete</a>
                <Link to={`/editMessage/${messageId}`} className="btn btn-sm btn-warning ml-1">Edit</Link>
              </>
            )}
            {(!isReply &&
              <a onClick={this.replyToggle} className="btn btn-sm btn-success ml-1">Reply</a>
            )}
          </div>
        </li>

      {replyMode && (
        <li className="list-group-item reply">
        <form onSubmit={this.handleReply}>
        <i className="fas fa-reply"></i>
        <input
            type="text"
            className="form-control"
            value={this.state.replyMessage}
            onChange={e => this.setState({ replyMessage: e.target.value })}
            />
            <button className="btn btn-sm btn-success ml-2 mb-1">
              Reply
            </button>
            <a onClick={this.replyToggle}><i className="fas fa-times"></i></a>
        </form>
        </li>
      )}
      {repliesDisplay}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    currentUser: state.currentUser.user.id
  };
}

export default withRouter(connect(mapStateToProps, { replyToMessage })(MessageItem));
