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
    // this.props.postNewMessage(this.state.message);
    // this.setState({ message: "" });
    this.props.history.push('/');
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
          value={this.state.messageText}
          onChange={e => this.setState({ message: e.target.value })}
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
