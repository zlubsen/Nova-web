import React, { Component } from 'react'
import axios from 'axios'

export default class ControllerContainer extends Component {
  render() {
    return (
      <div id="controllerContainer">
        <ControllerBox name="Distance control" controllerId="distance_pid" />
        <ControllerBox name="Face detection X" controllerId="facedetection_pid_x" />
        <ControllerBox name="Face detection Y" controllerId="facedetection_pid_y" />
      </div>
    )
  }
}

class ControllerBox extends Component {
  controllerStepSize = 0.01

  state = {
    Kp: -1,
    Ki: -1,
    Kd: -1,
  }

  componentDidMount() {
    axios.get(`http://localhost:3030/config/${this.props.controllerId}`)
    .then(res => {
      const Kp_val = res.Kp;
      const Ki_val = res.Ki;
      const Kd_val = res.Kd;
      this.setState({ Kp:Kp_val, Ki:Ki_val, Kd:Kd_val });
    })
    .catch(function (error) {
      this.setState({Kp:NaN, Ki:NaN, Kd:NaN});
    });
  }

  render() {
    return (
      <div>
        {this.props.name}:<br/>
        Kp: <input type='text' value={this.state.Kp} onChange={evt => this.updateControllerValue(evt, 'Kp')} />&nbsp;<button onClick={evt => this.updateControllerValueStep(evt, 'Kp', true)} />&nbsp;<button onClick={evt => this.updateControllerValueStep(evt, 'Kp', false)} /><br/>
        Ki: <input type='text' value={this.state.Ki} onChange={evt => this.updateControllerValue(evt, 'Ki')} />&nbsp;<button onClick={evt => this.updateControllerValueStep(evt, 'Ki', true)} />&nbsp;<button onClick={evt => this.updateControllerValueStep(evt, 'Kp', false)} /><br/>
        Kd: <input type='text' value={this.state.Kd} onChange={evt => this.updateControllerValue(evt, 'Kd')} />&nbsp;<button onClick={evt => this.updateControllerValueStep(evt, 'Kd', true)} />&nbsp;<button onClick={evt => this.updateControllerValueStep(evt, 'Kp', false)} /><br/>
      </div>
    )
  }

  updateControllerValueStep(evt, param, positiveStep) {
    var current_value = this.state[param];

    positiveStep ?
      this.updateControllerValue(param, current_value+controllerStepSize) :
      this.updateControllerValue(param, current_value-controllerStepSize);
  }

  updateControllerValueManual(evt, param) {
    this.updateControllerValue(param, evt.target.value);
  }

  updateControllerValue(param, new_value) {
    if(param == 'Kp')
      this.setState({Kp:new_value});
    else if(param = 'Ki')
      this.setState({Ki:new_value});
    else if(param = 'Kd')
      this.setState({Kd:new_value});

    this.sendControllerValues();
  }

  sendControllerValues() {
    axios.post(`http://localhost:3030/config/${this.props.controllerId}`, {
      Kp: this.state.Kp,
      Ki: this.state.Ki,
      Kd: this.state.Kd
    })
    .then(res => {
    });
  }
}
