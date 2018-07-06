import React, { Component } from 'react';

class Segment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: props.chunk.text,
      start: props.chunk.start,
      end: props.chunk.end
    }
  }

  render() {
    return (
      <div>
        <p> {this.state.text} </p>
      </div>
    )
  }
}

export default Segment
