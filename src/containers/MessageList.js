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
    const { currentUser, mode, search } = this.props;
    this.setState({searchVal: search});
    this.props.fetchMessages(currentUser,mode,search);

    // Set a timer to check message qty (but not re-render the feed) and check against this count
    this.interval = setInterval(() => {
      this.props.fetchMessageCount();
    },20000);
  }

  // Handles route changes ( eg. new search terms/new mode )
  componentDidUpdate() {
    const { currentUser, mode, search } = this.props;
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
    },20000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { messages, removeMessage, currentUser, fetchMessages } = this.props;

    // Don't go minus if more deleted than added..
    let newMessages = (this.props.messageCount-this.props.messages.length>0 ? this.props.messageCount-this.props.messages.length : 0);

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
          <MessageRefresh messageCount={newMessages} refreshMessages={fetchMessages} />
          <ul className="list-group" id="messages">
            {messageList}
          </ul>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    messages: state.messages.messages,
    messageCount: state.messages.messageCount,
    currentUser: state.currentUser.user.id
  };
}

export default withRouter(connect(mapStateToProps, { fetchMessages, removeMessage, editMessage, fetchMessageCount })(MessageList));
