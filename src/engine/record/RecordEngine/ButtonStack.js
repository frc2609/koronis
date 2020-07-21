import React from 'react';

var deepcopy = require('deep-copy');
var raf = require('raf');

export default class ButtonStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasSize: {x: 100,y: 100}
    };
    this.wrapperOffset = 5;
    this.buttonStackElement = {};
    this.buttonStackWrapperElement = {};
    this.buttonStackCtx = {};

    this.buttonInitialized = false;
    this.buttonStates = [];
    this.touchState = {x: 0, y: 0};

    this.buttonKeys = [];
    this.keyUpListener = null;
    this.keyDownListener = null;
  }
  init() {
    this.buttonInitialized = false;
    this.buttonStates = [];
    this.touchState = {x: 0, y: 0};

    this.buttonKeys = [];
    var tmpButtonDefs = deepcopy(this.props.buttonDefinitions);
    console.info('[Record Engine > Button Stack] Creating button to keyboard mapping. Initial button stack length: ' + tmpButtonDefs.length);
    tmpButtonDefs.sort((e1, e2) => {
      return e1.title.length - e2.title.length;
    });
    for(var i = 0;i < tmpButtonDefs.length;i++) {
      var compStr = ' .,!@#$%^&*-=_+()[]{}\\/\'\"'; // eslint-disable-line no-useless-escape
      for(var j = 0;j < this.buttonKeys.length;j++) {
        compStr += this.buttonKeys[j].key;
      }
      var str = tmpButtonDefs[i].title.toLowerCase();
      for(var j = 0;j < str.length;j++) { // eslint-disable-line no-redeclare
        if(!compStr.includes(str.charAt(j))) {
          this.buttonKeys.push({
            id: tmpButtonDefs[i].id,
            key: str.charAt(j)
          });
          break;
        }
      }
    }
    console.info('[Record Engine > Button Stack] Done creating button to keyboard mapping. Keyboard mapping length: ' + this.buttonKeys.length);

    this.update();
  }
  getButtonStr(id, str) {
    var newStr = '';
    var containsChar = false;
    for(var i = 0;i < str.length;i++) {
      for(var j = 0;j < this.buttonKeys.length;j++) {
        if(id === this.buttonKeys[j].id) {
          if(!containsChar) {
            if(str.charAt(i).toLowerCase() === this.buttonKeys[j].key) {
              containsChar = true;
              newStr += '(' + str.charAt(i) + ')';
            }
            else {
              newStr += str.charAt(i);
            }
          }
          else {
            newStr += str.charAt(i);
          }
        }
      }
    }
    return newStr;
  }
  keyDown(event) {
    if(this.props.focused) {
      var id = -1;
      for(var i = 0;i < this.buttonKeys.length;i++) {
        if(this.buttonKeys[i].key === event.key) {
          id = this.buttonKeys[i].id;
        }
      }
      for(var i = 0;i < this.buttonStates.length;i++) { // eslint-disable-line no-redeclare
        if(this.buttonStates[i].id === id && this.buttonStates[i].visible) {
          this.buttonStates[i].selected = true;
        }
      }
      event.preventDefault();
      this.update();
    }
  }
  keyUp(event) {
    if(this.props.focused) {
      var btnS = [];
      var id = -1;
      for(var i = 0;i < this.buttonKeys.length;i++) {
        if(this.buttonKeys[i].key === event.key) {
          id = this.buttonKeys[i].id;
        }
      }
      for(var i = 0;i < this.buttonStates.length;i++) { // eslint-disable-line no-redeclare
        if(this.buttonStates[i].id === id && this.buttonStates[i].selected) {
          this.buttonStates[i].selected = false;
          btnS.push(deepcopy(this.buttonStates[i]));
        }
      }
      event.preventDefault();
      this.props.buttonStackUpdate(btnS);
      this.update();
    }
  }
  touchStart(event) {
    var rect = this.buttonStackElement.getBoundingClientRect();
    var index = 0;
    var x = event.touches[index].clientX - rect.left;
    var y = event.touches[index].clientY - rect.top;
    while((x < 0 || y < 0 || x > rect.right || y > rect.bottom) && index < event.touches.length - 1) {
      index++;
      x = event.touches[index].clientX - rect.left;
      y = event.touches[index].clientY - rect.top;
    }
    this.touchState.x = x;
    this.touchState.y = y;
    var offset = 10;
    for(var i = 0;i < this.buttonStates.length;i++) {
      if(this.buttonStates[i].position.y <= y && this.buttonStates[i].visible) {
        if(this.buttonStates[i].position.y + this.buttonStates[i].size.y >= y) {
          if(this.buttonStates[i].position.x <= x) {
            if(this.buttonStates[i].position.x + this.buttonStates[i].size.x >= x) {
              this.buttonStates[i].selected = true;
              if(y + offset < this.buttonStates[i].size.y - this.buttonStates[i].position.y) {
                if(y + offset > this.buttonStates[i].size.y/2 + this.buttonStates[i].position.y) {
                  //this.buttonStates[i].size.y = (y + offset) - this.buttonStates[i].position.y;
                }
              }
              if(x + offset < this.buttonStates[i].size.x - this.buttonStates[i].position.x) {
                if(x + offset > this.buttonStates[i].size.x/2 + this.buttonStates[i].position.x) {
                  //this.buttonStates[i].size.x = (x + offset) - this.buttonStates[i].position.x;
                }
              }
            }
          }
        }
      }
    }
    this.update();
    event.preventDefault();
  }
  touchMove(event) {
    var rect = this.buttonStackElement.getBoundingClientRect();
    var index = 0;
    var x = event.touches[index].clientX - rect.left;
    var y = event.touches[index].clientY - rect.top;
    while((x < 0 || y < 0 || x > rect.right || y > rect.bottom) && index < event.touches.length - 1) {
      index++;
      x = event.touches[index].clientX - rect.left;
      y = event.touches[index].clientY - rect.top;
    }
    this.touchState.x = x;
    this.touchState.y = y;
    //this.update();
    event.preventDefault();
  }
  touchEnd(event) {
    var btnS = [];
    for(var i = 0;i < this.buttonStates.length;i++) {
      if(this.buttonStates[i].selected) {
        if(this.buttonStates[i].position.y <= this.touchState.y) {
          if(this.buttonStates[i].position.y + this.buttonStates[i].size.y >= this.touchState.y) {
            if(this.buttonStates[i].position.x <= this.touchState.x) {
              if(this.buttonStates[i].position.x + this.buttonStates[i].size.x >= this.touchState.x) {
                btnS.push(deepcopy(this.buttonStates[i]));
              }
            }
          }
        }
      }
      this.buttonStates[i].selected = false;
    }
    this.props.buttonStackUpdate(btnS);
    this.update();
    event.preventDefault();
  }
  draw() {
    this.buttonStackCtx.clearRect(0, 0, this.state.canvasSize.x, this.state.canvasSize.y);
    for(var i = 0;i < this.buttonStates.length;i++) {
      if(this.buttonStates[i].visible) {
        this.buttonStackCtx.font = (Math.round(this.state.canvasSize.y/15) + 'px Arial');
        this.buttonStackCtx.lineWidth = this.state.canvasSize.y/40;
        var colorPaletteArr = [];
        var buttonStyleObj = {};
        if(this.buttonStates[i].selected) {
          buttonStyleObj = this.buttonStates[i].style.depressed;
        }
        else {
          buttonStyleObj = this.buttonStates[i].style.released;
        }
        colorPaletteArr = this.props.colorPalette[buttonStyleObj.palette];
        this.buttonStackCtx.fillStyle = colorPaletteArr[colorPaletteArr.findIndex((e) => {return e.name === buttonStyleObj.fill})].hex; // eslint-disable-line no-loop-func
        this.buttonStackCtx.strokeStyle = colorPaletteArr[colorPaletteArr.findIndex((e) => {return e.name === buttonStyleObj.outline})].hex; // eslint-disable-line no-loop-func
        this.buttonStackCtx.fillRect(
          this.buttonStates[i].position.x,
          this.buttonStates[i].position.y,
          this.buttonStates[i].size.x,
          this.buttonStates[i].size.y
        );
        this.buttonStackCtx.strokeRect(
          this.buttonStates[i].position.x,
          this.buttonStates[i].position.y,
          this.buttonStates[i].size.x,
          this.buttonStates[i].size.y
        );
        this.buttonStackCtx.textAlign = 'center';
        this.buttonStackCtx.textBaseline = 'middle';
        this.buttonStackCtx.fillStyle = colorPaletteArr[colorPaletteArr.findIndex((e) => {return e.name === buttonStyleObj.text})].hex; // eslint-disable-line no-loop-func
        this.buttonStackCtx.fillText(
          this.getButtonStr(this.buttonStates[i].id, this.buttonStates[i].title),
          this.buttonStates[i].position.x + this.buttonStates[i].size.x/2,
          this.buttonStates[i].position.y + this.buttonStates[i].size.y/2,
          this.buttonStates[i].size.x * 0.8
        );
      }
    }
  }
  update() {
    //Resize if needed
    this.resize();

    //Set buttonStates
    if(!this.buttonInitialized) {
      this.buttonStates = deepcopy(this.props.buttonDefinitions);
      this.buttonInitialized = true;
    }
    //Check which buttons should be visible
    for(var i = 0;i < this.buttonStates.length;i++) {
      this.buttonStates[i].visible = (
        this.buttonStates[i].watcherFunct(
          this.props.gameStateDefinition.gameState,
          this.props.fieldStateDefinition.fieldState,
          this.props.botStateDefinition.botState
        ) || this.buttonStates[i].selected
      );
    }
    //Create button groups
    var buttonGroups = [];
    for(var i = 0;i < this.buttonStates.length;i++) { // eslint-disable-line no-redeclare
      if(this.buttonStates[i].visible) {
        var buttonGroupIndex = buttonGroups.findIndex((e) => {return e.group === this.buttonStates[i].group}); // eslint-disable-line no-loop-func
        if(buttonGroupIndex !== -1) {
          buttonGroups[buttonGroupIndex].buttonIds.push(this.buttonStates[i].id);
          //Assign max VW
          if(this.buttonStates[i].verticalWeight > buttonGroups[buttonGroupIndex].verticalWeight && !buttonGroups[buttonGroupIndex].selected) {
            buttonGroups[buttonGroupIndex].verticalWeight = this.buttonStates[i].verticalWeight;
          }
        }
        else {
          buttonGroups.push({
            group: this.buttonStates[i].group,
            buttonIds: [this.buttonStates[i].id],
            verticalWeight: this.buttonStates[i].verticalWeight,
            selected: false,
            positionY: 0,
            sizeY: 0
          });
          buttonGroupIndex = buttonGroups.findIndex((e) => {return e.group === this.buttonStates[i].group}); // eslint-disable-line no-loop-func
        }
        if(this.buttonStates[i].selected && !buttonGroups[buttonGroupIndex].selected) {
          buttonGroups[buttonGroupIndex].verticalWeight = this.buttonStates[i].verticalWeight;
          buttonGroups[buttonGroupIndex].selected = this.buttonStates[i].selected;
          buttonGroups[buttonGroupIndex].positionY = this.buttonStates[i].position.y;
          buttonGroups[buttonGroupIndex].sizeY = this.buttonStates[i].size.y;
        }
      }
    }
    //Get sum of usable space and total VW
    var availableCanvas = this.state.canvasSize.y;
    var totalVerticalWeights = 0;
    for(var i = 0;i < buttonGroups.length;i++) { // eslint-disable-line no-redeclare
      if(!buttonGroups[i].selected) {
        totalVerticalWeights += buttonGroups[i].verticalWeight;
      }
      else {
        availableCanvas -= buttonGroups[i].sizeY;
      }
    }
    //Map unselected button groups
    var currHeight = 0;
    for(var i = 0;i < buttonGroups.length;i++) { // eslint-disable-line no-redeclare
      if(!buttonGroups[i].selected) {
        buttonGroups[i].positionY = currHeight;
        buttonGroups[i].sizeY = buttonGroups[i].verticalWeight * (availableCanvas/totalVerticalWeights);
        currHeight += buttonGroups[i].sizeY;
      }
    }
    //Insert selected button groups
    var selectedButtonGroup = buttonGroups.findIndex((e) => {return e.selected;});
    while (selectedButtonGroup !== -1) {
      var targetTop = buttonGroups[selectedButtonGroup].positionY;
      var targetBottom = targetTop + buttonGroups[selectedButtonGroup].sizeY;
      for(var i = 0;i < buttonGroups.length;i++) { // eslint-disable-line no-redeclare
        if(!buttonGroups[i].selected) {
          var currTop = buttonGroups[i].positionY;
          var currBottom = currTop + buttonGroups[i].sizeY;
          var currMid = (currTop + currBottom)/2;
          if(targetBottom > currTop && targetTop < currBottom) {
            var newTop = 0;
            var newBottom = 0;
            if(currMid < targetTop) {
              newTop = currTop;
              newBottom = targetTop;
            }
            else {
              newTop = targetBottom;
              newBottom = newTop + (currBottom - currTop);
              //Push the stack down
              var pushAmount = targetBottom - currTop;
              for(var j = 0;j < buttonGroups.length;j++) {
                if(buttonGroups[j].positionY > buttonGroups[i].positionY && j !== i && !buttonGroups[j].selected) {
                  buttonGroups[j].positionY += pushAmount;
                }
              }
            }
            buttonGroups[i].positionY = newTop;
            buttonGroups[i].sizeY = newBottom - newTop;
          }
        }
      }
      selectedButtonGroup = buttonGroups.findIndex((e, i) => {return e.selected && i > selectedButtonGroup;}); // eslint-disable-line no-loop-func
    }
    //Sort from top to bottom
    buttonGroups.sort((e1, e2) => {return e1.positionY - e2.positionY});
    //Fill gaps
    for(var i = 0;i < buttonGroups.length;i++) { // eslint-disable-line no-redeclare
      if(i < buttonGroups.length - 1) {
        buttonGroups[i].sizeY = buttonGroups[i+1].positionY - buttonGroups[i].positionY;
      }
      else {
        buttonGroups[i].sizeY = this.state.canvasSize.y - buttonGroups[i].positionY;
      }
    }
    //One last sort
    buttonGroups.sort((e1, e2) => {return e1.positionY - e2.positionY});

    //Sort out buttons in buttonGroups
    for(var i = 0;i < buttonGroups.length;i++) { // eslint-disable-line no-redeclare
      //Get current buttons in current buttonGroup
      var currButtons = [];
      for(var j = 0;j < buttonGroups[i].buttonIds.length;j++) {// eslint-disable-line no-redeclare
        var currButtonIndex = this.buttonStates.findIndex((e) => {return e.id === buttonGroups[i].buttonIds[j];}); // eslint-disable-line no-loop-func
        if(currButtonIndex !== -1) {
          currButtons.push(this.buttonStates[currButtonIndex]);
        }
      }
      //Get sum of usable space and total HW
      var availableCanvas = this.state.canvasSize.x; // eslint-disable-line no-redeclare
      var totalHorizontalWeights = 0;
      for(var j = 0;j < currButtons.length;j++) { // eslint-disable-line no-redeclare
        if(!currButtons[j].selected) {
          totalHorizontalWeights += currButtons[j].horizontalWeight;
        }
        else {
          availableCanvas -= currButtons[j].size.x;
        }
      }
      //Map unselected buttons and set vertical position and size
      var currWidth = 0;
      for(var j = 0;j < currButtons.length;j++) { // eslint-disable-line no-redeclare
        currButtons[j].position.y = buttonGroups[i].positionY;
        currButtons[j].size.y = buttonGroups[i].sizeY;
        if(!currButtons[j].selected) {
          currButtons[j].position.x = currWidth;
          currButtons[j].size.x = currButtons[j].horizontalWeight * (availableCanvas/totalHorizontalWeights);
          currWidth += currButtons[j].size.x;
        }
      }

      //Insert selected button
      var selectedButton = currButtons.findIndex((e) => {return e.selected;});
      while (selectedButton !== -1) {
        var targetLeft = currButtons[selectedButton].position.x;
        var targetRight = targetLeft + currButtons[selectedButton].size.x;
        for(var j = 0;j < currButtons.length;j++) { // eslint-disable-line no-redeclare
          if(!currButtons[j].selected) {
            var currLeft = currButtons[j].position.x;
            var currRight = currLeft + currButtons[j].size.x;
            var currMid = (currLeft + currRight)/2; // eslint-disable-line no-redeclare
            if(targetRight > currLeft && targetLeft < currRight) {
              var newLeft = 0;
              var newRight = 0;
              if(currMid < targetLeft) {
                newLeft = currLeft;
                newRight = targetLeft;
              }
              else {
                newLeft = targetRight;
                newRight = newLeft + (currRight - currLeft);
                //Push the stack down
                var pushAmount = targetRight - currLeft; // eslint-disable-line no-redeclare
                for(var k = 0;k < currButtons.length;k++) {
                  if(currButtons[k].position.x > currButtons[j].position.x && k !== j && !currButtons[k].selected) {
                    currButtons[k].position.x += pushAmount;
                  }
                }
              }
              currButtons[j].position.x = newLeft;
              currButtons[j].size.x = newRight - newLeft;
            }
          }
        }
        selectedButton = currButtons.findIndex((e, i) => {return e.selected && i > selectedButton;}); // eslint-disable-line no-loop-func
      }

      //Sort from left to right
      currButtons.sort((e1, e2) => {return e1.position.x - e2.position.x});
      //Fill gaps
      for(var j = 0;j < currButtons.length;j++) { // eslint-disable-line no-redeclare
        if(j < currButtons.length - 1) {
          currButtons[j].size.x = currButtons[j+1].position.x - currButtons[j].position.x;
        }
        else {
          currButtons[j].size.x = this.state.canvasSize.x - currButtons[j].position.x;
        }
      }
      //One last sort
      currButtons.sort((e1, e2) => {return e1.position.x - e2.position.x});
    }
    //Call the draw function
    raf(this.draw.bind(this));
  }
  resize() {
    //Resize canvas if needed
    if(this.buttonStackWrapperElement.offsetWidth !== this.state.canvasSize.x + this.wrapperOffset || this.buttonStackWrapperElement.offsetHeight !== this.state.canvasSize.y + this.wrapperOffset) {
      this.setState({canvasSize: {x: this.buttonStackWrapperElement.offsetWidth - this.wrapperOffset, y: this.buttonStackWrapperElement.offsetHeight - this.wrapperOffset}});
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
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.buttonDefinitions !== this.props.buttonDefinitions) {
      this.init();
    }
  }
  componentDidMount() {
    this.buttonStackElement = this.refs.buttonStack;
    this.buttonStackWrapperElement = this.refs.buttonStackWrapper;
    this.buttonStackCtx = this.buttonStackElement.getContext('2d');
    //Bind touch events
    this.buttonStackElement.ontouchstart = this.touchStart.bind(this);
    this.buttonStackElement.ontouchmove = this.throttle(this.touchMove.bind(this)).bind(this);
    this.buttonStackElement.ontouchend = this.touchEnd.bind(this);
    //Bind keyboard events
    this.keyUpListener = this.keyUp.bind(this);
    this.keyDownListener = this.keyDown.bind(this);
    window.onkeydown = this.keyDownListener;
    window.onkeyup = this.keyUpListener;

    this.resize();
  }
  componentWillUnmount() {
    window.onkeydown = null;
    window.onkeyup = null;
  }
  render() {
    return (
      <div ref='buttonStackWrapper' style={{width: '100%', height: '100%'}}>
        <canvas ref='buttonStack' width={this.state.canvasSize.x} height={this.state.canvasSize.y}></canvas>
      </div>
    );
  }
}
