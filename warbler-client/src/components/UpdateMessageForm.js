import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editMessage, fetchOneMessage } from '../store/actions/messages';

class UpdateMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: ''
    }
  }

  componentDidMount() {
    console.log('will mount');
    this.props.fetchOneMessage(this.props.match.params.message_id)
    .then(res => {
      this.setState({messageText: this.props.message.text})
    });
  }

  handleEditMessage = e => {
    e.preventDefault();
    this.props.editMessage(this.state.messageText);
    // this.setState({ message: "" });
    // this.props.history.push('/');
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

  render() {
    return (
      <form onSubmit={this.handleEditMessage}>
        {this.props.errors.message && (
          <div className="alert alert-danger">{this.props.errors.message}</div>
        )}
        <input
          type="text"
          className="form-control"
          name="messageText"
          value={this.state.messageText}
          onChange={this.handleChange}
          />
          <button className="btn btn-success pull-right mt-2">
            Edit Warble
          </button>
      </form>
    );
  }

}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    message: state.messages[0]
  };
}

export default connect(mapStateToProps, { editMessage, fetchOneMessage })(UpdateMessageForm);
