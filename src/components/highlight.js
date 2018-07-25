import React, { Component } from 'react';
import TextHighlight from 'react-text-highlight';

class Highlight extends Component {
  constructor(props) {
    super(props);
    this.state={
      highlight: ""
    }
  }

  handleHover = (e) => {
    this.setState({
      highlight: this.props.text
    });
  }

  handleHoverOut = (e) => {
    setTimeout(() => {
      this.setState({
        highlight: ""
      });
    }, 800);
  }

  render() {
    return (
      <div className="highlight"
           onClick={this.props.handleClick}
           onMouseOver={this.handleHover}
           onMouseOut={this.handleHoverOut}>
        <TextHighlight
          highlight={this.state.highlight}
          text={this.props.text}
          />
      </div>
    )
  }
}

export default Highlight;
