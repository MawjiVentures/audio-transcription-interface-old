import React, { Component } from 'react';
import logog from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import queryString from 'qs';
import { Media, Player, controls, utils } from 'react-media-player'
import './formatTime';
import Segment from './segment';
import './style/transcription.scss';
const {
  CurrentTime,
  Progress,
  SeekBar
} = controls

class Transcription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audioUrl: '',
      tempStart: "0",
      tempEnd: 0,
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

  audioHandler = (endTime) => {
    this.setState({
      tempEnd: endTime
    })
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handlePlayPause = (event, media) => {
    if (event.key == "Enter" &&
        event.shiftKey &&
        this.state.value.length > 0 &&
        this.state.attemped == false &&
        this.state.disable == false) {
      this.setState({
        data: [...this.state.data, {
          id: this.state.count,
          text: this.state.value,
          start: Math.floor(this.state.start),
          end: Math.ceil(this.state.current_time)
        }],
        start: Math.floor(this.state.current_time),
        value: '',
        count: this.state.count + 1
      })
      this.player.focus();
      if (media.isPlaying) {
        media.pause();
      }
    } else if (event.key == 'Enter' &&
               event.shiftKey &&
               this.state.attemped == true &&
               this.state.disable == false){
      this.setState({
        data: [...this.state.data, {
          id: this.state.count,
          text: this.state.value,
          start: Math.floor(this.state.start),
          end: Math.floor(media.duration)
        }],
        disable: true,
        value: '',
        count: this.state.count + 1
      })
    } else if (event.key == "Enter" &&
               event.shiftKey) {
      this.setState({
        value: ''
      })
      this.player.focus();
    } else if (event.key == "Enter" &&
               media.isPlaying &&
               event.ctrlKey) {
      media.pause();
    } else if (event.key == "Enter" &&
               !media.isPlaying &&
               event.ctrlKey) {
      media.play();
    } else if (event.key == "=" && event.ctrlKey) {
      media.seekTo(media.currentTime + 5);
    } else if (event.key == "0" && event.ctrlKey) {
      media.seekTo(media.currentTime - 5);
    }
  }

  onPauseHandler = (event, mediaProps) => {
    this.setState({current_time: event.currentTime});
  }

  onFinishHandler = (event, mediaProps) => {
    this.setState({current_time: event.currentTime});
    if (Math.round(event.currentTime) == Math.round(mediaProps.duration)) {
      this.setState({
        attemped: true
      })
      this.textbox.focus();
    } else if (this.state.tempEnd != 0 && Math.round(event.currentTime) == this.state.tempEnd) {
      mediaProps.pause()
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

  componentDidMount() {
    const parsedQuery = queryString.parse(window.location.search, { ignoreQueryPrefix: true })

    if (parsedQuery.chunks) {
      let preload_chunks = JSON.parse(parsedQuery.chunks);

      preload_chunks.forEach(chunk => {
        this.setState({
          data: [...this.state.data, {
            id: this.state.count,
            text: "",
            start: chunk.start,
            end: chunk.end
          }],
          count: this.state.count + 1
        })
      })
    }

    this.player.focus();
  }

  buttonOnClick = (event, mediaProps) => {
    if (mediaProps.isPlaying) {
      mediaProps.pause();
      this.textbox.focus();
    } else {
      mediaProps.play();
      this.textbox.focus();
    }
  }

  handleForward = (event, mediaProps) => {
    mediaProps.seekTo(mediaProps.currentTime + 5);
  }

  handleBackward = (event, mediaProps) => {
    mediaProps.seekTo(mediaProps.currentTime - 5);
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
                    onTimeUpdate={e => {this.onFinishHandler(e, mediaProps)}}
                    />

          <div className="media-controls">
            <Progress />
            <CurrentTime />
            <SeekBar />
            <div>
              <button
                className="play-button"
                ref={(player) => {this.player = player; }}
                onClick={e=> {this.buttonOnClick(e, mediaProps)}}
                >
                {mediaProps.isPlaying ? "Pause" : "Play" }
              </button>
              <button
                className="forward-button"
                onClick={e => {this.handleForward(e, mediaProps)}}
                >
                Forward
              </button>
              <button
                className="backward-botton"
                onClick={e => {this.handleBackward(e, mediaProps)}}
                >
                Backward
              </button>
            </div>
          </div>
          <div className="container">
            <div className="form">
              <form action={submitTo} method="POST" target="_top">
                {hidden_fields}
                <textarea ref={(textbox) => {this.textbox = textbox; }}
                          onKeyPress={(e) => {this.handlePlayPause(e, mediaProps)}}
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
