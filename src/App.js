import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AudioPlayer from "react-h5-audio-player";
import queryString from 'qs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write.'
    };
  
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  render() {
    const parsedQuery = queryString.parse(window.location.search, { ignoreQueryPrefix: true });
    const audioUrl = parsedQuery.audioUrl;
    const submitTo = parsedQuery.submitTo
    const assignmentId = parsedQuery.assignmentId
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Audio Transcription</h1>
        </header>
        <p className="App-intro">
          To get started, press play button
        </p>
        <AudioPlayer
          autoPlay
          src={audioUrl}
          onPlay={e => console.log("onPlay")}
          // other props here
          />
          <form action={submitTo} method="POST">
            <label>
            Answer:
            <textarea value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
      </div>
    );
  }
}

export default App;
