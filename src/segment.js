import React, { Component } from 'react';

class Segment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chunk: props.chunk,
      callback: props.onClick
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }
  
  handleClick() {
    this.state.callback(this.state.chunk);
  }
  
  handleHover(e) {
    console.log("mouse over")
  }

  render() {
    return (
      <div>
        <p onMouseOver={this.handleHover} onClick={this.handleClick}> {this.state.chunk.text} </p>
      </div>
    )
  }
}

export default Segment
