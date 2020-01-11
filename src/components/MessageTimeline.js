import React from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';

const MessageTimeline = props => {
  return (
    <div className="row flex-nowrap">
      <UserAside
        profileImageUrl={props.profileImageUrl}
        username={props.username}
      />
      <MessageList />
      <div className="col-sm-2 p-0 m-0">
        Hashtags
      </div>
    </div>
  );
}
export default MessageTimeline;
