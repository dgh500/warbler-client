import React from 'react';
import { withRouter } from 'react-router-dom';
import MessageList from './MessageList';
import UserAside from './UserAside';
import Hashtags from './Hashtags';

const MessageTimeline = props => {
  return (
    <>
    <div className="row m-0" id="messageTimeline">
      <UserAside
        profileImageUrl={props.profileImageUrl}
        username={props.username}
      />
      <MessageList mode={props.mode} search={props.search} displayMode="feed" />
      <Hashtags />
    </div>
    </>
  );
}
export default withRouter(MessageTimeline);
