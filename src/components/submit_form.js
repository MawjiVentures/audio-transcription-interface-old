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
            value={this.props.data}
            />
          <input
            type="hidden"
            value={this.props.hiddenFields}
            />
          <input type="submit" value="Submit"/>
        </form>
    )
  }
}

export default SubmitForm;
