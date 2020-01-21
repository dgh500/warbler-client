import React from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';
import Hashtags from './Hashtags';

const MessageTimeline = props => {
  return (
    <div className="row flex-nowrap m-0">
      <UserAside
        profileImageUrl={props.profileImageUrl}
        username={props.username}
      />
      <MessageList mode={props.mode} search={props.search} />
      <Hashtags />
    </div>
  );
}
export default MessageTimeline;
