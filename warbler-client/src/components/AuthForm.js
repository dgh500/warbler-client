import React, { Component } from 'react';
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

  /**
   * Handle submit of the login / sign up form and redirect user to home page if successful
   * @param {event} e - synthetic event - https://reactjs.org/docs/events.html
   */
  handleSubmit = (e) => {
    // Prevent page refresh
    e.preventDefault();
    // Are we signing up or signing in?
    const authType = this.props.signUp ? "signup" : "signin";
    //
    this.props.onAuth(authType, this.state).then(() => {
      this.props.history.push('/');
    })
    .catch(() => {
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
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              // Show Errors if they exist
              {errors.message && <div className="alert alert-danger">{errors.message}</div>}
              <label htmlFor="email">Email:</label>
              <input className="form-control" id="email" name="email" type="text"
                onChange={this.handleChange}
                value={email} />

              <label htmlFor="password">Password:</label>
              <input className="form-control" id="password" name="password" type="password"
                onChange={this.handleChange} />

              // If signUp form to be rendered then show additional fields
              {signUp && (
                  <div>
                  <label htmlFor="username">Username:</label>
                  <input className="form-control" id="username" name="username" type="text"
                    onChange={this.handleChange}
                    value={username} />

                  <label htmlFor="image-url">Image URL:</label>
                  <input className="form-control" id="image-url" name="profileImageUrl" type="text"
                    onChange={this.handleChange} />
                  </div>
              )} // End if signUp
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
