import React, { Component } from 'react';
import TextHighlight from 'react-text-highlight';

class Highlight extends Component {
  render() {
    return (
      <div className="highlight">
          <p className="highlight-text"
            onClick={this.props.handleClick}>
            {this.props.text}
          </p>
      </div>
    )
  }
}

export default Highlight;
