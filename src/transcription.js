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
  Volume
} = controls

class Transcription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audioUrl: '',
      tempStart: "0",
      tempEnd: "0",
      value: '',
      value_length: 0,
      current_time: "",
      time_step_series: [0],
      text_step_series: [],
      data: [],
      attemped: false,
      start: 0,
      end: 0
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
    if (media.isPlaying && event.key == 'Enter' ) {
      media.pause()
    } else if (event.key == 'Enter') {
      media.play()
    }
  }

  onPlayHandler = (event) => {
    let current_length = this.state.value.split('\n').filter(item => item != "").length
    if (this.state.value_length < current_length) {
      this.setState({text_step_series: this.state.text_step_series
                                        .concat([this.state.value]),
                     value_length: current_length
                   });
    } else {
      this.setState({
        time_step_series: this.state.time_step_series.slice(0, -1);
      })
    }
  }

  onPauseHandler = (event, mediaProps) => {
    this.setState({current_time: event.currentTime});
    this.setState({
      time_step_series: this.state.time_step_series.concat([event.currentTime]),
    })
    if (Math.round(mediaProps.duration) == Math.round(mediaProps.currentTime)) {
      let start = 0;
      let data = [];
      this.state.value.split('\n').filter(item => item != "")
        .forEach((text, index) => {
          data.push({
            text: text,
            start: start,
            end: this.state.time_step_series[index + 1] || mediaProps.duration
          })
          start = this.state.time_step_series[index + 1]
        })
      console.log(data)
      this.setState({
        data: data
      })
    }
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
                    onPlay={e => {this.onPlayHandler(e)}} />
          <Progress />
          <div className="container">
            <div className="chunks column">
              <h1>Chunks columns</h1>
              {
                this.state.data.map((chunk, i) => {
                  return <Segment id={i}
                    chunk={chunk}
                    onClick={this.handleClick}
                    media={mediaProps}
                    audioHandler={this.audioHandler}
                    />
                })
              }
            </div>
            <div className="column">
              <form action={submitTo} method="POST" target="_top">
                {hidden_fields}
                <textarea value={this.state.value} onChange={this.handleChange} onKeyPress={(e) => {this.handlePlayPause(e, mediaProps)}} className="transcription-input" />
                <input type="submit" value="Submit" />
              </form>
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
