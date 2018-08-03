import React, { Component } from 'react';

class SubmitForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form action={this.props.submitTo} method="POST" target="_top">
        <input
            type="hidden"
            name="data"
            value={this.props.data}
            />
          <input
            type="hidden"
            name="assignmentId"
            value={this.props.assignmentId}
            />
          <input onClick={this.handleOnclick} type="submit" value="Submit"/>
        </form>
    )
  }
}

export default SubmitForm;
