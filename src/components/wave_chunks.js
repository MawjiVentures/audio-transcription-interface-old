import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/wave_chunks.scss';

const hover = {
  backgroundColor: 'yellow',
  opacity: 0.5
}

class WaveChunk extends Component {
  constructor(props) {
    super(props);
    this.state={
      style: null,
      divWidth: {
        width: ((this.convertToSeconds(this.props.end) - this.convertToSeconds(this.props.start)) / this.props.duration) * this.props.totalWidth
      }
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

  convertToSeconds = (ms) => {
    return ms.split(':').reduce((acc, time) => (60 * acc) + +time);
  }
  render() {
    return (
      <div className="chunk"
         onMouseEnter={this.onMouseEnterHandler}
         onMouseLeave={this.onMouseLeaveHandler}
         style={this.state.divWidth}
        >
        <p style={(this.state.style) ? this.state.style : void 0 }>-</p>
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
      chunks: [],
      container_width: 0,
      audio_duration: 0
    }
  }

  refCallback = () => {
    let width = this.node.getBoundingClientRect()["width"]
    this.setState({
      container_width: width
    })
  }

  componentDidMount() {
    this.setState({
      chunks: this.props.chunks,
      audio_duration: this.props.duration
    })
    this.refCallback()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.chunks !== this.props.chunks) {
      this.setState({
        chunks: this.props.chunks
      })
    if (prevProps.audio_duration !== this.props.duration) {
      this.setState({
        audio_duration: Math.round(this.props.duration)
      })
    }
    }
  }

  render() {
    const chunks = this.state.chunks.map((chunk, index) => {
      return <WaveChunk start={chunk.start}
                        end={chunk.end}
                        duration={this.state.audio_duration}
                        totalWidth={this.state.container_width}></WaveChunk>
    })
    console.log("duration")
    console.log(this.state.audio_duration)
    return (
      <div className="wave-chunks" ref={n => this.node = n}>
        <ChunksGroup>
          {chunks}
        </ChunksGroup>
      </div>
    )
  }
}

WaveChunks.propTypes = {
  chunks: PropTypes.array.isRequired,
  duration: PropTypes.number.isRequired
}

export default WaveChunks;
