import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMessages, removeMessage, editMessage, fetchMessageCount } from '../store/actions/messages';
import MessageItem from './MessageItem';
import MessageRefresh from './MessageRefresh';

/**
 * Generates a message list of MessageItem components
 **/
class MessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchVal: ''
    }
  }

  // Initiate
  componentDidMount() {
    const { currentUser, mode, search, displayMode } = this.props;
    this.setState({searchVal: search});
    let orderBy;
    let orderDir = 'desc';
    let limit;
    if(displayMode === 'feed') {
      orderBy = 'newest';
      limit = '';
    } else {
      orderBy = 'mostReplies';
      limit = 3;
    }
    this.props.fetchMessages(currentUser,mode,search,orderBy,orderDir,limit,displayMode);

    // Set a timer to check message qty (but not re-render the feed) and check against this count
    if(displayMode === 'feed') {
      this.interval = setInterval(() => {
        this.props.fetchMessageCount();
      },2000000);
    }
  }

  // Handles route changes ( eg. new search terms/new mode )
  componentDidUpdate() {
    const { currentUser, mode, search, displayMode } = this.props;
    if(displayMode === 'feed') {
      if(this.state.searchVal !== search) {
        this.props.fetchMessages(currentUser,mode,search);
      }

      // Must wrap in conditional to avoid infinite loop ( see : https://reactjs.org/docs/react-component.html#componentdidupdate )
      if(this.state.searchVal !== search) {
        this.setState({searchVal: search});
      }

        // Set a timer to check message qty (but not re-render the feed) and check against this count
      this.interval = setInterval(() => {
        this.props.fetchMessageCount();
      },200000);
    }
  }

  componentWillUnmount() {
    if(this.props.displayMode === 'feed') {
      clearInterval(this.interval);
    }
  }

  render() {
    const { messages, removeMessage, currentUser, fetchMessages, displayMode = "feed", styles } = this.props;
    let messageRefresh;

    if(displayMode === 'feed') {
      // Don't go minus if more deleted than added..
      let newMessages = (this.props.messageCount-this.props.messages.length>0 ? this.props.messageCount-this.props.messages.length : 0);
      messageRefresh = (<MessageRefresh messageCount={newMessages} refreshMessages={fetchMessages} />);
    }

    // Build array of message IDs that are replies
    let replyIds = [];
    messages.forEach(m =>
      m.replies.forEach(r =>
        replyIds.push(r._id)
      )
    )

    // Filter out messages that are ONLY replies
    let displayMessages = messages.filter(m => {
      return !replyIds.includes(m._id);
    });

    // Build JSX for MessageItem
    let messageList = displayMessages.map(m => {
      // console.log(this);
      let replies = [];
      if(displayMode === "feed") { replies = m.replies; }
      return (
      <MessageItem
        key={m._id}
        date={m.createdAt}
        text={m.text}
        username={m.user.username}
        profileImageUrl={m.user.profileImageUrl}
        removeMessage={(m) => removeMessage(m.user._id, m._id)}
        messageId={m._id}
        replies={replies}
        isCorrectUser={currentUser === m.user._id}
        isReply={false}
        displayMode={displayMode}
        styles={styles}
        />
      )
    });
    return (
      <div className={styles.outerDiv} id="messageList">
        <div>
          {messageRefresh}
          <ul className={styles.outerUlClass} id={styles.outerUlId}>
            {messageList}
          </ul>
        </div>
      </div>
    );
  }
} // end component

/**
 * Defines default styles -- move into component?
 */
MessageList.defaultProps = {
  styles: {
    outerDiv: "col-12 col-sm-8 p-0 m-0",
    outerUlClass: "list-group",
    outerUlId: "messages",
    outerLi: 'list-group-item',
    profileImg: 'timeline-image',
    messageContainer: 'message-area'
  }
}

// search }
MessageList.propTypes = {
  /** The list of messages to render */
  messages: PropTypes.array.isRequired,
  /** Callback function to remove (delete) a message if applicable */
  removeMessage: PropTypes.func,
  /** Funtion used to fetch messages */
  fetchMessages: PropTypes.func,
  /** Mode to filter messages by, possible options:
   * <ul>
   * <li>hashtagFilter - filter by hashtag</li>
   * <li>userFilter - filter by user</li>
   * <li>all - the default, show all messages</li>
   * </ul>
   */
  mode: PropTypes.string,
  /** If the mode is userFilter or hashtagFilter then this value will be the search query.
   * So for example if mode is userFilter and search is johndoe then it will attempt to filter to show only messages by johndoe
   */
  search: PropTypes.string,
  /** Feed - full functionality, Footer - just display messages */
  displayMode: PropTypes.string,
  /** id of the logged in user - required for API calls, could abstract out */
  currentUser: PropTypes.string,
  /** Object with classes for any part of the message that needs styling. Defaults to feed styles<br>
  *  <ul>
  *  <li>outerDiv - Class for the outermost container div</li>
  *  <li>outerUlClass - Class for the ul that contains all MessageItems</li>
  *  <li>outerUlId - ID for the ul that contains all MessageItems ( required? )</li>
  *  <li>outerLi - Passed through to MessageItem</li>
  *  <li>profileImg - Passed through to MessageItem</li>
  *  <li>messageContainer - Passed through to MessageItem</li>
  *  </ul>
  */
  styles: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  if(ownProps.displayMode === 'feed') {
    return {
      messages: state.messages.messages,
      messageCount: state.messages.messageCount,
      currentUser: state.currentUser.user.id
    };
  } else {
    return {
      messages: state.messages.footerMessages,
      currentUser: state.currentUser.user.id
    };
  }
}

export default withRouter(connect(mapStateToProps, { fetchMessages, removeMessage, editMessage, fetchMessageCount })(MessageList));
