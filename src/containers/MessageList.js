import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMessages, removeMessage, editMessage, fetchMessageCount } from '../store/actions/messages';
import MessageItem from '../components/MessageItem';
import MessageRefresh from '../components/MessageRefresh';

/**
 * Generates a message list, expects:
 * props.mode - String - one of all, hashtagFilter, userFilter
 * props.search - String - query to search for, for the mode ^^
 *
 *
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
    const { messages, removeMessage, currentUser, fetchMessages, displayMode = "feed" } = this.props;

    if(displayMode === 'feed') {
      // Don't go minus if more deleted than added..
      let newMessages = (this.props.messageCount-this.props.messages.length>0 ? this.props.messageCount-this.props.messages.length : 0);
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
    let messageList = displayMessages.map(m => (
      <MessageItem
        key={m._id}
        date={m.createAt}
        text={m.text}
        username={m.user.username}
        profileImageUrl={m.user.profileImageUrl}
        removeMessage={removeMessage.bind(this, m.user._id, m._id)}
        messageId={m._id}
        replies={m.replies}
        isCorrectUser={currentUser === m.user._id}
        isReply={false}
        />
    ));
    return (
      <div className="col-sm-8 p-0 m-0">
        <div>
          { /* <MessageRefresh messageCount={newMessages} refreshMessages={fetchMessages} /> */ }
          <ul className="list-group" id="messages">
            {messageList}
          </ul>
        </div>
      </div>
    );
  }

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
