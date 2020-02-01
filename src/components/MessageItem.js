import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import DefaultProfileImg from '../images/default-profile-image.jpg';
import { replyToMessage } from '../store/actions/messages';
import Hashtag from './Hashtag';
import UsernameLink from './UsernameLink';

/**
 * Renders a message item, and if in feed mode recursively renders any replies
 */
class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // If true, shows a text box to enter a new message
      replyMode: false,
      // Controlled input if in reply mode
      replyMessage: ''
    }
  }

  // Toggles reply mode - user only sees the reply box if on
  replyToggle = () => {
    this.setState({replyMode: !this.state.replyMode});
  }

  // onSubmit handler for adding a reply ( new message ) to an existing message
  handleReply = (e) => {
    e.preventDefault();
    this.props.replyToMessage(this.state.replyMessage,this.props.messageId);
    // Reset form and exit reply mode once complete
    this.setState({ replyMessage: "", replyMode: false });
    this.props.history.push('/');
  }

  // Main render message
  render() {
    const { date, profileImageUrl, text, username, removeMessage, isCorrectUser, currentUser, messageId, replies, isReply, displayMode, styles } = this.props;
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

    // Insert <Hashtag/> components to any hashtags found in the message
    let modifiedText = text.split(' ').map((w,i) => (
      (w[0] === '#' ? <span key={i}><Hashtag hashtag={w} key={i} /> </span> : <span key={i}>{w} </span>)
    ));

    // Render message
    return (
      <>
      <li className={isReply ? `${styles.outerLi} reply-item` : styles.outerLi}>
        <img
          src={profileImageUrl && profileImageUrl.length > 1 ? `http://localhost:8081/images/${profileImageUrl}` : DefaultProfileImg}
          alt={username}
          height="100"
          width="100"
          className={styles.profileImg} />
          <div className={styles.messageContainer}>
            <UsernameLink username={username} />&nbsp;
            <span className="text-muted">
              <Moment className="text-muted" format="ddd Do MMM [']YY [@] HH[:]ma">
                {date}
              </Moment>
            </span>
            <p>{modifiedText}</p>
            {displayMode === "feed" && isCorrectUser && 
              <>
              <button onClick={removeMessage} className="btn btn-sm btn-danger">Delete</button>
                <Link to={`/editMessage/${messageId}`} className="btn btn-sm btn-warning ml-1">Edit</Link>
              </>
            }
            {displayMode === "feed" && !isReply &&
              <button onClick={this.replyToggle} className="btn btn-sm btn-success ml-1">Reply</button>
            }
          </div>
        </li>

      {displayMode === "feed" && replyMode &&
        <li className={styles.outerLi + " reply"}>
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
            <button className="link-button" onClick={this.replyToggle}><i className="fas fa-times"></i></button>
        </form>
        </li>
      }
      {repliesDisplay}
      </>
    );
  }
} // end component definition

/**
 * Default Prop definitions - used to default the component to a feed setting and styles
 */
MessageItem.defaultProps = {
  displayMode: 'feed',
  styles: {
    outerLi: 'list-group-item',
    profileImg: 'timeline-image',
    messageContainer: 'message-area'
  }
}

/**
 * Expected prop types - crucially the displayMode is responsible for deciding which functionality to render. 'Feed' is fully functional - can edit, reply, delete etc where any other value is display only
 */
MessageItem.propTypes = {
  date: PropTypes.string.isRequired, // Fomat "2020-01-25T22:31:32.408Z"
  profileImageUrl: PropTypes.string.isRequired, // Filename of user's profile image - assumes located in localhost:8018/images/ directory
  text: PropTypes.string.isRequired, // Message text
  username: PropTypes.string.isRequired, // Username of user that is author of message
  removeMessage: PropTypes.func, // Callback function to remove (delete) a message if applicable
  isCorrectUser: PropTypes.bool.isRequired, // Decides whether to show edit/delete buttons where appropriate
  currentUser: PropTypes.string.isRequired, // _id of the logged in user
  messageId: PropTypes.string.isRequired, // _id of the message
  replies: PropTypes.array.isRequired, // An array of replies, recursively rendered if supplied, and in an applicable display mode
  isReply: PropTypes.bool.isRequired, // If a message is a reply then you can't reply to it - 1 layer deep only
  displayMode: PropTypes.string, // Feed - full functionality, Footer - just display messages
  styles: PropTypes.object // Object with classes for any part of the message that needs styling. Defaults to feed styles
}

// Current user ID required for message routes
function mapStateToProps(state) {
  return {
    // messages: state.messages,
    currentUser: state.currentUser.user.id
  };
}

export default withRouter(connect(mapStateToProps, { replyToMessage })(MessageItem));
