import React, { Component } from 'react';
import TextHighlight from 'react-text-highlight'
import { Media, Player, controls, utils } from 'react-media-player'
import './style/segment.scss'
const {
  PlayPause,
  CurrentTime,
  Progress,
  Duration,
  Volume
} = controls

class Segment extends Component {
  constructor(props) {
    super(props)
    this.clickCount = 0;
    this.singleClickTimer = '';
    this.state = {
      chunk: props.chunk,
      callback: props.onClick,
      highlight: "",
      isWritable: false,
      text: props.chunk.text,
      audioUrl: props.chunk.audioUrl,
      media: props.media
    }
    console.log(this.state.chunk.start);
    console.log(this.state.chunk.end);
  }

  handleSingleClick = () => {
    this.state.callback(this.state.chunk);
  }

  handleHover = (e) => {
    this.props.media.seekTo(this.state.chunk.start)
    this.props.audioHandler(this.state.chunk.end)
    this.setState({
      highlight: this.state.text
    });
    this.props.media.play();
  }

  handleHoverOut = (e) => {
    if (this.props.media.isPlaying) {
      this.props.media.pause()
    }
    this.setState({
      highlight: ""
    });
  }

  handleDoubleClick = (e) => {
    this.setState({
      isWritable: true
    })
  }

  onValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClicks = () => {
  	this.clickCount++;
    // if (this.clickCount === 1) {
    //   this.singleClickTimer = setTimeout(function() {
    //     this.clickCount = 0;
    //     this.handleSingleClick();
    //   }.bind(this), 300);
    //
    // } else
    if (this.clickCount === 2) {
      this.clickCount = 0;
      this.handleDoubleClick();
    }
  }

  handleEnter = (e) => {
    this.setState({
      isWritable: false
    })
  }


  render() {
    var audioHandler = this.props.audioHandler;
    return (
      <div className="segment" onMouseOver={this.handleHover}
           onClick={() => this.handleClicks()}
           onMouseOut={this.handleHoverOut}
           onDoubleClick={this.handleDoubleClick}
           >
        { !this.state.isWritable &&
          <TextHighlight className="highlight"
            highlight={this.state.highlight}
            text={this.state.text}
          />
        }

        { this.state.isWritable &&
          <textarea className="text-box"
                 name="text"
                 type='text'
                 value={this.state.text}
                 onChange={this.onValueChange}
                 ></textarea>

        }
        {
          this.state.isWritable && <button onClick={this.handleEnter}>Edit</button>
        }
      </div>
    )
  }
}

export default Segment
