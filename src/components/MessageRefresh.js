import React from 'react';

const MessageRefresh = props => {
  return (
    <div className="messageRefresh">
      (XX New Warbles) <a onClick={props.refreshMessages} className="btn btn-sm btn-danger">Click to Refresh</a>
    </div>
  );
}
export default MessageRefresh;
