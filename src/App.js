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
    this.state = {
      value: '',
      value_length: 0,
      current_time: "",
      time_step_series: [0],
      text_step_series: [],
      data: []
    };
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
                   })
    } else {
      this.setState({
        time_step_series: this.state.time_step_series.slice(0, -1)
      })
    }
  }

  onPauseHandler = (event, mediaProps) => {
    this.setState({current_time: event.currentTime});
    this.setState({
      time_step_series: this.state.time_step_series.concat([event.currentTime]),
    })
    if (Math.round(mediaProps.duration) == Math.round(mediaProps.currentTime)) {
      let start_time = 0;
      let data = [];
      this.state.value.split('\n').filter(item => item != "")
        .forEach((text, index) => {
          data.push({
            text: text,
            start_time: start_time,
            end_time: this.state.time_step_series[index + 1] || mediaProps.duration
          })
          start_time = this.state.time_step_series[index + 1]
        })
      // console.log(data)
      this.setState({
        data: data
      })
    }
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
      // <div className="App">
      //   <header className="App-header">
      //     <h1 className="App-title">Audio Transcription</h1>
      //   </header>
      //   <p className="App-intro">
      // Press the play button to listen to the audio clip.
      //   </p>
      //   <Media>
      //     { mediaProps =>
      //       <div
      //         className="media"
      //       >
      //         <Player
      //           src={audioUrl}
      //           className="media-player"
      //           onPause={e => {
      //             this.onPauseHandler(e, mediaProps)
      //           } }
      //           onPlay={e => {
      //             this.onPlayHandler(e)
      //           }}
      //         />
      //         <div className="media-controls">
      //           <PlayPause/>
      //           <CurrentTime/>
      //           <Duration/>
      //           <Volume/>
      //         </div>
      //         <form action={submitTo} method="POST" target="_top">
      //         {hidden_fields}
      //         <textarea value={this.state.value} onChange={this.handleChange} onKeyPress={(e) => {this.handlePlayPause(e, mediaProps)}} className="transcription-input" />
      //         <input type="submit" value="Submit" />
      //         </form>
      //       </div>
      //     }
      //   </Media>
      <Transcription />
      // </div>
    );
  }
}

export default App;
