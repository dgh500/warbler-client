import React from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';
import Hashtags from './Hashtags';

const MessageTimeline = props => {
  return (
    <div className="row flex-nowrap">
      <UserAside
        profileImageUrl={props.profileImageUrl}
        username={props.username}
      />
      <MessageList />
      <Hashtags />
    </div>
  );
}
export default MessageTimeline;
