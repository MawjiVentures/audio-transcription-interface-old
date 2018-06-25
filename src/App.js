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
    let hidden_assignment_fields;
    let hidden_method_fields;

    if(assignmentId !== undefined) {
      hidden_assignment_fields = <input type="hidden" name="assignmentId" value={assignmentId}/>
    };

    hidden_assignment_fields = <input type="hidden" name="_method" value="PATCH" />

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
          onPlay={e => console.log("onPlay")}
          // other props here
          />
          <form action={submitTo} method="POST" target="_top">
            {hidden_assignment_fields}
            {hidden_method_fields}

            <textarea value={this.state.value} onChange={this.handleChange} className="transcription-input" />
            <input type="submit" value="Submit" />
          </form>
      </div>
    );
  }
}

export default App;
