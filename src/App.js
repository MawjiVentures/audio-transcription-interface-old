import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AudioPlayer from "react-h5-audio-player";
import queryString from 'qs';
import { Media, Player, controls, utils } from 'react-media-player'
import './formatTime'
const { PlayPause, 
        CurrentTime, 
        Progress, 
        SeekBar, 
        Duration, 
        MuteUnmute, 
        Volume, 
        Fullscreen } = controls
const { keyboardControls } = utils

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write.',
      initial_time: "",
      current_time: "",
      time_step_series: [0]
    };
    this.handleChange = this.handleChange.bind(this);
    this.onPauseHandler = this.onPauseHandler.bind(this);
    this.onPlayHandler = this.onPlayHandler.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  onPlayHandler(event) {
    this.setState({current_time: event.timeStamp})
    console.log(this.state.current_time)
  }
  
  onPauseHandler(event) {
    this.setState({current_time: event.currentTime});
    this.setState({
      time_step_series: this.state.time_step_series.concat([event.currentTime])
    })
  }
  

  render() {
    const parsedQuery = queryString.parse(window.location.search, { ignoreQueryPrefix: true });
    const audioUrl = parsedQuery.audioUrl;
    const submitTo = parsedQuery.submitTo
    const assignmentId = parsedQuery.assignmentId

    let hidden_fields;

    if(assignmentId !== undefined) {
      hidden_fields = <input type="hidden" name="assignmentId" value={assignmentId}/>
    };

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Audio Transcription</h1>
        </header>
        <p className="App-intro">
      Press the play button to listen to the audio clip.
        </p>          
        <Media>
          { mediaProps =>
            <div
              className="media"
              onKeyDown={keyboardControls.bind(null, mediaProps)}
            >
              <Player
                src={audioUrl}
                className="media-player"
                onPause={e => {
                  this.onPauseHandler(e)
                  console.log(this.state.time_step_series)
                } }
              />
              <div className="media-controls">
                <PlayPause/>
                <CurrentTime/>
                <Duration/>
                <Volume/>
              </div>
            </div>
          }
        </Media>

          <form action={submitTo} method="POST" target="_top">
            {hidden_fields}
            <textarea value={this.state.value} onChange={this.handleChange} className="transcription-input" />
            <input type="submit" value="Submit" />
          </form>
      </div>
    );
  }
}

export default App;
