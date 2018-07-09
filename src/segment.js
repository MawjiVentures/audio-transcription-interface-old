import React, { Component } from 'react';
import TextHighlight from 'react-text-highlight'

class Segment extends Component {
  constructor(props) {
    super(props)
    this.clickCount = 0;
    this.singleClickTimer = '';
    this.state = {
      chunk: props.chunk,
      callback: props.onClick,
      highlight: "",
      isWritable: false,
      text: props.chunk.text
    }
    this.handleSingleClick = this.handleSingleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleHoverOut = this.handleHoverOut.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }
  
  handleSingleClick() {
    this.state.callback(this.state.chunk);
  }
  
  handleHover(e) {
    this.setState({
      highlight: this.state.text
    });
  }
  
  handleHoverOut(e) {
    this.setState({
      highlight: ""
    });
  }
  
  handleDoubleClick(e) {
    this.setState({
      isWritable: true
    })
  }
  
  onValueChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  handleClicks(){
  	this.clickCount++;
    if (this.clickCount === 1) {
      this.singleClickTimer = setTimeout(function() {
        this.clickCount = 0;
        this.handleSingleClick();
      }.bind(this), 300);

    } else if (this.clickCount === 2) {
      clearTimeout(this.singleClickTimer);
      this.clickCount = 0;
      this.handleDoubleClick();
    }
  }
  
  handleEnter(e) {
    this.setState({
      isWritable: false
    })
  }

  render() {
    return (
      <div onMouseOver={this.handleHover} 
           onClick={() => this.handleClicks()}
           onMouseOut={this.handleHoverOut}
           onDoubleClick={this.handleDoubleClick}
           >
           
        { !this.state.isWritable && <TextHighlight
          highlight={this.state.highlight}
          text={this.state.text}
        />
        }
        
        { this.state.isWritable && 
          <input name="text" 
                 type='text' 
                 value={this.state.text}
                 onChange={this.onValueChange}
                 onKeyPress={e => {
                   if (e.key === 'Enter') {
                     this.handleEnter(e)
                   }
                 }}
                 ></input>
        }
      </div>
    )
  }
}

export default Segment
