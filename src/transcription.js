import React, { Component } from 'react';
import './App.css';
import queryString from 'qs';
import { Media, Player, controls } from 'react-media-player'
import './formatTime';
import Segment from './segment';
import './style/transcription.scss';
import SubmitForm from './components/submit_form';
import WaveForm from './components/waveform';
import WaveChunks from './components/wave_chunks';
import moment from 'moment';

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
      count: 0,
      subject: "Speaker"
    }
  }

  formatTime = (seconds) => {
    return moment(moment.duration(seconds, 'seconds').asMilliseconds()).format("mm:ss")
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
          start: this.formatTime(Math.floor(this.state.start)),
          end: this.formatTime(Math.ceil(this.state.current_time)),
          subject: this.state.subject
        }],
        start: Math.floor(this.state.current_time),
        value: '',
        subject: "Speaker",
        count: this.state.count + 1
      })
      this.player.focus();
      if (media.isPlaying) {
        media.pause();
      }
    } else if (event.key === 'Enter' &&
               event.shiftKey &&
               this.state.attemped === true){
      this.setState({
        data: [...this.state.data, {
          id: this.state.count,
          text: this.state.value,
          start: this.formatTime(Math.floor(this.state.start)),
          end: this.formatTime(Math.floor(media.duration)),
          subject: this.state.subject
        }],
        disable: true,
        value: '',
        subject: "Speaker",
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

  subjectChangeHandle = (event, id, subject) => {
    let new_data = this.state.data.map((chunk) => {
      if (chunk.id === id) {
        chunk.subject = subject;
      }
      return chunk;
    });

    this.setState({
      data: new_data
    })
  }

  chunkRemoveHandle = (event, id) => {
    let new_data = this.state.data.filter(item => {
      return item.id !== id
    })

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

  onSubmitClick = () => {
    console.log("submit data")
    console.log(this.state.data)
  }

  render() {
    const parsedQuery = queryString.parse(window.location.search, { ignoreQueryPrefix: true })
    const audioUrl = parsedQuery.audioUrl;
    const submitTo = parsedQuery.submitTo;
    const assignmentId = parsedQuery.assignmentId;

    const audioPlayer = (mediaProps) => {
      return (
        <Player src={audioUrl}
                className="media-player"
                onPause={e => {this.onPauseHandler(e, mediaProps)}}
                onTimeUpdate={e => {this.onFinishHandler(e, mediaProps)}}
                />) }

    const mediaInfo = (<div className="media-info">
                          <CurrentTime />
                          <SeekBar />
                       </div>)

    const buttonGroup = (mediaProps) => {
      return (<section className="main-button-group">
                <button className="play-button"
                        ref={(player) => {this.player = player; }}
                        onClick={e=> {this.buttonOnClick(e, mediaProps)}}>
                  {mediaProps.isPlaying ? "Pause" : "Play" }
                </button>
                <button className="forward-button"
                        onClick={e => {this.handleForward(e, mediaProps)}}>
                  Forward
                </button>
                <button className="backward-botton"
                        onClick={e => {this.handleBackward(e, mediaProps)}}>
                  Backward
                </button>
             </section>) }

    const audioChunks = (mediaProps) => {
      return this.state.data.map((chunk, i) => {
          return <Segment id={chunk.id}
                          chunk={chunk}
                          onClick={this.handleClick}
                          media={mediaProps}
                          audioHandler={this.audioHandler}
                          textChangeHandler={this.textChangeHandler}
                          subjectChangeHandle={this.subjectChangeHandle}
                          chunkRemoveHandle={this.chunkRemoveHandle} /> }) }

    const inputBox = (mediaProps) => {
      return (<section className="form">
                 <textarea ref={(textbox) => {this.textbox = textbox; }}
                           onKeyPress={(e) => {this.handlePlayPause(e, mediaProps)}}
                           value={this.state.value}
                           onChange={this.handleChange}
                           className="transcription-input" />
              </section>) }

    const appIntro = (
      <ul className="App-intro">
        <h3>Instructions: </h3>
        <li><p>Press the play button to listen to the audio clip.</p></li>
        <li><p>Press control and enter to play & pause audio.</p></li>
        <li><p>Press shift and enter to create a chunk.</p></li>
      </ul>
    )

    return (
      <section className="transcription">
        <header className="App-header">
          <h1 className="App-title">Audio Transcription</h1>
        </header>
        <hr />
        { appIntro }
      <Media>
        { mediaProps =>
          <section className="media" ref={n => {this.mediaPlayer = mediaProps}}>
            { audioPlayer(mediaProps) }
            <section className="media-controls">
              { mediaInfo }
              { !this.state.disable && buttonGroup(mediaProps) }
            </section>
            <section className="container">
              <section className="chunks">
                { audioChunks(mediaProps) }
              </section>
              { !this.state.disable &&  inputBox(mediaProps) }
            </section>
          </section>
        }
      </Media>
      <SubmitForm submitTo={submitTo}
                  data={JSON.stringify(this.state.data)}
                  assignmentId={assignmentId}/>
    </section>
    )
  }
}

export default Transcription;
