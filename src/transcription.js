import React, { Component } from 'react';
import './App.css';
import queryString from 'qs';
import { Media, Player, controls, utils } from 'react-media-player'
import './formatTime'
import Segment from './segment'
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
      data: [
        {"start": "0", "end": "5", "text": "lalalalaala"},
        {"start": "5", "end": "10", "text": "lalalalaala"},
        {"start": "10", "end": "15", "text": "lalalalaala"},
        {"start": "15", "end": "20", "text": "lalalalaala"},
        {"start": "20", "end": "25", "text": "lalalalaala"}
      ]
    }
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(chunk) {
    console.log("clicked");
    console.log(chunk.text);
    console.log(chunk.start);
    console.log(chunk.end);
  }

  render() {
    const parsedQuery = queryString.parse(window.location.search, { ignoreQueryPrefix: true })
    const audioUrl = parsedQuery.audioUrl

    return (
      <div>
      <Media>
        { mediaProps =>
          <div
            className="media"
          >
            <Player
              src={audioUrl}
              className="media-player"
            />
            <div className="media-controls">
              <PlayPause/>
            </div>
          </div>
        }
      </Media>
      {
        this.state.data.map((chunk, i) => {
          return <Segment id={i} chunk={chunk} onClick={this.handleClick} />
        })
      }
      </div>
    )
  }
}

export default Transcription;
