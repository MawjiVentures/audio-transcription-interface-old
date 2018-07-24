import React, { Component } from 'react';
import '../style/transcription.scss';
import { Media, Player, controls } from 'react-media-player';
const {
  CurrentTime,
  Progress,
  SeekBar
} = controls

class AudioControl extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='chunk-time'>
        <div className="time-control">
          <p>Start Time: {this.props.start}</p>
          <button
            className="inc-button"
            onClick={e => {this.props.handleIncrement(e, "start")}}>
            {">"}</button>
          <button
            className="dec-button"
            onClick={e => {this.props.handleDecrement(e, "start")}}
            >{"<"}</button>
        </div>
        <div className="time-control">
          <p>End Time: {this.props.end}</p>
          <button
            className="inc-button"
            onClick={e => {this.props.handleIncrement(e, "end")}}
            >{">"}</button>
          <button
            className="dec-button"
            onClick={e => {this.props.handleDecrement(e, "end")}}
            >{"<"}</button>
        </div>
      </div>
    )
  }
}

export default AudioControl;
