import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewMessage, editMessage } from '../store/actions/messages';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  handleNewMessage = e => {
    e.preventDefault();
    this.props.postNewMessage(this.state.message);
    this.setState({ message: "" });
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="addMsgFormContainer">
      <form onSubmit={this.handleNewMessage}>
        {this.props.errors.message && (
          <div className="alert alert-danger">{this.props.errors}</div>
        )}
        <label htmlFor="newMsg">Add Your Warble</label>
        <p>Max 160 characters, #hashtags included. </p>
        <input
          type="text"
          id="newMsg"
          className="form-control"
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
          />
          <button className="btn btn-success pull-right mt-2">
            Add My Message
          </button>
      </form>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    errors: state.errors,

  };
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);
