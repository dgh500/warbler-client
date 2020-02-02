import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from './Homepage';
import AuthForm from './AuthForm';
import About from './About';
import Contact from './Contact';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import withAuth from '../hocs/withAuth';
import MessageForm from './MessageForm';
import UpdateMessageForm from './UpdateMessageForm';
import EditProfile from './EditProfile';

/**
 * Handles React-Router switch/route logic. <h3>Routes:</h3>
 * <ul>
 * <li> <span style="font-size: 1.1rem; display: inline;">.../</span><br><span style="font-size: 0.8rem; display: inline; color: #666">Renders: &lt;Homepage ... > </span></li>
 * <li> <span style="font-size: 1.1rem; font-style: italic; display: inline;">.../about</span><br><span style="font-size: 0.8rem; display: inline; color: #666">Renders &lt;About ... ></span></li>
 * <li> <span style="font-size: 1.1rem; font-style: italic; display: inline;">.../contact</span><br><span style="font-size: 0.8rem; display: inline; color: #666">Renders: &lt;Contact ... > </span></li>
 * <li> <span style="font-size: 1.1rem; font-style: italic; display: inline;">.../signin</span><br><span style="font-size: 0.8rem; display: inline; color: #666">Renders: &lt;AuthForm ... > </span></li>
 * <li> <span style="font-size: 1.1rem; font-style: italic; display: inline;">.../signup</span><br><span style="font-size: 0.8rem; display: inline; color: #666">Renders: &lt;AuthForm ... > </span></li>
 * <li> <span style="font-size: 1.1rem; font-style: italic; display: inline;">.../profile</span><br><span style="font-size: 0.8rem; display: inline; color: #666">Renders: &lt;EditProfile ... > </span></li>
 * <li> <span style="font-size: 1.1rem; font-style: italic; display: inline;">.../messages/filter/hashtag/:hashtag</span><br><span style="font-size: 0.8rem; display: inline; color: #666">Renders: &lt;Homepage ... > </span></li>
 * <li> <span style="font-size: 1.1rem; font-style: italic; display: inline;">.../messages/filter/user/:user_id</span><br><span style="font-size: 0.8rem; display: inline; color: #666">Renders: &lt;Homepage ... > </span></li>
 * <li> <span style="font-size: 1.1rem; font-style: italic; display: inline;">.../editMessage/:message_id</span><br><span style="font-size: 0.8rem; display: inline; color: #666">Renders: &lt;UpdateMessageForm ... > </span></li>
 * <li> <span style="font-size: 1.1rem; font-style: italic; display: inline;">.../users/:id/messages/new</span><br><span style="font-size: 0.8rem; display: inline; color: #666">Renders: &lt;MessageForm ... > </span></li>
 * </ul>
 */
const Main = props => {
  const { authUser, errors, removeError, currentUser } = props;
  return (
    <div className="innerContainer">
      <Switch>
        { `// Rendering a function which renders the Homepage component - passing props through` }
        <Route exact path="/"
        render={props => (
          <Homepage
            currentUser={currentUser}
            mode="all"
            search=""
            {...props} />
        )} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/signin"
          render={props => (
            <AuthForm
              removeError={removeError}
              errors={errors}
              onAuth={authUser}
              buttonText="Log In"
              heading="Welcome Back"
              {...props} />
            )} />
        <Route exact path="/signup"
          render={props => (
            <AuthForm
              removeError={removeError}
              errors={errors}
              onAuth={authUser}
              signUp={true}
              buttonText="Sign me up!"
              heading="Join Warbler Today"
              {...props} /> // This passes the history object through
            )} />
        <Route exact path="/profile"
          render={props => (
            <EditProfile
              removeError={removeError}
              errors={errors}
              user={currentUser.user}
              {...props} />
          )} />
        <Route path="/messages/filter/hashtag/:hashtag"
          render={props => (
            <Homepage
              currentUser={currentUser}
              mode="hashtagFilter"
              search={props.match.params.hashtag}
              {...props} />
            )}/>
        <Route path="/messages/filter/user/:user_id"
          render={props => (
            <Homepage
              currentUser={currentUser}
              mode="userFilter"
              search={props.match.params.user_id}
              {...props} />
            )}/>
        <Route path="/editMessage/:message_id"
               component={UpdateMessageForm}
               />
        <Route path="/users/:id/messages/new"
          component={withAuth(MessageForm)}
          />
      </Switch>
    </div>
  );
};

// Transfer currentUser and errors to props
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

// Use withRouter to get access to history object, and connect to pass in state as props, and action creators as props
export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));
