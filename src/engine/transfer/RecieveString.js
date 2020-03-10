import React from 'react';

import * as Layout from 'config/Layout';
import * as StringConversion from 'engine/transfer/StringConversion';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import QrReader from 'react-qr-reader';

export default class RecieveString extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scanning: false,
      delay: 1000/3,
      facingMode: 'environment',
      resolution: 300,
      totalScanned: 0,
      rate: 0,
      size: 0
    };
    this.scanner = null;
    this.init();
  }
  init() {
    this.startScan = 0;
    this.rawStrArr = [];
    this.finishedStr = '';
  }
  facingModeHandler(event) {
    this.setState({facingMode: event.target.value});
  }
  resolutionHandler(event, value) {
    this.setState({resolution: (value)});
  }
  delayHandler(event, value) {
    this.setState({delay: (1000/value)});
  }
  onFinish() {
    var data = StringConversion.numStrToStr(this.finishedStr);
    this.setState({scanning: false});
    if(typeof this.props.onFinish === 'function') {this.props.onFinish(data);}
  }
  onScan(inStr) {
    if(inStr !== null && inStr.length >= 7) {
      var index = Number.parseInt(inStr.substring(1,4));
      var length = Number.parseInt(inStr.substring(4,7));
      var rawStr = inStr.substring(7);
      this.rawStrArr[index] = rawStr;
      var hasUndef = false;
      var totalScanned = 0;
      for(var i = 0;i < length;i++) {
        var currUndef = (typeof this.rawStrArr[i] === 'undefined');
        if(!hasUndef) {
          hasUndef = currUndef;
        }
        if(!currUndef) {
          totalScanned++;
        }
      }
      //Calculate rate
      if(this.startScan === 0) {
        this.startScan = Date.now();
      }
      else {
        this.setState({size: (rawStr.length * totalScanned * 3), rate: (rawStr.length * totalScanned * 3)/(((Date.now()) - this.startScan)/1000)});
      }
      if(!hasUndef) {
        this.finishedStr = '';
        for(var i = 0;i < length;i++) { // eslint-disable-line no-redeclare
          this.finishedStr += this.rawStrArr[i];
        }
        this.onFinish();
      }
      this.setState({totalScanned: totalScanned});
    }
  }
  startScanning() {
    this.init();
    this.setState({scanning: true, totalScanned: 0, rate: 0});
  }
  stopScanning() {
    this.setState({scanning: false});
  }
  render() {
    return (
      <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid item xs={Layout.isLarge() || Layout.isLandscape() ? 6 : 12}>
            {this.state.scanning ?
              <QrReader
               onScan={this.onScan.bind(this)}
               onError={()=>{this.setState({scanning: false})}}
               delay={this.state.delay === (1000/31) ? false : this.state.delay}
               resolution={this.state.resolution}
               facingMode={this.state.facingMode}
              />
            :
              ''
            }
          </Grid>
          <Grid item xs={Layout.isLarge() || Layout.isLandscape() ? 6 : 12}>
            <Grid container spacing={4}>
              <Grid item xs={12} style={{marginTop: '4vh'}}>
                <Typography gutterBottom>
                  Total QR Codes scanned: {this.state.totalScanned}
                </Typography>
                <Typography gutterBottom>
                   Total Data (B): {(this.state.size/8).toFixed(2)}
                </Typography>
                <Typography gutterBottom>
                   Data Rate (B/s): {(this.state.rate/8).toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={12} style={{minWidth: '200px'}}>
                <FormControl variant='outlined' fullWidth>
                  <InputLabel>Camera</InputLabel>
                  <Select
                    ref='rearCamera'
                    onChange={this.facingModeHandler.bind(this)}
                    value={this.state.facingMode}
                    fullWidth
                  >
                    <MenuItem value='environment'>Rear Camera</MenuItem>
                    <MenuItem value='user'>Front Camera</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={Layout.getDefaultGrid()} style={{minWidth: '150px'}}>
                <Typography gutterBottom>
                  Resolution
                </Typography>
                <Slider
                  value={this.state.resolution}
                  onChange={this.resolutionHandler.bind(this)}
                  valueLabelDisplay='auto'
                  step={10}
                  min={160}
                  max={1080}
                />
              </Grid>
              <Grid item xs={Layout.getDefaultGrid()} style={{minWidth: '150px'}}>
                <Typography gutterBottom>
                  Scans Per Second
                </Typography>
                <Slider
                  value={(1000/this.state.delay)}
                  onChange={this.delayHandler.bind(this)}
                  valueLabelDisplay='auto'
                  step={1}
                  min={1}
                  max={30}
                />
              </Grid>
              <Grid item xs={12}>
                {!this.state.scanning ?
                  <Button fullWidth onClick={this.startScanning.bind(this)}>Start</Button>
                :
                  <Button fullWidth onClick={this.stopScanning.bind(this)}>Stop</Button>
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
