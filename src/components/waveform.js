import Waveform from 'waveform-react';
import React, { Component } from 'react';
import { getAudioBuffer, getContext } from './utils';
import '../style/wave_form.scss';

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
      <div className="wave_form">
        <Waveform
          buffer={this.state.buffer}
          height={30}
          markerStyle={{
            // Position marker color
            color: '#f2f2f2',
            // Position marker width (in pixels)
            width: 1
          }}
          onPositionChange={pos => console.log(pos)}
          plot="bar"
          position={0.5}
          responsive={true}
          showPosition={true}
          waveStyle={{
            // animate waveform on draw (default: true)
            animate: true,
            // waveform color
            color: '#f2f2f2',
            // width of each rendered point (min: 1, max: 10)
            pointWidth: 1
          }}
          width={600}
          />
      </div>
    );
  }
}

export default WaveForm;
