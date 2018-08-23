import React, { Component } from 'react';
import TextHighlight from 'react-text-highlight';
import PropTypes from 'prop-types';

class TextBox extends Component {
  static childContextTypes = {
    handleClick: PropTypes.func.isRequired,
    subject: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    handleSubjectChange: PropTypes.func.isRequired
  }

  state = {
    handleClick: this.props.handleClick,
    subject: this.props.subject,
    start: this.props.start,
    end: this.props.end,
    text: this.props.text,
    handleSubjectChange: this.props.handleSubjectChange
  }

  getChildContext() {
    return {
      handleClick: this.state.handleClick,
      subject: this.state.subject,
      start: this.state.start,
      end: this.state.end,
      text: this.state.text,
      handleSubjectChange: this.state.handleSubjectChange
    }
  }

  render() {
    return(
      <div className="highlight">
        {this.props.children}
      </div>
    )
  }
}

class TextField extends Component {
  static contextTypes = {
    handleClick: PropTypes.func.isRequired,
    subject: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    handleSubjectChange: PropTypes.func.isRequired
  }

  state = {
    editing: false,
    draftText: this.context.subject
  }

  handleChange = (e) => {
      this.setState({
        draftText: e.target.value
      })
  }

  handleClick = () => {
    this.setState({
      editing: true
    })
  }

  handleKeyDown = (e) => {
    const enter_key = 13;
    if (enter_key == e.keyCode) {
      this.setState({
        editing: false
      })
    }
    this.context.handleSubjectChange(this.state.draftText)
  }

  render() {
    const editBox =  (<input
                       autoFocus
                       type="text"
                       onChange={this.handleChange}
                       value={this.state.draftText}
                       onKeyDown={this.handleKeyDown}>
                     </input>)


    return(
      <p className="highlight-text" onClick={this.context.handleClick}>
        <span onClick={this.handleClick}>
          {this.state.editing
            ? editBox
            : this.state.draftText}
            ({this.context.start} - {this.context.end})
            : </span>
        {this.context.text}
      </p>
    )
  }
}

class Highlight extends Component {
  render() {
    return (
      <TextBox handleClick={this.props.handleClick}
               subject={this.props.subject}
               start={this.props.start}
               end={this.props.end}
               text={this.props.text}
               handleSubjectChange={this.props.handleSubjectChange}>
        <TextField />
      </TextBox>
    )
  }
}

export default Highlight;
