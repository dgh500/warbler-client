import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * HOC - Higher Order Component - A Component that returns an 'enhanced' new Component.
 * Must be a pure function
 * @params {Component} ComponentToBeRendered - The component to render
 * Takes this component ^^ and before it mounts or updates checks if the .isAuthenticated
 * flag is false ( set in /store/reducers/currentUser ) and if so, redirects to the sign in page
 * If isAuthenticated is true then it renders the component with all props passed through
 * Uses connect() which is also a HOC which enhances the component with mapStateToProps()
 */
export default function withAuth(ComponentToBeRendered) {
  class Authenticate extends Component {
    componentWillMount() {
      if(this.props.isAuthenticated === false) {
        this.props.history.push("/signin");
      }
    }

    componentWDidUpdate(nextProps) {
    //componentDidMount(nextProps) {
      if(nextProps.isAuthenticated === false) {
        this.props.history.push("/signin");
      }
    }

    render() {
      return <ComponentToBeRendered {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.currentUser.isAuthenticated
    }
  }

  return connect(mapStateToProps)(Authenticate);
}
