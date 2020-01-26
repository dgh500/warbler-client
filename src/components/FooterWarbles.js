import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MessageItem from './MessageItem';
import { fetchMessages } from '../store/actions/messages';

class FooterWarbles extends Component {

  // Initiate
  componentDidMount() {
    const { currentUser } = this.props;
    this.props.fetchMessages(currentUser,'all','','mostReplies','desc',3,'footer');
  }

  render() {
    const { messages, currentUser } = this.props;

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
        messageId={m._id}
        replies={m.replies}
        isCorrectUser={currentUser === m.user._id}
        isReply={false}
        />
    ));
    return (
      <div className="col-sm-8 p-0 m-0">
        <div>
          <ul className="list-group" id="messages">
            {messageList}
          </ul>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  if(state.messages.footerMessages === undefined) {
    return {
      currentUser: state.currentUser.user.id,
      messages: []
    };
  } else {
    return {
      messages: state.messages.footerMessages,
      currentUser: state.currentUser.user.id
    };
  }
}


export default withRouter(connect(mapStateToProps, { fetchMessages })(FooterWarbles));
