import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/wave_chunks.scss';

const hover = {
  backgroundColor: 'yellow'
}

class WaveChunk extends Component {
  constructor(props) {
    super(props);
    this.state={
      style: null
    }
  }

  onMouseEnterHandler = () => {
    this.setState({
      style: hover
    })
  }

  onMouseLeaveHandler = () => {
    this.setState({
      style: null
    })
  }

  render() {
    return (
      <div className="chunk"
         onMouseEnter={this.onMouseEnterHandler}
         onMouseLeave={this.onMouseLeaveHandler}
        >
        <p style={(this.state.style) ? this.state.style : void 0 }>chunk {this.props.start} {this.props.end}</p>
      </div>
    )
  }
}

class ChunksGroup extends Component {
  render() {
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {

      })
    })
    return (
      <div className="chunks-group">
        {children}
      </div>
    )
  }
}

class WaveChunks extends Component {
  static childContextTypes = {
  }

  getChildContext() {

  }

  constructor(props) {
    super(props);
    this.state = {
      chunks: this.props.chunks
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.chunks !== this.props.chunks) {
      this.setState({
        chunks: this.props.chunks
      })
    }
  }

  render() {
    const chunks = this.state.chunks.map((chunk, index) => {
      return <WaveChunk start={chunk.start} end={chunk.end}></WaveChunk>
    })
    return (
      <div className="wave-chunks">
        <ChunksGroup>
          {chunks}
        </ChunksGroup>
      </div>
    )
  }
}

WaveChunk.propTypes = {
  chunks: PropTypes.array.isRequired
}

export default WaveChunks;
