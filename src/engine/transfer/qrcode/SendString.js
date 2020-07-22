import React from 'react';

import * as Layout from 'config/Layout';
import * as StringConversion from 'engine/transfer/StringConversion';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

var qrcode = require('qrcode-generator');
var raf = require('raf');

export default class SendString extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      canvasSize: 0,
      qrCodeType: 10,
      drawInterval: 2000,
      qrCodeArrIndex: 0,
      qrCodeArrLength: 0,
      drawing: false
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
      16: [1408, 81], 17: [1548, 85], 18: [1725, 89], 19: [1903, 93], 20: [2061, 97],
      21: [2232, 101], 22: [2409, 105], 23: [2620, 109], 24: [2812, 113], 25: [3057, 25],
      26: [3283, 121], 27: [3517, 125], 28: [3669, 129], 29: [3909, 133], 30: [4158, 137]
    };
  }
  update() {
    this.setState({loading: true, qrCodeArrIndex: 0, qrCodeArrLength: 0});
    this.drawing = false;
    this.drawIndex = 0;
    this.qrObjs = [];
    var qrcodeProperties = this.qrCodeTypeDict[this.state.qrCodeType];
    var qrcodeStringLength = qrcodeProperties[0] - 13;
    this.qrcodeDimensions = qrcodeProperties[1];

    var targetString = StringConversion.strToNumStr(this.props.targetString);
    var targetStringArr = [];
    while(targetString.length > qrcodeStringLength) {
      targetStringArr.push(targetString.substring(0, qrcodeStringLength));
      targetString = targetString.substring(qrcodeStringLength);
    }
    if(targetString.length > 0) {
      var lastString = targetString.substring(0);
      /*
      while(lastString.length < qrcodeStringLength) {
        lastString += '0';
      }
      */
      targetStringArr.push(lastString);
    }
    //Unknown why, but last two digits break the scanner
    for(var i = 0;i < targetStringArr.length;i++) {
      var indexStr = (i % 1000).toString();
      while(indexStr.length < 3) {indexStr = '0' + indexStr;}
      var lengthStr = (targetStringArr.length % 1000).toString();
      while(lengthStr.length < 3) {lengthStr = '0' + lengthStr;}
      var dataLengthStr = (targetStringArr[i].length % 10000).toString();
      while(dataLengthStr.length < 4) {dataLengthStr = '0' + dataLengthStr;}
      while(targetStringArr[i].length < qrcodeStringLength) {targetStringArr[i] += '0';}
      targetStringArr[i] = '0' + indexStr + lengthStr + dataLengthStr + targetStringArr[i];

      this.qrObjs.push(qrcode(this.state.qrCodeType, 'L'));
      //this.qrObjs[i].stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
      this.qrObjs[i].addData(targetStringArr[i], 'Numeric');
      this.qrObjs[i].make();
    }
    this.setState({loading: false, qrCodeArrLength: this.qrObjs.length, qrCodeArrIndex: this.drawIndex, drawing: false});
    raf(this.draw.bind(this));
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
    this.setState({qrCodeArrIndex: this.drawIndex});
  }
  drawPrev() {
    this.drawIndex -= 2;
    if(this.drawIndex < 0) {
      this.drawIndex = this.qrObjs.length + this.drawIndex;
    }
    this.draw();
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
    this.setState({drawInterval: 1000/((value)/60)});
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
    this.qrcodeCanvasCtx = (typeof this.qrcodeCanvasElement !== 'undefined' ? this.qrcodeCanvasElement.getContext('2d') : {});
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
    this.qrcodeCanvasCtx = (typeof this.qrcodeCanvasElement !== 'undefined' ? this.qrcodeCanvasElement.getContext('2d') : {});
    if(this.props.targetString !== prevProps.targetString || this.state.qrCodeType !== prevState.qrCodeType) {
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
      <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid item xs={Layout.isLarge() || Layout.isLandscape() ? 6 : 12} style={{marginBottom: '2vh'}}>
            <div ref='qrcodeCanvasWrapper' style={{width: '100%', marginBottom: '2vh'}}>
              {this.state.loading ?
                <CircularProgress/>
              :
                <canvas ref='qrcodeCanvas' width={this.state.canvasSize} height={this.state.canvasSize}></canvas>
              }
            </div>
            <Typography gutterBottom>
              Current QR Code Number: #{this.state.qrCodeArrIndex === 0 ? this.state.qrCodeArrLength : this.state.qrCodeArrIndex}
            </Typography>
            <Typography gutterBottom>
              Total QR Codes to scan: {this.state.qrCodeArrLength}
            </Typography>
          </Grid>
          <Grid item xs={Layout.isLarge() || Layout.isLandscape() ? 6 : 12} style={{marginBottom: '2vh'}}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <ButtonGroup fullWidth>
                  <Button disabled={this.state.drawing} onClick={this.drawPrev.bind(this)}>
                    Prev
                  </Button>
                  <Button color='primary'
                    onClick={() => {
                      this.drawing = !this.drawing;
                      this.setState({drawing: this.drawing});
                      if(this.drawing) {
                        this.drawLoop();
                      }
                    }}
                  >
                    {this.state.drawing ?
                      'Pause'
                    :
                      'Resume'
                    }
                  </Button>
                  <Button disabled={this.state.drawing} onClick={this.draw.bind(this)}>
                    Next
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <Typography gutterBottom>
                  QR Codes Per Minute
                </Typography>
                <Slider
                  value={(60/(this.state.drawInterval/1000))}
                  onChange={this.drawIntervalHandler.bind(this)}
                  valueLabelDisplay='auto'
                  valueLabelFormat={(val) => {return val.toFixed(0)}}
                  step={10}
                  min={10}
                  max={1800}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
