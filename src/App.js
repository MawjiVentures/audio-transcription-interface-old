import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AudioPlayer from "react-h5-audio-player";
import queryString from 'qs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write.',
      current_time: "",
      time_step_series: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.onPauseHandler = this.onPauseHandler.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  onPauseHandler(event) {
    this.setState({current_time: event.timeStamp});
    this.setState({
      time_step_series: this.state.time_step_series.concat([event.timeStamp])
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
        <AudioPlayer
          autoPlay
          src={audioUrl}
          onPlay={e => console.log(this.state.time_step_series)}
          onPause={e => this.onPauseHandler(e)}
          // other props here
          />
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
