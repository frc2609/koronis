import React from 'react';

import * as Interface from 'db/Interface';
import { request as workerRequest } from 'engine/worker/EngineDriver';
import * as Layout from 'config/Layout';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

var qrcode = require('qrcode-generator');
var deepcopy = require('deep-copy');
var raf = require('raf');

export default class SendRecords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      canvasSize: 0,
      qrCodeType: 5,
      drawInterval: 1000/3,
      qrCodeArrLength: 0
    };
    this.resizeListener = () => {};

    this.drawing = false;
    this.drawn = false;
    this.drawIndex = 0;
    this.qrcodeDimensions = 0;
    this.qrObjs = [];
    this.qrCodeTypeDict = {
      1: [17, 21], 2: [32, 25], 3: [53, 29], 4: [78, 33], 5: [106, 37],
      6: [134, 41], 7: [154, 45], 8: [192, 49], 9: [230, 53], 10: [271, 57],
      11: [321, 61], 12: [367, 65], 13: [425, 69], 14: [458, 73], 15: [520, 77]
    };
  }
  update() {
    this.setState({loading: true, qrCodeArrLength: 0});
    this.drawing = false;
    this.qrObjs = [];
    var qrcodeProperties = this.qrCodeTypeDict[this.state.qrCodeType];
    var qrcodeStringLength = qrcodeProperties[0];
    this.qrcodeDimensions = qrcodeProperties[1];

    var targetString = deepcopy(this.props.targetString);
    var targetStringArr = [];
    while(targetString.length > qrcodeStringLength - 2) {
      targetStringArr.push(targetString.substring(0, qrcodeStringLength - 2));
      targetString = targetString.substring(qrcodeStringLength - 2);
    }
    if(targetString.length > 0) {
      var lastString = targetString.substring(0);
      while(lastString.length < qrcodeStringLength - 2) {
        lastString += String.fromCharCode(0);
      }
      targetStringArr.push(lastString);
    }
    for(var i = 0;i < targetStringArr.length;i++) {
      var twoChar = (((i & 16383) << 14) + (targetStringArr.length & 16383));
      var firstChar = String.fromCharCode((twoChar & 4294901760) >> 16);
      var secondChar = String.fromCharCode(twoChar & 65535);
      targetStringArr[i] = firstChar + secondChar + targetStringArr[i];
      
      this.qrObjs.push(qrcode(this.state.qrCodeType, 'L'));     
      this.qrObjs[i].addData(targetStringArr[i], 'Byte');
      this.qrObjs[i].make();
    }
    this.setState({loading: false, qrCodeArrLength: this.qrObjs.length});
    this.drawing = true;
    if(!this.drawn) {this.drawLoop();}
  }
  draw() {
    if(this.drawIndex < this.qrObjs.length) {
      if(this.props.targetString.length > 0) {
        this.qrObjs[this.drawIndex].renderTo2dContext(this.qrcodeCanvasCtx, this.state.canvasSize/this.qrcodeDimensions);
      }
      else {
        this.qrcodeCanvasCtx.clearRect(0, 0, this.state.canvasSize, this.state.canvasSize);
      }
    }
    this.drawIndex++;
    if(this.drawIndex >= this.qrObjs.length) {
      this.drawIndex = 0;
    }
  }
  drawLoop() {
    raf(this.draw.bind(this));
    if(this.drawing) {
      this.drawn = true;
      setTimeout(this.drawLoop.bind(this), this.state.drawInterval);
    }
    else {
      this.drawn = false;
    }
  }
  qrCodeTypeHandler(event, value) {
    this.setState({qrCodeType: value});
  }
  drawIntervalHandler(event, value) {
    this.setState({drawInterval: (1000/value)});
  }
  resize() {
    //Resize canvas if needed
    var containerRect = this.qrcodeCanvasWrapperElement.getBoundingClientRect();
    var height = (window.innerHeight - containerRect.top - 15);
    this.setState({canvasSize: Math.min(height, containerRect.width)});
  }
  componentDidMount() {
    this.qrcodeCanvasWrapperElement = this.refs.qrcodeCanvasWrapper;
    this.qrcodeCanvasElement = this.refs.qrcodeCanvas;
    this.qrcodeCanvasCtx = (typeof this.qrcodeCanvasElement != 'undefined' ? this.qrcodeCanvasElement.getContext('2d') : {});
    this.resize();
    this.resizeListener = () => {
      this.resize();
    };
    window.addEventListener('resize', this.resizeListener);
    this.update();
  }
  componentDidUpdate(prevProps, prevState) {
    this.qrcodeCanvasWrapperElement = this.refs.qrcodeCanvasWrapper;
    this.qrcodeCanvasElement = this.refs.qrcodeCanvas;
    this.qrcodeCanvasCtx = (typeof this.qrcodeCanvasElement != 'undefined' ? this.qrcodeCanvasElement.getContext('2d') : {});
    if(this.props.targetString != prevProps.targetString || this.state.qrCodeType != prevState.qrCodeType) {
      this.update();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
    this.drawing = false;
    this.qrObjs = [];
  }
  render() {
    return (
      <Container>
      <div ref='qrcodeCanvasWrapper' style={{width: '100%', marginBottom: '4vh'}}>
        {this.state.loading ? <CircularProgress/> :
          <canvas ref='qrcodeCanvas' width={this.state.canvasSize} height={this.state.canvasSize}></canvas>
        }
      </div>
      <Typography gutterBottom>
        Total QR Codes to scan: {this.state.qrCodeArrLength}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={Layout.isLandscape() ? 6 : 12} style={{minWidth: '150px'}}>
            <Typography gutterBottom>
              QR Code Type
            </Typography>
            <Slider
      value={this.state.qrCodeType}
      onChange={this.qrCodeTypeHandler.bind(this)}
      valueLabelDisplay='auto'
      step={1}
      min={1}
      max={15}
            />
          </Grid>
          <Grid item xs={Layout.isLandscape() ? 6 : 12} style={{minWidth: '150px'}}>
            <Typography gutterBottom>
              QR Codes Per Second
            </Typography>
            <Slider
      value={(1000/this.state.drawInterval)}
      onChange={this.drawIntervalHandler.bind(this)}
      valueLabelDisplay='auto'
      valueLabelFormat={(val) => {return val.toFixed(0)}}
      step={1}
      min={1}
      max={15}
            />
          </Grid>
        </Grid>
      </Container>
    )
  }
}
