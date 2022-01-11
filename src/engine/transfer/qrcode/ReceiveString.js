import React from 'react';

import * as Layout from 'config/Layout';
import * as StringConversion from 'engine/transfer/StringConversion';

import Box from '@material-ui/core/Box';
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

export default class ReceiveString extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scanning: false,
      delay: 1000/3,
      facingMode: 'environment',
      resolution: 300,
      totalScanned: 0,
      rate: 0,
      size: 0,
      missingIndex: -1
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
    let data = StringConversion.numStrToStr(this.finishedStr);
    this.setState({scanning: false});
    if(typeof this.props.onFinish === 'function') {this.props.onFinish(data);}
  }
  onScan(inStr) {
    if(inStr !== null && inStr.length >= 11) {
      let index = Number.parseInt(inStr.substring(1,4));
      let length = Number.parseInt(inStr.substring(4,7));
      let dataLength = Number.parseInt(inStr.substring(7,11));
      let rawStr = inStr.substring(11, 11 + dataLength);
      this.rawStrArr[index] = rawStr;
      let hasUndef = false;
      let totalScanned = 0;
      for(let i = 0;i < length;i++) {
        let currUndef = (typeof this.rawStrArr[i] === 'undefined');
        if(!hasUndef) {
          hasUndef = currUndef;
          if(hasUndef) {
            this.setState({missingIndex: i});
          }
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
        for(let i = 0;i < length;i++) { // eslint-disable-line no-redeclare
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
          <Grid item xs={Layout.isLarge() || Layout.isLandscape() ? 6 : 12} style={{marginBottom: '2vh'}}>
            {this.state.scanning ?
              <QrReader
               onScan={this.onScan.bind(this)}
               onError={()=>{this.setState({scanning: false})}}
               delay={this.state.delay === (1000/31) ? false : this.state.delay}
               resolution={this.state.resolution}
               facingMode={this.state.facingMode}
              />
            :
              <></>
            }
          </Grid>
          <Grid item xs={Layout.isLarge() || Layout.isLandscape() ? 6 : 12} style={{marginBottom: '2vh'}}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Box mb={3}>
                  <Typography align='center' gutterBottom>
                    Missing QR Code Number: #{this.state.missingIndex < 0 ? 1 : this.state.missingIndex + 1}
                  </Typography>
                  <Typography align='center' gutterBottom>
                    Total QR Codes scanned: {this.state.totalScanned}
                  </Typography>
                  <Typography align='center' gutterBottom>
                     Total Data (B): {(this.state.size/8).toFixed(2)}
                  </Typography>
                  <Typography align='center' gutterBottom>
                     Data Rate (B/s): {(this.state.rate/8).toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} style={{minWidth: '200px'}}>
                <FormControl variant='outlined' fullWidth>
                  <InputLabel>Camera</InputLabel>
                  <Select
                    ref='rearCamera'
                    onChange={this.facingModeHandler.bind(this)}
                    value={this.state.facingMode}
                    label='Camera'
                  >
                    <MenuItem value='environment'>Rear Camera</MenuItem>
                    <MenuItem value='user'>Front Camera</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} style={{minWidth: '150px'}}>
                <Typography align='center' gutterBottom>
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
              <Grid item xs={12} style={{minWidth: '150px'}}>
                <Typography align='center' gutterBottom>
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
