import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editUser } from '../store/actions/users';
import DefaultProfileImg from '../images/default-profile-image.jpg';

class EditProfile extends Component {

  // Initialise local state
  constructor(props) {
    super(props);
    this.state = {
      // _id: props.user.id,
      email: props.user.email,
      username: props.user.username,
      // password: '',
      profileImageUrl: props.user.profileImageUrl
    };
  }

  /**
   * Define prop types
   */
   static propTypes = {
     // Errors object
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
   * xx
   * @param {event} e - synthetic event - https://reactjs.org/docs/events.html
   */
  handleSubmit = (e) => {
    // Prevent page refresh
    e.preventDefault();
    // let user = {...this.state}
    const formData = new FormData();
    if(this.state.profileImageUrl !== undefined) {
      formData.append('profileImageUrl', this.state.profileImageUrl);
    }
    formData.append('username', this.state.username);
    formData.append('email', this.state.email);
    this.props.editUser(formData)
    .then(() => {
      this.props.history.push('/');
    });
  }

  // Render Page
  render() {
    const { email, username, profileImageUrl  } = this.state;
    const { errors, history, removeError } = this.props;

    /**
     * xx
     */
    history.listen(() => {
      removeError();
    });

    return (
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
              <h2>Edit Your Profile</h2>
              {/* Show Errors if they exist */}
              {errors.message && <div className="alert alert-danger">{errors.message}</div>}
              <label htmlFor="email">Email:</label>
              <input className="form-control" id="email" name="email" type="text"
                onChange={this.handleChange}
                value={email} />

              {/* <label htmlFor="password" className="mt-3">Password:</label>
               <input className="form-control" id="password" name="password" type="password"
                 onChange={this.handleChange} />*/}

              <div>
              <label htmlFor="username" className="mt-3">Username:</label>
              <input className="form-control" id="username" name="username" type="text"
                onChange={this.handleChange}
                value={username} />
              <div className="row mt-3">
                <div className="col-3">
                  <img
                    src={profileImageUrl.length > 1 ? `http://localhost:8081/images/${profileImageUrl}` : DefaultProfileImg}
                    alt={username}
                    width="100"
                    height="100"
                    className="img-thumb"
                    id="userAsideImg" />
                </div>
                <div className="col-9 text-left">
                  <label htmlFor="image-url">Profile Image:</label>
                  <input className="form-control" id="image-url" name="profileImageUrl" type="file"
                    onChange={this.handleFileChange} accept="image/*" />
                </div>
              </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg mt-3">
                Confirm Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { editUser })(EditProfile);
