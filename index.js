import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import ControllerContainer from './src/components/ControllerContainer.js'
import SensorContainer from './src/components/SensorContainer.js'
import VideoContainer from './src/components/VideoContainer.js'

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


const root = document.querySelector('#nova-app')
ReactDOM.render(<NovaApp />, root)
