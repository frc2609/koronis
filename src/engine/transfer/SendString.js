import React from 'react';

import * as Interface from 'db/Interface';
import { request as workerRequest } from 'engine/worker/EngineDriver';
import * as Layout from 'config/Layout';
import * as StringConversion from 'engine/transfer/StringConversion';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

var qrcode = require('qrcode-generator');
var deepcopy = require('deep-copy');
var raf = require('raf');

export default class SendString extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      canvasSize: 0,
      qrCodeType: 10,
      drawInterval: 2000,
      qrCodeArrLength: 0
    };
    this.resizeListener = () => {};

    this.drawing = false;
    this.drawn = false;
    this.drawIndex = 0;
    this.qrcodeDimensions = 0;
    this.qrObjs = [];
    this.qrCodeTypeDict = {
      1: [41, 21], 2: [77, 25], 3: [127, 29], 4: [187, 33], 5: [255, 37],
      6: [322, 41], 7: [370, 45], 8: [461, 49], 9: [552, 53], 10: [652, 57],
      11: [772, 61], 12: [883, 65], 13: [1022, 69], 14: [1101, 73], 15: [1250, 77],
      16: [1408, 81], 17: [1548, 85], 18: [1725, 89], 19: [1903, 93], 20: [2061, 97]
    };
  }
  update() {
    this.setState({loading: true, qrCodeArrLength: 0});
    this.drawing = false;
    this.qrObjs = [];
    var qrcodeProperties = this.qrCodeTypeDict[this.state.qrCodeType];
    var qrcodeStringLength = qrcodeProperties[0];
    this.qrcodeDimensions = qrcodeProperties[1];

    var targetString = StringConversion.strToNumStr(this.props.targetString);
    var targetStringArr = [];
    while(targetString.length > qrcodeStringLength - 9) {
      targetStringArr.push(targetString.substring(0, qrcodeStringLength - 9));
      targetString = targetString.substring(qrcodeStringLength - 9);
    }
    if(targetString.length > 0) {
      var lastString = targetString.substring(0);
      while(lastString.length < qrcodeStringLength - 9) {
        lastString += '0';
      }
      targetStringArr.push(lastString);
    }
    //Unknown why, but last two digits break the scanner
    console.log(targetStringArr);
    for(var i = 0;i < targetStringArr.length;i++) {
      var indexStr = (i % 1000).toString();
      while(indexStr.length < 3) {indexStr = '0' + indexStr;}
      var lengthStr = (targetStringArr.length % 1000).toString();
      while(lengthStr.length < 3) {lengthStr = '0' + lengthStr;}
      targetStringArr[i] = '0' + indexStr + lengthStr + targetStringArr[i];
      
      this.qrObjs.push(qrcode(this.state.qrCodeType, 'L'));
      //this.qrObjs[i].stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
      this.qrObjs[i].addData(targetStringArr[i], 'Numeric');
      console.log(targetStringArr);
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
    this.setState({drawInterval: (1000*value)});
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
      max={20}
            />
          </Grid>
          <Grid item xs={Layout.isLandscape() ? 6 : 12} style={{minWidth: '150px'}}>
            <Typography gutterBottom>
              QR Codes Frequency
            </Typography>
            <Slider
      value={(this.state.drawInterval/1000)}
      onChange={this.drawIntervalHandler.bind(this)}
      valueLabelDisplay='auto'
      valueLabelFormat={(val) => {return val.toFixed(0)}}
      step={0.5}
      min={1}
      max={15}
            />
          </Grid>
        </Grid>
      </Container>
    )
  }
}
