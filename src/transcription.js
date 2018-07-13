import React, { Component } from 'react';
import logog from './logo.svg';
import './App.css';
import queryString from 'qs';
import { Media, Player, controls, utils } from 'react-media-player'
import './formatTime'
import Segment from './segment'
import './style/transcription.scss'
const {
  PlayPause,
  CurrentTime,
  Progress,
  Duration,
  Volume,
  SeekBar
} = controls

class Transcription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audioUrl: '',
      tempStart: "0",
      tempEnd: "0",
      value: '',
      current_time: "",
      data: [],
      attemped: false,
      start: 0,
      end: 0,
      disable: false,
      count: 0
    }
  }

  handleOnPlay = (e, mediaProps) => {
    if (Math.round(e.currentTime) == parseInt(this.state.tempEnd)) {
      mediaProps.pause()
    }
  }

  audioHandler = (endTime) => {
    this.setState({
      tempEnd: endTime
    })
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handlePlayPause = (event, media) => {
    if (media.isPlaying && event.key == "Shift" ) {
      media.pause()
    } else if (event.key == "Shift" && this.state.attemped !== true) {
      media.play()
    } else if (event.key == "Enter"
               && this.state.attemped === true
               && this.state.disable != true) {
      this.setState({
        data: [...this.state.data, {
          id: this.state.count,
          text: this.state.value,
          start: Math.floor(this.state.start),
          end: Math.floor(media.duration)
        }],
        value: '',
        disable: true,
        count: this.state.count + 1
      })
    }
  }

  onPlayHandler = (event, mediaProps) => {
    let current_text = this.state.value;
    if (current_text.length > 1 && this.state.attemped == false) {
      this.setState({
        data: [...this.state.data, {
          id: this.state.count,
          text: current_text,
          start: Math.floor(this.state.start),
          end: Math.floor(this.state.current_time)
        }],
        start: Math.floor(this.state.current_time),
        value: '',
        count: this.state.count + 1
      });
    }
  }

  onPauseHandler = (event, mediaProps) => {
    this.setState({current_time: event.currentTime});
  }

  onFinishHandler = (event, mediaProps) => {
    if (Math.round(event.currentTime) == Math.round(mediaProps.duration)) {
      this.setState({
        attemped: true
      })
    }
  }

  textChangeHandler = (event, id, text) => {
    var new_data = this.state.data.map((chunk) => {
      if (chunk.id == id) {
        chunk.text = text;
      }
      return chunk;
    });
    this.setState({
      data: new_data
    })
  }

  render() {
    const parsedQuery = queryString.parse(window.location.search, { ignoreQueryPrefix: true })
    const audioUrl = parsedQuery.audioUrl;
    const submitTo = parsedQuery.submitTo;
    const assignmentId = parsedQuery.assignmentId;

    let hidden_fields;

    if (assignmentId !== undefined) {
      hidden_fields = <input type="hidden" name="assignmentId" value={assignmentId}/>
    }

    return (
      <div className="transcription">
        <header className="App-header">
          <h1 className="App-title">Audio Transcription</h1>
        </header>
        <p className="App-intro">
      Press the play button to listen to the audio clip.
        </p>
      <Media>
        { mediaProps =>
          <div className="media">
            <Player src={audioUrl}
                    className="media-player"
                    onPause={e => {this.onPauseHandler(e, mediaProps)}}
                    onPlay={e => {this.onPlayHandler(e, mediaProps)}}
                    onTimeUpdate={e => {this.onFinishHandler(e, mediaProps)}} />

          <div className="media-controls">
            <Progress />
            <CurrentTime />
            <SeekBar />
            <PlayPause />
          </div>
          <div className="container">
            <div className="form">
              <form action={submitTo} method="POST" target="_top">
                {hidden_fields}
                <textarea onKeyPress={(e) => {this.handlePlayPause(e, mediaProps)}}
                          value={this.state.value}
                          onChange={this.handleChange}
                          className="transcription-input" />
                <input type="submit" value="Submit" />
              </form>
            </div>
            <div className="chunks">
              {
                this.state.data.map((chunk, i) => {
                  return <Segment id={chunk.id}
                    chunk={chunk}
                    onClick={this.handleClick}
                    media={mediaProps}
                    audioHandler={this.audioHandler}
                    textChangeHandler={this.textChangeHandler}
                    />
                })
              }
            </div>
          </div>
          </div>
        }
      </Media>
      </div>
    )
  }
}

export default Transcription;
