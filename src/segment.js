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
      media: props.media,
      clicked: false
    }
  }

  handleSingleClick = () => {
    this.state.callback(this.state.chunk);
  }

  handleHover = (e) => {
    this.setState({
      highlight: this.state.text
    });
  }

  handleHoverOut = (e) => {
    this.setState({
      highlight: ""
    });
  }

  handleSingleClick = (e) => {
    if (this.state.clicked == false) {
      this.props.media.seekTo(this.state.chunk.start)
      this.props.audioHandler(this.state.chunk.end)
      this.props.media.play();
      this.setState({
        clicked: true
      })
    } else {
      this.props.media.pause();
      this.setState({
        clicked: false
      })
    }
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
    if (this.clickCount === 1) {
      this.singleClickTimer = setTimeout(function() {
        this.clickCount = 0;
        this.handleSingleClick();
      }.bind(this), 300);

    } else if (this.clickCount === 2) {
      this.clickCount = 0;
      this.handleDoubleClick();
    }
  }

  handleEdit = (e) => {
    this.setState({
      isWritable: false
    })
    this.props.textChangeHandler(e, this.state.chunk.id, this.state.text);
  }


  render() {
    var audioHandler = this.props.audioHandler;
    return (
      <div>
        <div className="segment"
          onMouseOver={this.handleHover}
          onMouseOut={this.handleHoverOut}
          onClick={() => this.handleClicks()}
          >
          <div>
            <p>Start Time: {this.state.chunk.start}</p>
            <p>End Time: {this.state.chunk.end}</p>
          </div>
          { !this.state.isWritable &&
            <TextHighlight
              className="highlight"
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
      </div>
      {
        this.state.isWritable && <button onClick={this.handleEdit}>Edit</button>
      }
      </div>
    )
  }
}

export default Segment
