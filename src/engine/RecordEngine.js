import React from 'react';

import * as Package from 'package/PackageCollector';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import ControlBar from 'engine/RecordEngine/ControlBar';
import ButtonStack from 'engine/RecordEngine/ButtonStack';
import RenderCanvas from 'engine/RecordEngine/RenderCanvas';

var store = require('store');
var deepcopy = require('deep-copy');

export default class RecordEngine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: 0
    };
    this.settings = {
      currentYear: 'template',
      buttonStackWidth: 30,
      updateInterval: 125
    }
    this.initialized = false;
    
    this.colorPalette = {};
    this.gameStateDefinition = {gameState: {isRed: true, startDatetime: 0, hasStarted: false}};
    this.fieldStateDefinition = {};
    this.botStateDefinition = {};
    this.eventDefinitions = [];
    this.buttonDefinitions = [];
    
    this.buttonState = [];
    this.eventLog = [];

    Package.getByYear(this.settings.currentYear).then((results) => {
      //Get colorPalette
      this.colorPalette = deepcopy(results.colorPalette);

      //New gameStateDefinition instance
      this.gameStateDefinition = deepcopy(results.gameStateDefinition);
      this.gameStateDefinition.initFunct = new Function('gS', 'dE', this.gameStateDefinition.init);
      this.gameStateDefinition.drawFunct = new Function('gS', 'dE', this.gameStateDefinition.draw);
      Object.assign(this.gameStateDefinition.gameState, {isRed: true, startDatetime: 0, hasStarted: false});
      this.gameStateDefinition.initFunct(this.gameStateDefinition.gameState, this.gameStateDefinition.drawnElements);
      
      //New fieldStateDefinition instance
      this.fieldStateDefinition = deepcopy(results.fieldStateDefinition);
      this.fieldStateDefinition.initFunct = new Function('fS', 'dE', this.fieldStateDefinition.init);
      this.fieldStateDefinition.drawFunct = new Function('fS', 'dE', this.fieldStateDefinition.draw);
      Object.assign(this.fieldStateDefinition.fieldState, {inverted: {x: false, y: false}});
      this.fieldStateDefinition.initFunct(this.fieldStateDefinition.fieldState, this.fieldStateDefinition.drawnElements);
      
      //New botStateDefinition instance
      this.botStateDefinition = deepcopy(results.botStateDefinition);
      this.botStateDefinition.initFunct = new Function('bS', 'dE', this.botStateDefinition.init);
      this.botStateDefinition.drawFunct = new Function('bS', 'dE', this.botStateDefinition.draw);
      Object.assign(this.botStateDefinition.botState, {pos: {x:0, y:0, z:0}, currentZones: [], previousZones: []});
      this.botStateDefinition.initFunct(this.botStateDefinition.botState, this.botStateDefinition.drawnElements);
      
      //New eventDefinitions instance
      this.eventDefinitions = deepcopy(results.eventDefinitions);
      for(var i = 0;i < this.eventDefinitions.length;i++) {
        this.eventDefinitions[i].watcherFunct = new Function('gS', 'fS', 'bS', 'btnS', this.eventDefinitions[i].watcher);
        this.eventDefinitions[i].emitterFunct = new Function('gS', 'fS', 'bS', this.eventDefinitions[i].emitter);
        this.eventDefinitions[i].prevWatcherState = false;
      }
      
      //New eventDefinitions instance
      this.buttonDefinitions = deepcopy(results.buttonDefinitions);
      for(var i = 0;i < this.buttonDefinitions.length;i++) {
        this.buttonDefinitions[i].watcherFunct = new Function('gS', 'fS', 'bS', this.buttonDefinitions[i].watcher);
        this.buttonDefinitions[i].showState = false;
      }
      
      this.initialized = true;
      console.log('[Record Engine] Initialized required variables and states');
      this.setState({timestamp: 0});
      this.refs.buttonStack.update();
      this.refs.renderCanvas.update();
    });
  }
  buttonStackHandler(btnS) {
    this.buttonState = btnS;
    this.update();
    this.buttonState = [];
  }
  renderCanvasHandler(cvsS) {
    this.botStateDefinition.botState.pos.x = cvsS.x;
    this.botStateDefinition.botState.pos.y = cvsS.y;
  }
  update() {
    if(this.gameStateDefinition.gameState.hasStarted) {
      var currTimestamp = ((new Date()) - this.gameStateDefinition.gameState.startDatetime)/1000;
      this.botStateDefinition.botState.pos.t = currTimestamp;
      this.setState({timestamp: currTimestamp});
      console.log('[Record Engine] Update ' + currTimestamp);
      
      for(var i = 0;i < this.eventDefinitions.length;i++) {
        var currWatcherState = this.eventDefinitions[i].watcherFunct(
          this.gameStateDefinition.gameState,
          this.fieldStateDefinition.fieldState,
           this.botStateDefinition.botState,
          this.buttonState
        );
        if(currWatcherState && !this.eventDefinitions[i].prevWatcherState) {
          this.eventDefinitions[i].prevWatcherState = currWatcherState
          var emit = this.eventDefinitions[i].emitterFunct(
            this.gameStateDefinition.gameState,
            this.fieldStateDefinition.fieldState,
            this.botStateDefinition.botState,
            this.buttonStateDefinition.buttonState,
            this.eventDefinitions[i].variables
          );
          this.gameStateDefinition.gameState = emit[0];
          this.fieldStateDefinition.fieldState = emit[1];
          this.botStateDefinition.botState = emit[2];
          this.eventLog.push({
            id: this.eventDefinitions[i].id,
            timestamp: currTimestamp,
            variables: deepcopy(emit[3]),
            gameState: deepcopy(this.gameStateDefinition.gameState),
            fieldState: deepcopy(this.fieldStateDefinition.fieldState),
            botState: deepcopy(this.botStateDefinition.botstate)
          });
        }
      }
      this.refs.buttonStack.update();
      this.refs.renderCanvas.update();
    }
  }
  updateLoop() {
    this.update();
    if(this.gameStateDefinition.gameState.hasStarted) {
      setTimeout(this.updateLoop.bind(this),this.settings.updateInterval);
    }
  }
  start() {
    if(this.initialized) {
      this.gameStateDefinition.gameState.startDatetime = new Date();
      this.gameStateDefinition.gameState.hasStarted = true;
      this.setState({timestamp: 0});
      this.updateLoop.bind(this)();
    }
  }
  stop() {
    if(this.initialized) {
      this.gameStateDefinition.gameState.startDatetime = 0;
      this.gameStateDefinition.gameState.hasStarted = false;
      this.setState({timestamp: 0});
    }
  }
  render() {return (
    <Card className='Content' style={{height:'77vh'}}>
      <ControlBar play={this.start.bind(this)} stop={this.stop.bind(this)} progress={
        ((this.state.timestamp/this.gameStateDefinition.gameState.gameLength)*100)
      } time={this.state.timestamp} />
      <Grid container style={{height:'87%'}}>
        <Grid item style={{width: this.settings.buttonStackWidth + '%', height:'100%'}}>
          <ButtonStack
    ref='buttonStack'
    colorPalette={this.colorPalette}
    gameStateDefinition={this.gameStateDefinition}
    fieldStateDefinition={this.fieldStateDefinition}
    botStateDefinition={this.botStateDefinition}
    eventDefinitions={this.eventDefinitions}
    buttonDefinitions={this.buttonDefinitions}
    buttonStackUpdate={this.buttonStackHandler.bind(this)}
          />
        </Grid>
        <Grid item xs style={{height:'100%'}}>
        <RenderCanvas
    ref='renderCanvas'
    colorPalette={this.colorPalette}
    gameStateDefinition={this.gameStateDefinition}
    fieldStateDefinition={this.fieldStateDefinition}
    botStateDefinition={this.botStateDefinition}
    eventDefinitions={this.eventDefinitions}
    buttonDefinitions={this.buttonDefinitions}
    renderCanvasUpdate={this.renderCanvasHandler.bind(this)}
          />
        </Grid>
      </Grid>
    </Card>
  );}
}
