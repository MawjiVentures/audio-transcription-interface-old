import React, { Component } from 'react';
import TextHighlight from 'react-text-highlight';
import './style/segment.scss';
import AudioControl from './components/audio_control'
import Highlight from './components/highlight'

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

  handleSingleClick = (e) => {
    if (this.state.clicked === false) {
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

  handleRemove = (e) => {
    this.props.chunkRemoveHandle(e, this.state.chunk.id)
    this.setState({
      isWritable: false
    })
  }

  handleChange = ({target: { value }}) => {
    this.setState({
      start: value
    })
  }

  handleIncrement = (event, identifier) => {
    if (identifier === "start" && this.state.start + 1 <= this.state.media.duration) {
      this.setState({
        start: this.state.start + 1
      })
    } else if (identifier === "end" && this.state.end + 1 <= this.state.media.duration) {
      this.setState({
        end: this.state.end + 1
      })
    }
  }

  handleDecrement = (event, identifier) => {
    if (identifier === "start" && this.state.start - 1 >= 0) {
      this.setState({
        start: this.state.start - 1
      })
    } else if (identifier === "end" && this.state.end - 1 >= 0) {
      this.setState({
        end: this.state.end - 1
      })
    }
  }

  render() {
    return (
      <section className="segment">
          { !this.state.isWritable &&
            <section>
              <Highlight
                highlight={this.state.highlight}
                text={this.state.text}
                handleClick={this.handleClicks}
                start={this.state.start}
                end={this.state.end} />
            </section> }
          { this.state.isWritable &&
            <div>
              <AudioControl handleIncrement={this.handleIncrement}
                            handleDecrement={this.handleDecrement}
                            start={this.state.start}
                            end={this.state.end} />
              <textarea className="text-box"
                name="text"
                type='text'
                value={this.state.text}
                onChange={this.onValueChange}>
              </textarea>
            </div> }
          { this.state.isWritable &&
            <div>
              <button className="edit-button"
                      onClick={this.handleEdit}>Edit</button>
              <button className="edit-button"
                      onClick={this.handleRemove}>Remove</button>
            </div> }
      </section>
    )
  }
}

export default Segment
