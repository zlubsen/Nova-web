import React, { Component } from 'react'
import axios from 'axios'

export default class SensorContainer extends Component {
  render() {
    return (
      <div id="sensorContainer">
        <SensorBox className="sensorBox" name="Servo 1" sensorId="servo1" />
        <SensorBox className="sensorBox" name="Servo 2" sensorId="servo2" />
        <SensorBox className="sensorBox" name="Servo 3" sensorId="servo3" />
        <SensorBox className="sensorBox" name="Servo 4" sensorId="servo4" />
        <SensorBox className="sensorBox" name="Servo 5" sensorId="servo5" />
        <SensorBox className="sensorBox" name="Ultrasound" sensorId="ultrasound" />
      </div>
    )
  }
}

class SensorBox extends Component {
  state = {
    sensorValue: -1
  }

  componentDidMount() {
    axios.get(`http://localhost:3030/status/${this.props.sensorId}`)
    .then(res => {
      const sensorValue = res.value;
      this.setState({ sensorValue });
    })
    .catch(function (error) {
      this.setState({sensorValue:NaN});
    });
  }

  render() {
    return (
      <div className="sensorBox">
        {this.props.name}: {this.state.sensorValue}
      </div>
    )
  }
}
