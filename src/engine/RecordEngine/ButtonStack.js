import React from 'react';

var deepcopy = require('deep-copy');
var raf = require('raf');

export default class ButtonStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasSize: {x:100,y:100}
    };
    this.wrapperOffset = 5;
    this.buttonStackElement = {};
    this.buttonStackWrapperElement = {};
    this.buttonStackCtx = {};

    this.buttonIndex = null;
    this.buttonState = {
      watcherIds: [],
      visibleIds: [],
      selectedIds: [],
      selectedHeights: [],
      selectedTree: [],
      currentHeightMultiplier: 0,
      finalIds: [],
      finalHeights: []
    };
  }
  touchStart(event) {
    var rect = this.buttonStackElement.getBoundingClientRect();
    var x = event.touches[0].clientX - rect.left;
    var y = event.touches[0].clientY - rect.top;
    this.buttonState.selectedIds = [];
    this.buttonState.selectedHeights = [];
    this.buttonState.selectedTree = [];
    for(var i = 0;i < this.buttonState.finalHeights.length-1;i++) {
      if(this.buttonState.finalHeights[i] <= y && this.buttonState.finalHeights[i+1] >= y) {
        this.buttonState.selectedIds.push(this.buttonState.finalIds[i]);
        this.buttonState.selectedTree.push(this.buttonState.finalIds[i]);
        this.buttonState.selectedHeights.push(this.buttonState.finalHeights[i]);
        this.buttonState.selectedHeights.push(this.buttonState.finalHeights[i+1] < y + 10 ? this.buttonState.finalHeights[i+1] : y + 10);
      }
    }
    this.buttonState.selectedHeights.sort((e1, e2) => {return e1 > e2});
    var tmp = [];
    for(var i = 0;i < this.buttonState.selectedHeights.length;i++) {
      if(!tmp.includes(this.buttonState.selectedHeights[i])) {
        tmp.push(this.buttonState.selectedHeights[i]);
      }
    }
    this.buttonState.selectedHeights = tmp.slice();
    this.update.bind(this)();
  }
  touchMove(event) {
    var rect = this.buttonStackElement.getBoundingClientRect();
    var x = event.touches[0].clientX - rect.left;
    var y = event.touches[0].clientY - rect.top;
    var currId = -1;
    this.buttonState.selectedTree = [];
    for(var i = 0;i < this.buttonState.finalHeights.length-1;i++) {
      if(this.buttonState.finalHeights[i] <= y && this.buttonState.finalHeights[i+1] >= y) {
        currId = this.buttonState.finalIds[i];
        this.buttonState.selectedTree.push(this.buttonState.finalIds[i]);
        if(!this.buttonState.selectedIds.includes(this.buttonState.finalIds[i])) {
          this.buttonState.selectedIds.push(this.buttonState.finalIds[i]);
          this.buttonState.selectedHeights.push(this.buttonState.finalHeights[i]);
          this.buttonState.selectedHeights.push(this.buttonState.finalHeights[i+1]);
        }
      }
    }
    this.buttonState.selectedHeights.sort((e1, e2) => {return e1 > e2});
    var tmp = [];
    for(var i = 0;i < this.buttonState.selectedHeights.length;i++) {
      if(!tmp.includes(this.buttonState.selectedHeights[i])) {
        tmp.push(this.buttonState.selectedHeights[i]);
      }
    }
    this.buttonState.selectedHeights = tmp.slice();
    //update button selected tree
    var recurseFunct = (currId) => {
      var currButton = this.props.buttonDefinitions[this.buttonIndex[currId]];
      if(typeof currButton != 'undefined') {
        var arr = currButton.parentIds;
        if(arr.length > 0) {
          this.buttonState.selectedTree.push(arr);
          for(var i = 0;i < arr.length;i++) {
            recurseFunct(arr[i]);
          }
        }
      }
    }
    recurseFunct(currId);
    this.buttonState.selectedTree = this.buttonState.selectedTree.flat(64);
    this.update.bind(this)();
  }
  touchEnd(event) {
    this.buttonState.selectedIds = [];
    this.buttonState.selectedHeights = [];
    this.buttonState.selectedTree = [];
    console.log(event);
    this.update.bind(this)();
  }
  draw() {
    this.buttonStackCtx.clearRect(0, 0, this.state.canvasSize.x, this.state.canvasSize.y);
    for(var i = 0;i < this.buttonState.finalIds.length;i++) {
      var currButton = this.props.buttonDefinitions[this.buttonIndex[this.buttonState.finalIds[i]]];
      var top = this.buttonState.finalHeights[i];
      var bottom = this.buttonState.finalHeights[i+1];
      var colorPaletteArr = [];
      this.buttonStackCtx.font = (Math.round(this.state.canvasSize.y/15) + 'px Arial');
      this.buttonStackCtx.textAlign = 'center';
      this.buttonStackCtx.textBaseline = 'middle';
      this.buttonStackCtx.lineWidth = this.state.canvasSize.y/40;
      var buttonStyleObj = {};
      if(!this.buttonState.selectedTree.includes(this.buttonState.finalIds[i])) {
        buttonStyleObj = currButton.style.released;
      }
      else {
        buttonStyleObj = currButton.style.depressed;
      }
      colorPaletteArr = this.props.colorPalette[buttonStyleObj.palette];
      for(var j = 0;j < colorPaletteArr.length;j++) {
        if(colorPaletteArr[j].name == buttonStyleObj.fill) {
          this.buttonStackCtx.fillStyle = colorPaletteArr[j].hex;
        }
        if(colorPaletteArr[j].name == buttonStyleObj.outline) {
          this.buttonStackCtx.strokeStyle = colorPaletteArr[j].hex;
        }
      }
      this.buttonStackCtx.fillRect(0, top+this.wrapperOffset/2, this.state.canvasSize.x, bottom-top);
      this.buttonStackCtx.strokeRect(0, top+this.wrapperOffset/2, this.state.canvasSize.x, bottom-top);
      for(var j = 0;j < colorPaletteArr.length;j++) {
        if(colorPaletteArr[j].name == buttonStyleObj.text) {
          this.buttonStackCtx.fillStyle = colorPaletteArr[j].hex;
        }
      }
      this.buttonStackCtx.fillText(currButton.title, this.state.canvasSize.x/2, (bottom+top)/2);
    }
  }
  update() {
    this.buttonState.watcherIds = [];

    this.buttonState.visibleIds = [];
    this.buttonState.finalIds = [];
    this.buttonState.finalHeights = [];
    this.buttonState.currentHeightMultiplier = 0;

    var bD = this.props.buttonDefinitions;
    //buttonIndex generation
    if(this.buttonIndex == null) {
      this.buttonIndex = {};
      for(var i = 0;i < bD.length;i++) {
        this.buttonIndex[bD[i].id] = i;
      }
    }
    //buttonStack Resizing
    if(this.buttonStackWrapperElement.offsetWidth != this.state.canvasSize.x+this.wrapperOffset) {
      if(this.buttonStackWrapperElement.offsetHeight != this.state.canvasSize.y+this.wrapperOffset) {
        this.setState({canvasSize: {x:this.buttonStackWrapperElement.offsetWidth-this.wrapperOffset,y:this.buttonStackWrapperElement.offsetHeight-this.wrapperOffset}});
      }
    }
    //Add all unselected buttons to watcher
    for(var i = 0;i < bD.length;i++) {
      if(bD[i].watcherFunct(
        this.props.gameStateDefinition.gameState,
        this.props.fieldStateDefinition.fieldState,
        this.props.botStateDefinition.botState
      )) {
        if(!this.buttonState.selectedIds.includes(bD[i].id)) {
          this.buttonState.watcherIds.push(bD[i].id);
        }
      }
    }
    //Add visible buttons from watcher array
    for(var i = 0;i < this.buttonState.watcherIds.length;i++) {
      var parentIds = bD[this.buttonIndex[this.buttonState.watcherIds[i]]].parentIds;
      var visible = (parentIds.length <= 0);
      for(var j = 0;j < parentIds.length;j++) {
        if(this.buttonState.selectedIds.includes(parentIds[j])) {
          visible = true;
        }
      }
      if(visible) {
        this.buttonState.visibleIds.push(this.buttonState.watcherIds[i]);
      }
    }
    //Calculate common height
    var nonSelectedIds = [];
    for(var i = 0;i < this.buttonState.visibleIds.length;i++) {
      if(!this.buttonState.selectedIds.includes(this.buttonState.visibleIds[i])) {nonSelectedIds.push(this.buttonState.visibleIds[i])}
    }
    var availableHeight = this.state.canvasSize.y-4;
    var verticalDivider = 0;
    if(this.buttonState.selectedHeights.length > 1) {
      availableHeight = availableHeight - (this.buttonState.selectedHeights[this.buttonState.selectedHeights.length-1]-this.buttonState.selectedHeights[0]);
    }
    for(var i = 0;i < nonSelectedIds.length;i++) {
      verticalDivider += bD[this.buttonIndex[nonSelectedIds[i]]].verticalWeight;
    }
    this.buttonState.currentHeightMultiplier = (availableHeight/(verticalDivider > 0 ? verticalDivider : 1));
    //Calculate final ids and final heights of the button stack
    var currHeight = 0;
    var selectedHeightIndex = 0;
    this.buttonState.finalIds = [];
    this.buttonState.finalHeights = [0];
    for(var i = 0;i < this.buttonState.visibleIds.length;i++) {
      var buttonHeight = bD[this.buttonIndex[this.buttonState.visibleIds[i]]].verticalWeight*this.buttonState.currentHeightMultiplier;
      for(var j = selectedHeightIndex;j < this.buttonState.selectedHeights.length-1;j++) {
        if(currHeight >= this.buttonState.selectedHeights[j]) {
          this.buttonState.finalIds.push(this.buttonState.selectedIds[j]);
          if(this.buttonState.selectedHeights[j] != currHeight) {
            this.buttonState.finalHeights.push(this.buttonState.selectedHeights[j]);
          }
          this.buttonState.finalHeights.push(this.buttonState.selectedHeights[j+1]);
          currHeight = this.buttonState.selectedHeights[j+1];
          selectedHeightIndex = j + 1;
        }
      }
      if(i < this.buttonState.visibleIds.length - 1 && !this.buttonState.selectedIds.includes(this.buttonState.visibleIds[i]) && this.buttonState.selectedIds.includes(this.buttonState.visibleIds[i+1])) {
        this.buttonState.finalHeights.push(this.buttonState.selectedHeights[0]);
        this.buttonState.finalIds.push(this.buttonState.visibleIds[i]);
        currHeight = this.buttonState.selectedHeights[0];
      }
      else if(this.buttonState.selectedIds.includes(this.buttonState.visibleIds[i])) {
        var res = -1;
        for(var j = 0;j < this.buttonState.selectedIds.length;j++) {
          if(this.buttonState.selectedIds[j] == this.buttonState.visibleIds[i]) {
            res = this.buttonState.selectedHeights[0];
          }
        }
        this.buttonState.finalIds.push(this.buttonState.visibleIds[i]);
        this.buttonState.finalHeights.push(res);
        currHeight = res;
      }
      else {
        this.buttonState.finalIds.push(this.buttonState.visibleIds[i]);
        this.buttonState.finalHeights.push(buttonHeight + currHeight);
        currHeight += buttonHeight;
      }
    }
    //Final check for any selected buttons
    for(var j = selectedHeightIndex;j < this.buttonState.selectedHeights.length-1;j++) {
      if(currHeight >= this.buttonState.selectedHeights[j]) {
        this.buttonState.finalIds.push(this.buttonState.selectedIds[j]);
        if(this.buttonState.selectedHeights[j] != currHeight) {
          this.buttonState.finalHeights.push(this.buttonState.selectedHeights[j]);
        }
        this.buttonState.finalHeights.push(this.buttonState.selectedHeights[j+1]);
        currHeight = this.buttonState.selectedHeights[j+1];
        selectedHeightIndex = j + 1;
      }
    }
    console.log(deepcopy(this.buttonState));
    raf(this.draw.bind(this));
  }
  componentDidMount() {
    this.buttonStackElement = this.refs.buttonStack;
    this.buttonStackWrapperElement = this.refs.buttonStackWrapper;
    this.buttonStackCtx = this.buttonStackElement.getContext('2d');
    this.buttonStackElement.ontouchstart = this.touchStart.bind(this);
    this.buttonStackElement.ontouchmove = this.touchMove.bind(this);
    this.buttonStackElement.ontouchend = this.touchEnd.bind(this);
  }
  render() {return (
    <div ref='buttonStackWrapper' style={{width: '100%', height: '100%'}}>
      <canvas ref='buttonStack' width={this.state.canvasSize.x} height={this.state.canvasSize.y}></canvas>
    </div>
  );}
}
