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
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: index === this.state.value,
        onSelect: (event) => {
          this.setState({
          value: index
        })}
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
        <button className={className} onSelect={this.props.onSelect}>
          {this.props.children}
        </button>
      )
    }
}

class TimeGroup extends Component {
  render() {
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {

      })
    })
    return (
      <div>
        {children}
      </div>
    )
  }
}

class Time extends Component {
  render() {
    return (<p>{this.props.children}</p>)
  }
}

class Subject extends Component {
  render() {
    return (<p>{this.props.children}</p>)
  }
}

class AudioControl extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='chunk-time'>
        <TimeGroup>
          <Time>Start Time: {this.props.start}</Time>
          <Time>End Time: {this.props.end}</Time>
          <Subject>Subject: {this.props.subject}</Subject>
        </TimeGroup>
        <ButtonGroup>
          <RadioButton onClick={e => {this.props.handleIncrement(e, "start")}}>{">"}</RadioButton>
          <RadioButton onClick={e => {this.props.handleDecrement(e, "start")}}>{"<"}</RadioButton>
          <RadioButton onClick={e => {this.props.handleIncrement(e, "end")}}>{">"}</RadioButton>
          <RadioButton onClick={e => {this.props.handleDecrement(e, "end")}}>{"<"}</RadioButton>
        </ButtonGroup>
      </div>
    )
  }
}

export default AudioControl;
