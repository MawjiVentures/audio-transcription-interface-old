import React, { Component } from 'react';
import './App.css';
import queryString from 'qs';
import { Media, Player, controls, utils } from 'react-media-player'
import './formatTime'
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
      </div>
    )
  }
}

export default Transcription;
