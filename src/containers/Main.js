import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import withAuth from '../hocs/withAuth';
import MessageForm from './MessageForm';
import UpdateMessageForm from './UpdateMessageForm';
import EditProfile from './EditProfile';

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
