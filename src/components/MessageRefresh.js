import React from 'react';

const MessageRefresh = props => {
  return (
    <div className="messageRefresh">
      ({props.messageCount} New Warbles) <a onClick={props.refreshMessages}>Click to Refresh</a>
    </div>
  );
}
export default MessageRefresh;