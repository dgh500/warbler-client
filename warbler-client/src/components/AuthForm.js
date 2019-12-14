import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * Authorisation form - used for both login and signup
 * If props.signUp is supplied (truthy) then shows full signup form incl username and image URL
 * If not then just the login form which is the same minus those 2 fields
 * NB. Uses "Public Class Fields Syntax - https://babeljs.io/docs/en/babel-plugin-proposal-class-properties" to 'auto'-bind functions so they have correct THIS keyword meaning
 */
export default class AuthForm extends Component {

  // Initialise local state
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      profileImageUrl: ''
    };
  }

  /**
   * Define prop types
   */
   static propTypes = {
     // Page heading - sign up or sign in variant
     heading:     PropTypes.string,
     // Form button - sign up or sign in variant
     buttonText:  PropTypes.string,
     // Whether on signUp form (else sign in)
     signUp:      PropTypes.bool,
     // Errors object - where used?
     errors:      PropTypes.object,
     // history object ( see https://reacttraining.com/react-router/web/api/history )
     history:     PropTypes.object,
     // the remove error action creator ( defined in src/store/actions/errors.js and passed from Main.js through connect() mapDispatchToProps object )
     removeError: PropTypes.func
   };

  /**
   * Allow React to control inputs
   * @param {event} e - synthetic event - https://reactjs.org/docs/events.html
   */
  handleChange = (e) => {
    this.setState({
      /*
      * Use ES6 Computed Property Names
      * Wrapping an object key in square brackets [] means it gets evaulated, so this function
      * works on all fields - e.g. <input name="email" ... /> results in the e.name being evaluated to email
      */
      [e.target.name]: e.target.value
    });
  };

  handleFileChange = (e) => {
      this.setState({ profileImageUrl: e.target.files[0] });
  }

  /**
   * Handle submit of the login / sign up form and redirect user to home page if successful
   * @param {event} e - synthetic event - https://reactjs.org/docs/events.html
   */
  handleSubmit = (e) => {
    // Prevent page refresh
    e.preventDefault();
    const formData = new FormData();
    if(this.state.profileImageUrl !== undefined) {
      formData.append('profileImageUrl', this.state.profileImageUrl);
    }
    // else {
    //   formData.append('profileImageUrl', './images/default-profile-image.jpg');
    // }
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    formData.append('email', this.state.email);
    // Are we signing up or signing in?
    const authType = this.props.signUp ? "signup" : "signin";
    // This onAuth is from Main.js connect() mapDispatchToProps function, and is actually the authUser() function in /store/actions/auth.js
    // console.log(this.state);
    this.props.onAuth(authType, formData).then(() => {
      // If auth successful then redirect to main homepage "/" route
      this.props.history.push('/');
    })
    .catch(() => {
      // If authorisation not successful just leave the user where they are - the addError functionality is in auth.js
      return;
    });
  }

  // Render Page
  render() {
    const { email, username  } = this.state;
    const { heading, buttonText, signUp, errors, history, removeError } = this.props;

    /**
     * history.listen will trigger whenever a route changes - in practice this means if you either enter a bad username/password combo or
     * don't fill in a field in signup form (or anything else that triggers an error) then the URL changes.
     * Specifically - login - you either log in successfully in which case URL changes to "/"
     * or - signup - you've signed up and therefore auto-logged in and ^^ triggers
     * If neither of these things happens then URL doesn't change and error remains
     */
    history.listen(() => {
      removeError();
    });

    return (
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
              <h2>{heading}</h2>
              {/* Show Errors if they exist */}
              {errors.message && <div className="alert alert-danger">{errors.message}</div>}
              <label htmlFor="email">Email:</label>
              <input className="form-control" id="email" name="email" type="text"
                onChange={this.handleChange}
                value={email} />

              <label htmlFor="password">Password:</label>
              <input className="form-control" id="password" name="password" type="password"
                onChange={this.handleChange} />

              {/* If signUp form to be rendered then show additional fields */}
              {signUp && (
                  <div>
                  <label htmlFor="username">Username:</label>
                  <input className="form-control" id="username" name="username" type="text"
                    onChange={this.handleChange}
                    value={username} />

                  <label htmlFor="image-url">Image URL:</label>
                  <input className="form-control" id="image-url" name="profileImageUrl" type="file"
                    onChange={this.handleFileChange} accept="image/*" />
                  </div>
              )} {/* End if signUp */}
              <button type="submit" className="btn btn-primary btn-block btn-lg mt-3">
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
