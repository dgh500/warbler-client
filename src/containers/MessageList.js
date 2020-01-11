import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, removeMessage, editMessage } from '../store/actions/messages';
import MessageItem from '../components/MessageItem';
import MessageRefresh from '../components/MessageRefresh';

class MessageList extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }

  refreshMessages = () => {
    this.props.fetchMessages();
  }

  render() {
    const { messages, removeMessage, currentUser, fetchMessages } = this.props;

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
        <div className="messageRefresh">
          (XX New Warbles) <a onClick={this.refreshMessages}>Click to Refresh</a>
        </div>
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
    messages: state.messages,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, { fetchMessages, removeMessage, editMessage })(MessageList);
