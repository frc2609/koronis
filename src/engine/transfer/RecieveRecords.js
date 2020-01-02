import React from 'react';

import * as Interface from 'db/Interface';
import { request as workerRequest } from 'engine/worker/EngineDriver';
import * as Layout from 'config/Layout';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

var deepcopy = require('deep-copy');
var Instascan = require('instascan');

export default class RecieveRecords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scanning: false,
      scanPeriod: 1,
      cameras: [],
      selectedCamera: 0
    };
    this.scanner = {};
    this.init();
  }
  init() {
    this.scanner = new Instascan.Scanner({
      video: this.refs.scanShow,
      mirror: false,
      backgroundScan: false,
      scanPeriod: this.state.scanPeriod
    });
    this.scanner.addListener('scan', this.onScan);
    this.rawStrArr = [];
    this.finishedStr = '';
  }
  camerasHandler(event) {
    this.setState({selectedCamera: event.target.value});
  }
  scanPeriodHandler(event, value) {
    this.setState({scanPeriod: value});
  }
  onFinish() {
    if(typeof this.props.onFinish == 'function') {this.props.onFinish(this.finishedStr)}
  }
  onScan(inStr) {
    var firstChar = (inStr.length > 0 ? inStr.charCodeAt(0) : 0);
    var secondChar = (inStr.length > 1 ? inStr.charCodeAt(1) : 0);
    var twoChar = (firstChar << 16) + secondChar;
    var index = ((twoChar & 268419072) >> 14);
    var length = (twoChar & 16383);
    var rawStr = inStr.substring(2);
    this.rawStrArr[index] = rawStr;
    var finishedStr = '';
    var hasUndef = false;
    for(var i = 0;i < length && !hasUndef;i++) {
      hasUndef = (typeof this.rawStrArr[i] == 'undefined');
    }
    console.log(this.rawStrArr);
    if(!hasUndef) {
      this.finishedStr = '';
      for(var i = 0;i < length;i++) {
        this.finishedStr += this.rawStrArr[i];
      }
      console.log(this.finishedStr);
      this.onFinish();
    }
  }
  startScanning() {
    this.init();
    this.setState({scanning: true});
  }
  stopScanning() {
    this.scanner.removeListener('scan', this.onScan);
    this.scanner.stop();
    this.setState({scanning: false});
  }
  componentDidMount() {
    Instascan.Camera.getCameras().then((cameras) => {
      console.log(cameras);
      this.setState({cameras: cameras});
    }).catch((err)=>{
      console.log('[Recieve QR] No Cameras');
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.scanning && !prevState.scanning) {
      Instascan.Camera.getCameras().then((cameras) => {
        if(this.state.selectedCamera < cameras.length) {
          console.log(this.scanner);
          this.scanner.start(cameras[this.state.selectedCamera]);
        }
        console.log(cameras);
        this.setState({cameras: cameras});
      }).catch((err)=>{
        console.log('[Recieve QR] No Cameras');
      });
    }
  }
  render() {
    return (
        <Container>
        <video refs='scanShow'></video>
        
        <Grid container spacing={4}>
        <Grid item xs={Layout.isLandscape() ? 6 : 12} style={{minWidth: '200px'}}>
          <FormControl variant='outlined' fullWidth>
            <InputLabel>Camera</InputLabel>
            <Select
      ref='cameras'
      onChange={this.camerasHandler.bind(this)}
      value={this.state.selectedCamera}
      fullWidth
            >
              {(typeof this.state.cameras == 'undefined') ? '' :
                this.state.cameras.map((e, i) => {
                  return <MenuItem key={i} value={i}>{e.name}</MenuItem>
                })
              }
              {this.state.cameras.length <= 0 ? <MenuItem key={-1} value={0}><em>No Cameras Detected</em></MenuItem> : ''}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={Layout.isLandscape() ? 6 : 12} style={{minWidth: '150px'}}>
            <Typography gutterBottom>
              Scan Period
            </Typography>
            <Slider
      value={this.state.scanPeriod}
      onChange={this.scanPeriodHandler.bind(this)}
      valueLabelDisplay='auto'
      step={1}
      min={1}
      max={15}
            />
        </Grid>        
        <Grid item xs={12}>
        {!this.state.scanning ?
          <Button onClick={this.startScanning.bind(this)}>Start</Button>:
          <Button onClick={this.stopScanning.bind(this)}>Stop</Button>
        }
        </Grid>
        </Grid>
        </Container>
    );
  }
}
