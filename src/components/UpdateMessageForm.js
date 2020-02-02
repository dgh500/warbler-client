import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editMessage, fetchOneMessage } from '../store/actions/messages';

/**
  * UpdateMessageForm
  * First uses componentDidMount load the message to edit using the fetchOneMessage function passed in through mapDispatchToProps<br>
  * Then React takes on the message as this.state.messageText and updates accordingly as the user types.<br>
  * When the form is submitted handleEditMessage<br>
  * Redux mapStateToProps - the fetchOneMessage function loads a single message (that matches the URL path) into the store.messages array, which is then populated to this.state.message (as messages[0] - only one in there)<br>
  * and then when the successful edit is complete, the MessageTimeline component will repopulate the full messsages array (including this edited message)
  */
class UpdateMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: ''
    }
  }

  componentDidMount() {
    // this.props.match comes from react-router ( https://www.freecodecamp.org/news/hitchhikers-guide-to-react-router-v4-4b12e369d10/ - good guide)
    this.props.fetchOneMessage(this.props.match.params.message_id)
    .then(res => {
      this.setState({messageText: this.props.message.text})
    });
  }

  handleEditMessage = e => {
    e.preventDefault();
    this.props.editMessage(this.state.messageText)
    // Reset and send back to home page when message successfully edited
    .then(() => {
      this.setState({ message: "" });
      this.props.history.push('/');
    });
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
    message: state.messages.messages[0]
  };
}

export default connect(mapStateToProps, { editMessage, fetchOneMessage })(UpdateMessageForm);
