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
      clicked: false,
      start: props.chunk.start,
      end: props.chunk.end
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
      this.props.media.seekTo(this.state.start)
      this.props.audioHandler(this.state.end)
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

  handleChange = ({target: { value }}) => {
    this.setState({
      start: value
    })
  }

  handleIncrement = (event, identifier) => {
    if (identifier == "start" && this.state.start + 1 <= this.state.media.duration) {
      this.setState({
        start: this.state.start + 1
      })
    } else if (identifier == "end" && this.state.end + 1 <= this.state.media.duration) {
      this.setState({
        end: this.state.end + 1
      })
    }
  }

  handleDecrement = (event, identifier) => {
    if (identifier == "start" && this.state.start - 1 >= 0) {
      this.setState({
        start: this.state.start - 1
      })
    } else if (identifier == "end" && this.state.end - 1 >= 0) {
      this.setState({
        end: this.state.end - 1
      })
    }
  }

  render() {
    var audioHandler = this.props.audioHandler;
    return (
      <div>
        <div className="segment"
          onMouseOver={this.handleHover}
          onMouseOut={this.handleHoverOut}
          >
          <div className='chunk-time'>
            <div className="time-control">
              <p>Start Time: {this.state.start}</p>
              <button
                className="inc-button"
                onClick={e => {this.handleIncrement(e, "start")}}>
                {">"}</button>
              <button
                className="dec-button"
                onClick={e => {this.handleDecrement(e, "start")}}
                >{"<"}</button>
            </div>
            <div className="time-control">
              <p>End Time: {this.state.end}</p>
              <button
                className="inc-button"
                onClick={e => {this.handleIncrement(e, "end")}}
                >{">"}</button>
              <button
                className="dec-button"
                onClick={e => {this.handleDecrement(e, "end")}}
                >{"<"}</button>
            </div>
          </div>
          { !this.state.isWritable &&
            <div
              onClick={() => this.handleClicks()}
              >
              <div className="highlight">
                <TextHighlight
                  highlight={this.state.highlight}
                  text={this.state.text}
                  />
              </div>
            </div>
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
        this.state.isWritable && <button className="edit-button" onClick={this.handleEdit}>Edit</button>
      }
      </div>
    )
  }
}

export default Segment
