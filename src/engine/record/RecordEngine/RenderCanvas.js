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

    this.canvasState = {
      mag: 1,
      xSize: 0,
      ySize: 0,
      xMulti: 0,
      yMulti: 0,
      xOffset: 0,
      yOffset: 0
    };
  }
  touchStart(event) {
    var rect = this.renderCanvasElement.getBoundingClientRect();
    var index = 0;
    var x = event.touches[index].clientX - rect.left;
    var y = event.touches[index].clientY - rect.top;
    while((x < 0 || y < 0 || x > rect.right || y > rect.bottom) && index < event.touches.length - 1) {
      index++;
      x = event.touches[index].clientX - rect.left;
      y = event.touches[index].clientY - rect.top;
    }
    var botX = (x/this.canvasState.xMulti) - this.canvasState.xOffset;
    var botY = (y/this.canvasState.yMulti) - this.canvasState.yOffset;
    this.props.renderCanvasUpdate({x: botX, y: botY});
    this.update.bind(this)();
  }
  touchEnd(event) {}
  draw() {
    //Clear the canvas
    this.renderCanvasCtx.clearRect(0, 0, this.state.canvasSize.x, this.state.canvasSize.y);
    //Set size and multipliers
    this.canvasState.xSize = this.state.canvasSize.y * (this.props.fieldStateDefinition.fieldState.dimensions.x/this.props.fieldStateDefinition.fieldState.dimensions.y);
    this.canvasState.ySize = this.state.canvasSize.y;
    this.canvasState.xMulti = (this.canvasState.xSize/this.props.fieldStateDefinition.fieldState.dimensions.x) * this.canvasState.mag;
    this.canvasState.yMulti = (this.canvasState.ySize/this.props.fieldStateDefinition.fieldState.dimensions.y) * this.canvasState.mag;
    this.canvasState.xOffset = -(this.props.botStateDefinition.botState.position.x*0.2-this.canvasState.xMulti*0.2);
    //Draw field elements
    this.renderCanvasCtx.lineWidth = Math.min(this.canvasState.xMulti, this.canvasState.yMulti) * 0.35;
    this.renderCanvasCtx.setLineDash([]);
    this.drawElements.bind(this)(this.props.gameStateDefinition.drawnElements, this.canvasState.xMulti, this.canvasState.yMulti, this.canvasState.xOffset, this.canvasState.yOffset);
    this.drawElements.bind(this)(this.props.fieldStateDefinition.drawnElements, this.canvasState.xMulti, this.canvasState.yMulti, this.canvasState.xOffset, this.canvasState.yOffset);
    this.drawElements.bind(this)(this.props.botStateDefinition.drawnElements, this.canvasState.xMulti, this.canvasState.yMulti, this.canvasState.xOffset, this.canvasState.yOffset);

    //Draw the robot as a circle with crossing lines
    var botX = (this.props.botStateDefinition.botState.position.x + this.canvasState.xOffset) * this.canvasState.xMulti;
    var botY = (this.props.botStateDefinition.botState.position.y + this.canvasState.yOffset) * this.canvasState.yMulti;
    
    //Draw crossing lines
    this.renderCanvasCtx.strokeStyle = 'rgb(0,0,0,0.5)'
    this.renderCanvasCtx.lineWidth = Math.min(this.canvasState.xMulti, this.canvasState.yMulti) * 0.6;
    this.renderCanvasCtx.setLineDash([Math.min(this.canvasState.xMulti, this.canvasState.yMulti)*0.75, Math.min(this.canvasState.xMulti, this.canvasState.yMulti)*0.75]);
    this.renderCanvasCtx.beginPath();
    this.renderCanvasCtx.moveTo(0, botY);
    this.renderCanvasCtx.lineTo(this.state.canvasSize.x, botY);
    this.renderCanvasCtx.moveTo(botX, 0);
    this.renderCanvasCtx.lineTo(botX, this.state.canvasSize.y);
    this.renderCanvasCtx.stroke();
    
    //Draw circle
    this.renderCanvasCtx.fillStyle = (this.props.matchState.isRed ? '#dc3545' : '#008ae6');
    this.renderCanvasCtx.strokeStyle = '#000000';
    this.renderCanvasCtx.lineWidth = Math.min(this.canvasState.xMulti, this.canvasState.yMulti) * 0.35;
    this.renderCanvasCtx.setLineDash([]);
    this.renderCanvasCtx.beginPath();
    this.renderCanvasCtx.arc(botX, botY, Math.min(this.canvasState.xMulti, this.canvasState.yMulti)*1.25, 0, Math.PI * 2, false);
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
    this.resize();
    raf(this.draw.bind(this));
  }
  resize() {
    //Resize canvas if needed
    if(this.renderCanvasWrapperElement.offsetWidth != this.state.canvasSize.x + this.wrapperOffset || this.renderCanvasWrapperElement.offsetHeight != this.state.canvasSize.y + this.wrapperOffset) {
      this.setState({canvasSize: {x: this.renderCanvasWrapperElement.offsetWidth - this.wrapperOffset, y: this.renderCanvasWrapperElement.offsetHeight - this.wrapperOffset}});
    }    
  }
  throttle(fn) {
    let lastCall = 0;
    return function(...args) {
      const now = (new Date).getTime();
      if(now - lastCall < this.props.settings.updateInterval) {
        return;
      }
      lastCall = now;
      return fn(...args);
    };
  }
  componentDidMount() {
    this.renderCanvasElement = this.refs.renderCanvas;
    this.renderCanvasWrapperElement = this.refs.renderCanvasWrapper;
    this.renderCanvasCtx = this.renderCanvasElement.getContext('2d');
    //Bind touch events
    this.renderCanvasElement.ontouchstart = this.touchStart.bind(this);
    this.renderCanvasElement.ontouchmove = this.throttle(this.touchStart.bind(this)).bind(this);
    this.renderCanvasElement.ontouchend = this.touchEnd.bind(this);
    
    this.resize();
  }
  render() {return (
    <div ref='renderCanvasWrapper' style={{width: '100%', height: '100%'}}>
      <canvas ref='renderCanvas' width={this.state.canvasSize.x} height={this.state.canvasSize.y}></canvas>
    </div>
  );}
}

