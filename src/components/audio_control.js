import React, { Component } from 'react';
import '../style/transcription.scss';
import { Media, Player, controls } from 'react-media-player';
const {
  CurrentTime,
  Progress,
  SeekBar
} = controls

class ButtonGroup extends Component {
  state = {
    value: ""
  }

  render() {
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        isActive: child.props.value === this.state.value
      })
    })
    return (
      <div className="button-group">
        {children}
      </div>
    )
  }
}

class RadioButton extends Component {
    render() {
      const { isActive, onSelect } = this.props;
      const className = "radio-button " + (isActive ? "active" : "")
      return (
        <button className={className} onClick={this.props.onClick}>
          {this.props.children}
        </button>
      )
    }
}

class AudioControl extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='chunk-time'>
        <p>Start Time: {this.props.start}</p>
        <p>End Time: {this.props.end}</p>
        <ButtonGroup>
          <RadioButton value="1"
                       onClick={e => {this.props.handleIncrement(e, "start")}}>{">"}</RadioButton>
          <RadioButton value="2"
                       onClick={e => {this.props.handleDecrement(e, "start")}}>{"<"}</RadioButton>
          <RadioButton value="3"
                       onClick={e => {this.props.handleIncrement(e, "end")}}>{">"}</RadioButton>
          <RadioButton value="4"
                       onClick={e => {this.props.handleDecrement(e, "end")}}>{"<"}</RadioButton>
        </ButtonGroup>
      </div>
    )
  }
}

export default AudioControl;
