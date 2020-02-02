import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SlideToggle from 'react-slide-toggle';
import DefaultProfileImg from '../images/default-profile-image.jpg';
import { replyToMessage } from '../store/actions/messages';
import Hashtag from './Hashtag';
import UsernameLink from './UsernameLink';

/**
 * Renders a message item, and if in feed mode recursively renders any replies. A MessageItem can be styled using the styles prop to be displayed in different areas.
 * The "feed" display mode is fully functional ( can reply, edit and delete posts ) whereas the "footer" is purely for displaying message posts.
 *
 * ![MessageItem](https://localhost:3000/MessageItem.jpg)
 */
class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // If true, shows a text box to enter a new message
      replyMode: false,
      // Used to toggle the display of the reply box
      toggleSwitch: null,
      // Controlled input if in reply mode
      replyMessage: ''
    }
  }

  /**
   * Toggles reply mode - user only sees the reply box if on
   */
  replyToggle = () => {
    this.setState({
      replyMode: !this.state.replyMode,
      toggleSwitch: Date.now()
    });
  }

  /**
   * onSubmit handler for adding a reply ( new message ) to an existing message
   */
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
    const { replyMode, toggleSwitch } = this.state;
    const deleteButtonStyle = {
      border: "0px",
      background: "none",
      color: "#666",
      position: "absolute",
      bottom: "0",
      right: "60px"
    }
    const editButtonStyle = {
      border: "0px",
      background: "none",
      color: "#666",
      position: "absolute",
      bottom: "2px",
      right: "35px"
    }
    const replyButtonStyle = {
      border: "0px",
      background: "none",
      color: "#666",
      position: "absolute",
      bottom: "0",
      right: "3px",
      transform: "scaleX(-1) rotate(180deg)"
    }
    // Render message replies if they exist
    let repliesDisplay = null;
    if(replies.length > 0) {
      repliesDisplay = replies.map(m => (
        <MessageItem
          key={m._id}
          date={m.createdAt}
          text={m.text}
          username={m.user.username}
          currentUser={m.user._id}
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
              <button onClick={removeMessage} style={deleteButtonStyle}><i className="fas fa-trash-alt"></i></button>
                <Link to={`/editMessage/${messageId}`} style={editButtonStyle}><i className="fas fa-edit"></i></Link>
              </>
            }
            {displayMode === "feed" && !isReply &&
              <button onClick={this.replyToggle} style={replyButtonStyle} className="ml-1 toggle"><i className="fas fa-reply"></i></button>
            }
          </div>
        </li>

      {displayMode === "feed" && // replyMode && // - used to show/hide, doesn't work if want to use effects slidein/out etc
        <SlideToggle toggleEvent={toggleSwitch} collapsed={true} duration={150}>
        {({ setCollapsibleElement }) => (
          <li className={styles.outerLi + " reply my-collapsible"} ref={setCollapsibleElement}>
          <form onSubmit={this.handleReply}>
          <i className="fas fa-reply"></i>
          <input
              type="text"
              className="form-control"
              value={this.state.replyMessage}
              onChange={e => this.setState({ replyMessage: e.target.value })}
              />
              <button className="btn btn-sm btn-primary ml-2 mb-1">
              Reply
              </button>
          </form>
          <button className="link-button toggle" onClick={this.replyToggle}><i className="fas fa-times"></i></button>
          </li>
        )}
        </SlideToggle>
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
  /** Format "2020-01-25T22:31:32.408Z" */
  date: PropTypes.string.isRequired,
  /** Filename of user's profile image - assumes located in localhost:8018/images/ directory, should ENV variable this */
  profileImageUrl: PropTypes.string.isRequired,
  /** Message text */
  text: PropTypes.string.isRequired,
  /** Username of user that is author of message */
  username: PropTypes.string.isRequired,
  /** Callback function to remove (delete) a message if applicable */
  removeMessage: PropTypes.func,
  /**  Decides whether to show edit/delete buttons where appropriate */
  isCorrectUser: PropTypes.bool.isRequired,
  /** id of the logged in user - required for API calls, could abstract out */
  currentUser: PropTypes.string.isRequired,
  /** ID of the message to be rendered */
  messageId: PropTypes.string.isRequired,
  /** An array of replies, recursively rendered if supplied, and in an applicable display mode */
  replies: PropTypes.array.isRequired,
  /** If a message is a reply then you can't reply to it - 1 layer deep only */
  isReply: PropTypes.bool.isRequired,
  /** Feed - full functionality, Footer - just display messages */
  displayMode: PropTypes.string,
  /** Object with classes for any part of the message that needs styling. Defaults to feed styles<br>
  *  <ul>
  *  <li>outerLi - class name to apply to the li that contains the message NB. if in reply mode a reply-item class will also be added to this li</li>
  *  <li>profileImg - class name to be applied to the img tag that displays the user's profile image</li>
  *  <li>messageContainer - class name to be applied the the div which contains the message itself (NB. the img is OUTSIDE this div - use profileImg to style the image)</li>
  *  </ul>
  */
  styles: PropTypes.object
}

// Current user ID required for message routes
function mapStateToProps(state) {
  return {
    // messages: state.messages,
    currentUser: state.currentUser.user.id
  };
}

export default withRouter(connect(mapStateToProps, { replyToMessage })(MessageItem));
