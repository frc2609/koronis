import React from 'react';

var deepcopy = require('deep-copy');
var raf = require('raf');

export default class RenderCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasSize: {x:100,y:100}
    };
    this.wrapperOffset = 5;
    this.renderCanvasElement = {};
    this.renderCanvasWrapperElement = {};
    this.renderCanvasCtx = {};
  }
  touchStart() {}
  touchMove() {}
  touchEnd() {}
  draw() {
    var mag = 1;
    var xSize = this.state.canvasSize.y * (this.props.fieldStateDefinition.fieldState.dimensions.x/this.props.fieldStateDefinition.fieldState.dimensions.y);
    var ySize = this.state.canvasSize.y;
    var xMulti = (xSize/this.props.fieldStateDefinition.fieldState.dimensions.x) * mag;
    var yMulti = (ySize/this.props.fieldStateDefinition.fieldState.dimensions.y) * mag;
    var xOffset = 0;
    var yOffset = 0;

    this.renderCanvasCtx.lineWidth = Math.min(xMulti, yMulti) * 0.35;
    this.drawElements.bind(this)(this.props.gameStateDefinition.drawnElements, xMulti, yMulti, xOffset, yOffset);
    this.drawElements.bind(this)(this.props.fieldStateDefinition.drawnElements, xMulti, yMulti, xOffset, yOffset);
    this.drawElements.bind(this)(this.props.botStateDefinition.drawnElements, xMulti, yMulti, xOffset, yOffset);

    //draw the robot as a circle with crossing lines
    var botX = (this.props.botStateDefinition.botState.pos.x + xOffset) * xMulti;
    var botY = (this.props.botStateDefinition.botState.pos.y + yOffset) * yMulti;
    //crossing lines
    this.renderCanvasCtx.strokeStyle = 'rgb(0,0,0,0.5)'
    this.renderCanvasCtx.setLineDash([]);
    //circle
    this.renderCanvasCtx.fillStyle = (this.props.gameStateDefinition.gameState.isRed ? '#dc3545' : '#008ae6');
    this.renderCanvasCtx.strokeStyle = '#000000';
    this.renderCanvasCtx.setLineDash([]);
    this.renderCanvasCtx.beginPath();
    this.renderCanvasCtx.arc(botX, botY, Math.min(xMulti, yMulti), 0, Math.PI * 2, false);
    this.renderCanvasCtx.fill();
    this.renderCanvasCtx.stroke();
  }
  drawElements(arr, xMulti, yMulti, xOffset, yOffset) {
    for(var i = 0;i < arr.length;i++) {
      this.renderCanvasCtx.fillStyle = this.props.colorPalette[arr[i].style.palette].find((e) => {return e.name == arr[i].style.fill;}).hex;
      this.renderCanvasCtx.strokeStyle = this.props.colorPalette[arr[i].style.palette].find((e) => {return e.name == arr[i].style.outline;}).hex;
      var elemWidth = arr[i].size.x * xMulti;
      var elemHeight = arr[i].size.y * yMulti;
      var elemX = (arr[i].position.x + xOffset) * xMulti;
      var elemY = (arr[i].position.y + yOffset) * yMulti;
      this.renderCanvasCtx.fillRect(elemX, elemY, elemWidth, elemHeight);
      this.renderCanvasCtx.strokeRect(elemX, elemY, elemWidth, elemHeight);
    }
  }
  update() {
    if(this.renderCanvasWrapperElement.offsetWidth != this.state.canvasSize.x+this.wrapperOffset) {
      if(this.renderCanvasWrapperElement.offsetHeight != this.state.canvasSize.y+this.wrapperOffset) {
        this.setState({canvasSize: {x:this.renderCanvasWrapperElement.offsetWidth-this.wrapperOffset,y:this.renderCanvasWrapperElement.offsetHeight-this.wrapperOffset}});
      }
    }
    raf(this.draw.bind(this));
  }
  componentDidMount() {
    this.renderCanvasElement = this.refs.renderCanvas;
    this.renderCanvasWrapperElement = this.refs.renderCanvasWrapper;
    this.renderCanvasCtx = this.renderCanvasElement.getContext('2d');
    this.renderCanvasElement.ontouchstart = this.touchStart.bind(this);
    this.renderCanvasElement.ontouchmove = this.touchMove.bind(this);
    this.renderCanvasElement.ontouchend = this.touchEnd.bind(this);
  }
  render() {return (
    <div ref='renderCanvasWrapper' style={{width: '100%', height: '100%'}}>
      <canvas ref='renderCanvas' width={this.state.canvasSize.x} height={this.state.canvasSize.y}></canvas>
    </div>
  );}
}
