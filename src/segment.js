import React, { Component } from 'react';

class Segment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chunk: props.chunk,
      callback: props.onClick
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.state.callback(this.state.chunk);
  }

  render() {
    return (
      <div>
        <p onClick={this.handleClick}> {this.state.chunk.text} </p>
      </div>
    )
  }
}

export default Segment
