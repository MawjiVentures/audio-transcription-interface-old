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
      audioUrl: '',
      data: [
        {"start": "0", "end": "5", "text": "lalalalaala", "audioUrl": "https://s3.ca-central-1.amazonaws.com/wetranscribe-development/store/0c6887143ab2f9a98a7a1c9e30afc060fdd694fb713fff6554ec7177e606?"},
        {"start": "5", "end": "10", "text": "lalalalaala", "audioUrl": "https://s3.ca-central-1.amazonaws.com/wetranscribe-development/store/0c6887143ab2f9a98a7a1c9e30afc060fdd694fb713fff6554ec7177e606?"},
        {"start": "10", "end": "15", "text": "lalalalaala", "audioUrl": "https://s3.ca-central-1.amazonaws.com/wetranscribe-development/store/0c6887143ab2f9a98a7a1c9e30afc060fdd694fb713fff6554ec7177e606?"},
        {"start": "15", "end": "20", "text": "lalalalaala", "audioUrl": "https://s3.ca-central-1.amazonaws.com/wetranscribe-development/store/0c6887143ab2f9a98a7a1c9e30afc060fdd694fb713fff6554ec7177e606?"},
        {"start": "20", "end": "25", "text": "lalalalaala", "audioUrl": "https://s3.ca-central-1.amazonaws.com/wetranscribe-development/store/0c6887143ab2f9a98a7a1c9e30afc060fdd694fb713fff6554ec7177e606?"}
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

  audioHandler(url) {
    this.setState({
      audioUrl: url
    })
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
              src="https://s3.ca-central-1.amazonaws.com/wetranscribe-development/store/0c6887143ab2f9a98a7a1c9e30afc060fdd694fb713fff6554ec7177e606?"
              className="media-player"
            />
            <div className="media-controls">
              <PlayPause/>
            </div>
            {
              this.state.data.map((chunk, i) => {
                return <Segment id={i}
                  chunk={chunk}
                  onClick={this.handleClick}
                  audioHandler={this.audioHandler.bind(this)}
                  media={mediaProps} />
              })
            }
          </div>
        }
      </Media>
      </div>
    )
  }
}

export default Transcription;
