import React, { Component } from 'react';
import TextHighlight from 'react-text-highlight';

class Highlight extends Component {
  render() {
    return (
      <div className="highlight">
          <p className="highlight-text"
            onClick={this.props.handleClick}>
            <sup>{this.props.start}</sup>
            {this.props.text}
            <sup>{this.props.end}</sup>
          </p>
      </div>
    )
  }
}

export default Highlight;
