import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import "./styles.css";

class NovaApp extends Component {
  render() {
    return (
      <div id="viewPort">
        <VideoContainer />
        <ControllerContainer />
        <SensorContainer />
      </div>
    )
  }
}

class ControllerContainer extends Component {
  render() {
    return (
      <div id="controllerContainer">
        <ul>
          <li>PID1</li>
          <li>PID2</li>
          <li>PID3</li>
        </ul>
      </div>
    )
  }
}

class SensorContainer extends Component {
  render() {
    return (
      <div id="controllerContainer">
        <ul>
          <li>Servo 1</li>
          <li>Servo 2</li>
          <li>Servo 3</li>
          <li>Servo 4</li>
          <li>Servo 5</li>
          <li>Ultrasound</li>
        </ul>
      </div>
    )
  }
}

class VideoContainer extends Component {
  render() {
    return (
      <div id="VideoContainer">
        here comes video...
      </div>
    )
  }
}

const root = document.querySelector('#nova-app')
ReactDOM.render(<NovaApp />, root)
