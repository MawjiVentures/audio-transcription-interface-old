import React, { Component } from 'react';
import TextHighlight from 'react-text-highlight';

class Highlight extends Component {
  render() {
    return (
      <div className="highlight" onClick={this.props.handleClick}>
        <TextHighlight
          highlight={this.props.highlight}
          text={this.props.text}
          />
      </div>
    )
  }
}

export default Highlight;
