import React from 'react';

const MessageRefresh = props => {
  let refreshButtonStyle = {
    color: "white"
  }
  return (
    <div className="messageRefresh" id="messageRefresh">
      ({props.messageCount} New Warbles) <button className="link-button" onClick={props.refreshMessages} style={refreshButtonStyle}>Click to Refresh</button>
    </div>
  );
}
export default MessageRefresh;
