import React from 'react';

import * as Layout from 'config/Layout';

const raf = require('raf');

export default class RenderCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasSize: {x: 100,y: 100}
    };
    this.wrapperOffset = 5;
    this.renderCanvasElement = {};
    this.renderCanvasWrapperElement = {};
    this.renderCanvasCtx = {};
    this.mouseIsDown = false;

    this.arrowState = {
      up: false,
      down: false,
      left: false,
      right: false
    };
    this.keyUpListener = null;
    this.keyDownListener = null;

    this.canvasState = {
      mag: 0.975,
      xSize: 0,
      ySize: 0,
      xMulti: 0,
      yMulti: 0,
      xOffset: 0,
      yOffset: 0
    };
  }
  updatePosFromKey() {
    let botX = this.props.botStateDefinition.botState.position.x;
    let botY = this.props.botStateDefinition.botState.position.y;
    let flip = this.props.engineState.flip ? -1 : 1;
    if(this.arrowState.up) {
      botY -= flip;
    }
    if(this.arrowState.down) {
      botY += flip;
    }
    if(this.arrowState.left) {
      botX -= flip;
    }
    if(this.arrowState.right) {
      botX += flip;
    }
    if(this.arrowState.up || this.arrowState.down || this.arrowState.left || this.arrowState.right) {
      this.props.renderCanvasUpdate({x: botX, y: botY});
    }
  }
  keyDown(event) {
    if(event.keyCode === 38) {
      this.arrowState.up = true;
    }
    if(event.keyCode === 40) {
      this.arrowState.down = true;
    }
    if(event.keyCode === 37) {
      this.arrowState.left = true;
    }
    if(event.keyCode === 39) {
      this.arrowState.right = true;
    }
    this.updatePosFromKey();
  }
  keyUp(event) {
    if(event.keyCode === 38) {
      this.arrowState.up = false;
    }
    if(event.keyCode === 40) {
      this.arrowState.down = false;
    }
    if(event.keyCode === 37) {
      this.arrowState.left = false;
    }
    if(event.keyCode === 39) {
      this.arrowState.right = false;
    }
    this.updatePosFromKey();
  }
  mouseStart(event) {
    this.mouseIsDown = true;
    this.mouseMove(event);
  }
  mouseMove(event) {
    if(this.mouseIsDown && !Layout.isTouchScreen()) {
      let rect = this.renderCanvasElement.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      this.coordInput(x, y);
    }
  }
  mouseEnd() {
    this.mouseIsDown = false;
  }
  touchStart(event) {
    let rect = this.renderCanvasElement.getBoundingClientRect();
    let index = 0;
    let x = event.touches[index].clientX - rect.left;
    let y = event.touches[index].clientY - rect.top;
    while((x < 0 || y < 0 || x > rect.right || y > rect.bottom) && index < event.touches.length - 1) {
      index++;
      x = event.touches[index].clientX - rect.left;
      y = event.touches[index].clientY - rect.top;
    }
    this.coordInput(x, y);
    event.preventDefault();
  }
  touchEnd(event) {
    event.preventDefault();
  }
  coordInput(x, y) {
    let botX = (x/this.canvasState.xMulti) - this.canvasState.xOffset;
    let botY = (y/this.canvasState.yMulti) - this.canvasState.yOffset;
    if(this.props.engineState.flip) {
      botX = this.props.fieldStateDefinition.fieldState.dimensions.x - botX;
      botY = this.props.fieldStateDefinition.fieldState.dimensions.y - botY;
    }
    this.props.renderCanvasUpdate({x: botX, y: botY});
    this.update.bind(this)();
  }
  draw() {
    //Clear the canvas
    this.renderCanvasCtx.clearRect(0, 0, this.state.canvasSize.x, this.state.canvasSize.y);
    //Set size and multipliers
    this.canvasState.xSize = this.state.canvasSize.y * (this.props.fieldStateDefinition.fieldState.dimensions.x/this.props.fieldStateDefinition.fieldState.dimensions.y);
    this.canvasState.ySize = this.state.canvasSize.y;
    this.canvasState.xMulti = (this.canvasState.xSize/this.props.fieldStateDefinition.fieldState.dimensions.x) * this.canvasState.mag;
    this.canvasState.yMulti = (this.canvasState.ySize/this.props.fieldStateDefinition.fieldState.dimensions.y) * this.canvasState.mag;
    //Offset to show field
    let mockFieldWidth = this.props.fieldStateDefinition.fieldState.dimensions.x * (1 + (2 * 0.03125));
    let canvasFieldDifference = (mockFieldWidth * this.canvasState.xMulti) - this.state.canvasSize.x;
    let botXPercentage = this.props.botStateDefinition.botState.position.x / this.props.fieldStateDefinition.fieldState.dimensions.x;
    if(this.props.engineState.flip) {
      botXPercentage = 1 - botXPercentage;
    }
    this.canvasState.xOffset = -((canvasFieldDifference / this.canvasState.xMulti) * botXPercentage) + this.props.fieldStateDefinition.fieldState.dimensions.x*0.03125;
    this.canvasState.yOffset = this.canvasState.yMulti*0.0125;
    //Draw field elements
    this.renderCanvasCtx.lineWidth = Math.min(this.canvasState.xMulti, this.canvasState.yMulti) * 0.35;
    this.renderCanvasCtx.setLineDash([]);
    this.drawElements(this.props.gameStateDefinition.drawnElements, this.canvasState.xMulti, this.canvasState.yMulti, this.canvasState.xOffset, this.canvasState.yOffset);
    this.drawElements(this.props.fieldStateDefinition.drawnElements, this.canvasState.xMulti, this.canvasState.yMulti, this.canvasState.xOffset, this.canvasState.yOffset);
    this.drawElements(this.props.botStateDefinition.drawnElements, this.canvasState.xMulti, this.canvasState.yMulti, this.canvasState.xOffset, this.canvasState.yOffset);

    //Draw the robot as a circle with crossing lines
    let botX = this.props.botStateDefinition.botState.position.x;
    let botY = this.props.botStateDefinition.botState.position.y;
    if(this.props.engineState.flip) {
      botX = this.props.fieldStateDefinition.fieldState.dimensions.x - this.props.botStateDefinition.botState.position.x;
      botY = this.props.fieldStateDefinition.fieldState.dimensions.y - this.props.botStateDefinition.botState.position.y;
    }
    botX = (botX + this.canvasState.xOffset) * this.canvasState.xMulti;
    botY = (botY + this.canvasState.yOffset) * this.canvasState.yMulti;

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
    for(let i = 0;i < arr.length;i++) {
      this.renderCanvasCtx.fillStyle = this.props.colorPalette[arr[i].style.palette].find((e) => {return e.name === arr[i].style.fill;}).hex; // eslint-disable-line no-loop-func
      this.renderCanvasCtx.strokeStyle = this.props.colorPalette[arr[i].style.palette].find((e) => {return e.name === arr[i].style.outline;}).hex; // eslint-disable-line no-loop-func
      if(typeof arr[i].points === 'undefined') {
        let elemWidth = arr[i].size.x * xMulti;
        let elemHeight = arr[i].size.y * yMulti;
        let elemX = arr[i].position.x;
        let elemY = arr[i].position.y;
        if(this.props.engineState.flip) {
          elemX = this.props.fieldStateDefinition.fieldState.dimensions.x - (arr[i].position.x + arr[i].size.x);
          elemY = this.props.fieldStateDefinition.fieldState.dimensions.y - (arr[i].position.y + arr[i].size.y);
        }
        elemX = (elemX + xOffset) * xMulti;
        elemY = (elemY + yOffset) * yMulti;
        this.renderCanvasCtx.fillRect(elemX, elemY, elemWidth, elemHeight);
        this.renderCanvasCtx.strokeRect(elemX, elemY, elemWidth, elemHeight);
      }
      else {
        this.renderCanvasCtx.beginPath();
        for(let j = 0;j < arr[i].points.length;j++) {
          let elemX = arr[i].points[j].x; // eslint-disable-line no-redeclare
          let elemY = arr[i].points[j].y; // eslint-disable-line no-redeclare
          if(this.props.engineState.flip) {
            elemX = this.props.fieldStateDefinition.fieldState.dimensions.x - arr[i].points[j].x;
            elemY = this.props.fieldStateDefinition.fieldState.dimensions.y - arr[i].points[j].y;
          }
          elemX = (elemX + xOffset) * xMulti;
          elemY = (elemY + yOffset) * yMulti;
          if(j === 0) { this.renderCanvasCtx.moveTo(elemX, elemY); }
          else { this.renderCanvasCtx.lineTo(elemX, elemY); }
        }
        let elemX = arr[i].points[0].x; // eslint-disable-line no-redeclare
        let elemY = arr[i].points[0].y; // eslint-disable-line no-redeclare
        if(this.props.engineState.flip) {
          elemX = this.props.fieldStateDefinition.fieldState.dimensions.x - arr[i].points[0].x;
          elemY = this.props.fieldStateDefinition.fieldState.dimensions.y - arr[i].points[0].y;
        }
        elemX = (elemX + xOffset) * xMulti;
        elemY = (elemY + yOffset) * yMulti;
        if(arr[i].points.length > 0) { this.renderCanvasCtx.lineTo(elemX, elemY); }
        this.renderCanvasCtx.fill();
        this.renderCanvasCtx.stroke();
      }
    }
  }
  update() {
    this.resize();
    raf(this.draw.bind(this));
  }
  resize() {
    //Resize canvas if needed
    if(this.renderCanvasWrapperElement.offsetWidth !== this.state.canvasSize.x + this.wrapperOffset || this.renderCanvasWrapperElement.offsetHeight !== this.state.canvasSize.y + this.wrapperOffset) {
      this.setState({canvasSize: {x: this.renderCanvasWrapperElement.offsetWidth - this.wrapperOffset, y: this.renderCanvasWrapperElement.offsetHeight - this.wrapperOffset}});
    }
  }
  throttle(fn) {
    let lastCall = 0;
    return function(...args) {
      const now = (new Date()).getTime();
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
    //Bind mouse events
    this.renderCanvasElement.onmousedown = this.mouseStart.bind(this);
    this.renderCanvasElement.onmousemove = this.throttle(this.mouseMove.bind(this)).bind(this);
    this.renderCanvasElement.onmouseup = this.mouseEnd.bind(this);
    //Bind keyboard events
    this.keyUpListener = this.keyUp.bind(this);
    this.keyDownListener = this.keyDown.bind(this);
    window.addEventListener('keydown', this.keyDownListener);
    window.addEventListener('keyup', this.keyUpListener);

    this.resize();
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDownListener);
    window.removeEventListener('keyup', this.keyUpListener);
  }
  render() {
    return (
      <div ref='renderCanvasWrapper' style={{width: '100%', height: '100%'}}>
        <canvas ref='renderCanvas' width={this.state.canvasSize.x} height={this.state.canvasSize.y}></canvas>
      </div>
    );
  }
}
