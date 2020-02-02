import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import MessageTimeline from './MessageTimeline';

/**
 * Loads either the landing page if not a logged in user, or the &lt;MessageTimeline&gt; for logged in users
 * @public
 */
const Homepage = ({ currentUser, mode, search }) => {
  if(!currentUser.isAuthenticated) {
    return (
      <div className="home-hero">
        <h1>What's Happening?</h1>
        <h4>New to Warbler?</h4>
        <Link to="/signup" className="btn btn-primary">
          Sign Up Here
        </Link>
      </div>
    );
  }

  return (
    <div>
      <MessageTimeline
        profileImageUrl={currentUser.user.profileImageUrl}
        username={currentUser.user.username}
        mode={mode}
        search={search}
       />
    </div>
  );
};

Homepage.propTypes = {
  //* ID of currently logged in user */
  currentUser: PropTypes.object.isRequired,
  /** Mode to filter messages by, possible options:
   * <ul>
   * <li>hashtagFilter - filter by hashtag</li>
   * <li>userFilter - filter by user</li>
   * <li>all - the default, show all messages</li>
   * </ul>
   */
  mode: PropTypes.string,
  /** If the mode is userFilter or hashtagFilter then this value will be the search query.
   * So for example if mode is userFilter and search is johndoe then it will attempt to filter to show only messages by johndoe
   */
  search: PropTypes.string
}

export default withRouter(Homepage);
