import Waveform from 'waveform-react';
import React, { Component } from 'react';
import { getAudioBuffer, getContext } from './utils';

class WaveForm extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const context = getContext();
    this.setState({ context });
  }

  componentDidMount() {
    this.getFile();
  }

  getFile = async(path = "https://s3.amazonaws.com/wetranscribedev/uploads/task/audio/1/test1.mp3") => {
    const buffer = await getAudioBuffer(path, this.state.context);
    this.setState({ buffer });
  }

  render() {
    return (
      <Waveform
        buffer={this.state.buffer}
        height={150}
        markerStyle={{
          // Position marker color
          color: '#fff',
          // Position marker width (in pixels)
          width: 4
        }}
        onPositionChange={pos => console.log(pos)}
        plot="bar"
        position={0.5}
        responsive={false}
        showPosition={true}
        waveStyle={{
          // animate waveform on draw (default: true)
          animate: true,
          // waveform color
          color: '#000',
          // width of each rendered point (min: 1, max: 10)
          pointWidth: 1
        }}
        width={900}
      />
    );
  }
}

export default WaveForm;
