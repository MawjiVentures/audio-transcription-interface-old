import React, { Component } from 'react';
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
      data: [
        {"start": "0", "end": "5", "text": "lalalalaala"},
        {"start": "5", "end": "10", "text": "lalalalaala"},
        {"start": "10", "end": "15", "text": "lalalalaala"},
        {"start": "15", "end": "20", "text": "lalalalaala"},
        {"start": "20", "end": "25", "text": "lalalalaala"}
      ],
      tempStart: "0",
      tempEnd: "0"
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

  render() {
    const parsedQuery = queryString.parse(window.location.search, { ignoreQueryPrefix: true })
    const audioUrl = parsedQuery.audioUrl

    return (
      <div className="transcription">
      <Media>
        { mediaProps =>
          <div
            className="media"
          >
            <Player onTimeUpdate={(e) => {this.handleOnPlay(e, mediaProps)}}
              src="https://s3.ca-central-1.amazonaws.com/wetranscribe-development/store/0c6887143ab2f9a98a7a1c9e30afc060fdd694fb713fff6554ec7177e606?"
              className="media-player"
            />
          <Progress />
            <div>
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
          </div>
        }
      </Media>
      </div>
    )
  }
}

export default Transcription;
