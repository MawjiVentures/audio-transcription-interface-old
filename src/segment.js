import React, { Component } from 'react';
import TextHighlight from 'react-text-highlight'

class Segment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chunk: props.chunk,
      callback: props.onClick,
      highlight: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleHoverOut = this.handleHoverOut.bind(this);
  }
  
  handleClick() {
    this.state.callback(this.state.chunk);
  }
  
  handleHover(e) {
    this.setState({
      highlight: this.state.chunk.text
    });
  }
  
  handleHoverOut(e) {
    this.setState({
      highlight: ""
    });
  }

  render() {
    return (
      <div onMouseOver={this.handleHover} 
           onClick={this.handleClick}
           onMouseOut={this.handleHoverOut}
           >
        <TextHighlight
          highlight={this.state.highlight}
          text={this.state.chunk.text}
        />
      </div>
    )
  }
}

export default Segment
