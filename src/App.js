import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from 'qs';
import { Media, Player, controls, utils } from 'react-media-player'
import './formatTime'
import Transcription from './transcription'
const { PlayPause,
        CurrentTime,
        Progress,
        Duration,
        Volume
       } = controls
const { keyboardControls } = utils

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Transcription />
    );
  }
}

export default App;
