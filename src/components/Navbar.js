import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';

class Navbar extends Component {

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand navbar-brand-centered">
              {/*<img src={Logo} alt="Warbler Home" />*/}
              <h1><i className="fas fa-kiwi-bird"></i> Warbler</h1>
              </Link>
            </div>
            {this.props.currentUser.isAuthenticated ? (
              <ul className="nav navbar-nav navbar-right">
                <li>
                <Link to={`/users/${this.props.currentUser.user.id}/messages/new`}>
                New Message</Link>
                </li>
                <li>
                  <Link to={`/profile`}>Edit Profile</Link>
                </li>
                <li>
                  <a onClick={this.logout} href="/">Log Out</a>
                </li>
              </ul>
            ) : (
          <ul className="nav navbar-nav navbar-right">
            <li>
                <Link to="/signup">Sign Up</Link>
            </li>
            <li>
                <Link to="/signin">Log In</Link>
            </li>
          </ul>)}
        </div>
      </nav>
    )
  }

}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps, { logout })(Navbar));
