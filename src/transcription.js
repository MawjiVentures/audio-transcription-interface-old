import React, { Component } from 'react';
import './App.css';
import queryString from 'qs';
import { Media, Player, controls } from 'react-media-player'
import './formatTime';
import Segment from './segment';
import './style/transcription.scss';
import SubmitForm from './components/submit_form';
const {
  CurrentTime,
  SeekBar
} = controls

class Transcription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audioUrl: '',
      tempStart: "0",
      tempEnd: 0,
      value: '',
      current_time: "",
      data: [],
      attemped: false,
      start: 0,
      end: 0,
      disable: false,
      count: 0
    }
  }

  audioHandler = (endTime) => {
    this.setState({
      tempEnd: endTime
    })
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handlePlayPause = (event, media) => {
    if (event.key === "Enter" &&
        event.shiftKey &&
        this.state.value.length > 0 &&
        this.state.attemped === false &&
        this.state.disable === false) {
      this.setState({
        data: [...this.state.data, {
          id: this.state.count,
          text: this.state.value,
          start: Math.floor(this.state.start),
          end: Math.ceil(this.state.current_time)
        }],
        start: Math.floor(this.state.current_time),
        value: '',
        count: this.state.count + 1
      })
      this.player.focus();
      if (media.isPlaying) {
        media.pause();
      }
    } else if (event.key === 'Enter' &&
               event.shiftKey &&
               this.state.attemped === true &&
               this.state.disable === false){
      this.setState({
        data: [...this.state.data, {
          id: this.state.count,
          text: this.state.value,
          start: Math.floor(this.state.start),
          end: Math.floor(media.duration)
        }],
        disable: true,
        value: '',
        count: this.state.count + 1
      })
    } else if (event.key === "Enter" &&
               this.state.disable === true &&
               event.shiftKey) {
      this.setState({
        value: ''
      })
      this.player.focus();
    } else if (event.key === "Enter" &&
               media.isPlaying &&
               event.ctrlKey) {
      media.pause();
    } else if (event.key === "Enter" &&
               !media.isPlaying &&
               event.ctrlKey) {
      media.play();
    } else if (event.key === "=" && event.ctrlKey) {
      media.seekTo(media.currentTime + 5);
    } else if (event.key === "0" && event.ctrlKey) {
      media.seekTo(media.currentTime - 5);
    }
  }

  onPauseHandler = (event, mediaProps) => {
    this.setState({current_time: event.currentTime});
  }

  onFinishHandler = (event, mediaProps) => {
    this.setState({current_time: event.currentTime});
    if (Math.round(event.currentTime) === Math.round(mediaProps.duration)) {
      this.setState({
        attemped: true
      })
      this.textbox.focus();
    } else if (this.state.tempEnd !== 0 && Math.round(event.currentTime) === this.state.tempEnd) {
      this.setState({
        tempEnd: 0
      });
      mediaProps.seekTo(event.currentTime);
      mediaProps.pause();
    }
  }

  textChangeHandler = (event, id, text) => {
    var new_data = this.state.data.map((chunk) => {
      if (chunk.id === id) {
        chunk.text = text;
      }
      return chunk;
    });
    this.setState({
      data: new_data
    })
  }

  componentDidMount() {
    const parsedQuery = queryString.parse(window.location.search, { ignoreQueryPrefix: true })

    if (parsedQuery.chunks) {
      let preload_chunks = JSON.parse(parsedQuery.chunks);

      preload_chunks.forEach(chunk => {
        this.setState({
          data: [...this.state.data, {
            id: this.state.count,
            text: "",
            start: chunk.start,
            end: chunk.end
          }],
          count: this.state.count + 1,
          disable: true
        })
      })
    }

    this.player.focus();
  }

  buttonOnClick = (event, mediaProps) => {
    if (mediaProps.isPlaying) {
      mediaProps.pause();
      this.textbox.focus();
    } else {
      mediaProps.play();
      this.textbox.focus();
    }
  }

  handleForward = (event, mediaProps) => {
    mediaProps.seekTo(mediaProps.currentTime + 5);
  }

  handleBackward = (event, mediaProps) => {
    mediaProps.seekTo(mediaProps.currentTime - 5);
  }

  render() {
    const parsedQuery = queryString.parse(window.location.search, { ignoreQueryPrefix: true })
    const audioUrl = parsedQuery.audioUrl;
    const submitTo = parsedQuery.submitTo;
    const assignmentId = parsedQuery.assignmentId;

    return (
      <section className="transcription">
        <header className="App-header">
          <h1 className="App-title">Audio Transcription</h1>
        </header>
        <hr />
        <ul className="App-intro">
          <h3>Instructions: </h3>
          <li><p>Press the play button to listen to the audio clip.</p></li>
          <li><p>Press control and enter to play & pause audio.</p></li>
          <li><p>Press shift and enter to create a chunk.</p></li>
        </ul>
      <Media>
        { mediaProps =>
          <section className="media">
            <Player src={audioUrl}
                    className="media-player"
                    onPause={e => {this.onPauseHandler(e, mediaProps)}}
                    onTimeUpdate={e => {this.onFinishHandler(e, mediaProps)}}
                    />

          <section className="media-controls">
            <div className="media-info">
              <CurrentTime />
              <SeekBar />
            </div>
            {
              !this.state.disable &&
            <section>
              <button
                className="play-button"
                ref={(player) => {this.player = player; }}
                onClick={e=> {this.buttonOnClick(e, mediaProps)}}
                >
                {mediaProps.isPlaying ? "Pause" : "Play" }
              </button>
              <button
                className="forward-button"
                onClick={e => {this.handleForward(e, mediaProps)}}
                >
                Forward
              </button>
              <button
                className="backward-botton"
                onClick={e => {this.handleBackward(e, mediaProps)}}
                >
                Backward
              </button>
            </section>
          }
        </section>
          <section className="container">
            <section className="chunks">
              { this.state.data.map((chunk, i) => {
                  return <Segment id={chunk.id}
                            chunk={chunk}
                            onClick={this.handleClick}
                            media={mediaProps}
                            audioHandler={this.audioHandler}
                            textChangeHandler={this.textChangeHandler}
                          /> }) }
            </section>
            { !this.state.disable &&
              <section className="form">
                <textarea ref={(textbox) => {this.textbox = textbox; }}
                  onKeyPress={(e) => {this.handlePlayPause(e, mediaProps)}}
                  value={this.state.value}
                  onChange={this.handleChange}
                  className="transcription-input" />
              </section> }
          </section>
          <SubmitForm submitTo={submitTo}
                      data={JSON.stringify(this.state.data)}
                      assignmentId={assignmentId} />
        </section>
        }
      </Media>
    </section>
    )
  }
}

export default Transcription;
