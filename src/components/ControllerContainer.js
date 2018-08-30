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
  state = {
    Kp_value: -1,
    Ki_value: -1,
    Kd_value: -1,
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:5000/config/${this.props.controllerId}`)
    .then(res => {
      const Kp_val = res.Kp;
      const Ki_val = res.Ki;
      const Kd_val = res.Kd;
      this.setState({ Kp:Kp_val, Ki:Ki_val, Kd:Kd_val });
    })
    .catch(function (error) {
      //this.setState({Kp:NaN, Ki:NaN, Kd:NaN});
    });
  }

  render() {
    return (
      <div>
        {this.props.name}:<br/>
        Kp: <input type='text' value={this.state.Kp_value} onChange={evt => this.updateControllerValue(evt, 'Kp')} /><br/>
        Ki: <input type='text' value={this.state.Ki_value} onChange={evt => this.updateControllerValue(evt, 'Ki')} /><br/>
        Kd: <input type='text' value={this.state.Kd_value} onChange={evt => this.updateControllerValue(evt, 'Kd')} /><br/>
      </div>
    )
  }

  updateControllerValue(evt, param) {
    if(param == 'Kp')
      this.setState({Kp_value:evt.target.value});
    else if(param = 'Ki')
      this.setState({Ki_value:evt.target.value});
    else if(param = 'Kd')
      this.setState({Kd_value:evt.target.value});

    this.sendControllerValues();
  }

  sendControllerValues() {
    axios.post(`http://127.0.0.1:5000/config/${this.props.controllerId}`, {
      Kp: this.state.Kp_value,
      Ki: this.state.Ki_value,
      Kd: this.state.Kd_value
    })
    .then(res => {
    });
  }
}
