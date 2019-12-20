import React from 'react';

import * as Package from 'package/PackageCollector';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import ControlBar from 'engine/record/RecordEngine/ControlBar';
import ButtonStack from 'engine/record/RecordEngine/ButtonStack';
import RenderCanvas from 'engine/record/RecordEngine/RenderCanvas';

var store = require('store');
var deepcopy = require('deep-copy');

export default class RecordEngine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: 0
    };

    //TODO: Settings menu elsewhere to modify these values
    this.settings = {
      currentYear: 'template',
      buttonStackWidth: 30,
      updateInterval: 125
    }

    this.engineState = {
      intialized: false,
      playing: false,
      played: false,
      startDate: 0,
      currDate: 0,
      currTime: 0
    };

    this.matchState = {
      matchStartDate: 0, //Could be different from engineState.startDate if scouting via video
      targetTeamNumber: 0,
      matchNumber: 0,
      matchType: 't', //t, pf, pm, qm, ef, qf, sf, f
      isRed: true
    }
    
    this.colorPalette = {};
    this.gameStateDefinition = {
      gameState: {
        gameLength: 150
      }
    };
    this.fieldStateDefinition = {
      fieldState: {
        dimensions: {x: 54, y: 27},
        zones: [],
        inverted: {x: false, y: false}
      }
    };
    this.botStateDefinition = {};
    this.eventDefinitions = [];
    this.buttonDefinitions = [];
    
    this.buttonState = [];
    this.eventLog = [];
    this.posLog = [];

    //Initialize various variables, states, and definitions
    Package.getByYear(this.settings.currentYear).then((results) => {
      //Get colorPalette
      this.colorPalette = deepcopy(results.colorPalette);

      //New gameStateDefinition instance
      this.gameStateDefinition = deepcopy(results.gameStateDefinition);
      //Initialize init function from init string
      this.gameStateDefinition.initFunct = new Function('gS', 'fS', 'bS', 'dE', this.gameStateDefinition.init);
      //Initialize update function from update string
      this.gameStateDefinition.updateFunct = new Function('gS', 'fS', 'bS', 'dE', this.gameStateDefinition.update);
      //Assign default values to required fields
      Object.assign(this.gameStateDefinition.gameState, {
        isRed: true,
        hasStarted: false,
        startDatetime: 0
      });
      
      //New fieldStateDefinition instance
      this.fieldStateDefinition = deepcopy(results.fieldStateDefinition);
      //Initialize init function from init string
      this.fieldStateDefinition.initFunct = new Function('gS', 'fS', 'bS', 'dE', this.fieldStateDefinition.init);
      //Initialize update function from update string
      this.fieldStateDefinition.updateFunct = new Function('gS', 'fS', 'bS', 'dE', this.fieldStateDefinition.update);
      Object.assign(this.fieldStateDefinition.fieldState, {
        inverted: {x: false, y: false}
      });

      //New botStateDefinition instance
      this.botStateDefinition = deepcopy(results.botStateDefinition);
      //Initialize init function from init string
      this.botStateDefinition.initFunct = new Function('gS', 'fS', 'bS', 'dE', this.botStateDefinition.init);
      //Initialize update function from update string
      this.botStateDefinition.updateFunct = new Function('gS', 'fS', 'bS', 'dE', this.botStateDefinition.update);
      //Assign default values to required fields
      Object.assign(this.botStateDefinition.botState, {
        currentZones: [], 
        previousZones: []
      });
      
      //New eventDefinitions instance
      this.eventDefinitions = deepcopy(results.eventDefinitions);
      for(var i = 0;i < this.eventDefinitions.length;i++) {
        //Initialize watcher function from watcher string
        this.eventDefinitions[i].watcherFunct = new Function('gS', 'fS', 'bS', 'btnS', this.eventDefinitions[i].watcher);
        //Initialize emitter function from emitter string
        this.eventDefinitions[i].emitterFunct = new Function('gS', 'fS', 'bS', 'btnS', this.eventDefinitions[i].emitter);
        //Set previous watcher state variable to track changes in watcher state
        this.eventDefinitions[i].prevWatcherState = false;
      }
      
      //New buttonDefinitions instance
      this.buttonDefinitions = deepcopy(results.buttonDefinitions);
      for(var i = 0;i < this.buttonDefinitions.length;i++) {
        //Initialize watcher function from watcher string
        this.buttonDefinitions[i].watcherFunct = new Function('gS', 'fS', 'bS', this.buttonDefinitions[i].watcher);
      }
      
      //Run initialization functions found in state definitions instances
      this.gameStateDefinition.initFunct(
        this.gameStateDefinition.gameState,
        this.fieldStateDefinition.fieldState,
        this.botStateDefinition.botState,
        this.gameStateDefinition.drawnElements
      );
      this.fieldStateDefinition.initFunct(
        this.gameStateDefinition.gameState,
        this.fieldStateDefinition.fieldState,
        this.botStateDefinition.botState,
        this.fieldStateDefinition.drawnElements
      );
      this.botStateDefinition.initFunct(
        this.gameStateDefinition.gameState,
        this.fieldStateDefinition.fieldState,
        this.botStateDefinition.botState,
        this.botStateDefinition.drawnElements
      );
      
      this.engineState.initialized = true;
      console.log('[Record Engine] Initialized required variables, states, and definitions');
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
    if(this.engineState.playing) {
      //Calculate timestamp from current date
      var tmpCurrDate = new Date();
      this.engineState.currTime += (tmpCurrDate - this.engineState.currDate)/1000;
      this.engineState.currDate = tmpCurrDate;

      //Assign current timestamp to various other objects needing time information
      this.botStateDefinition.botState.pos.t = this.engineState.currTime;
      this.setState({timestamp: this.engineState.currTime});
      console.log('[Record Engine] Update at ' + this.engineState.currTime.toFixed(2) + ' sec');
      
      //Run update functions found in state definitions instances
      this.gameStateDefinition.initFunct(
        this.gameStateDefinition.gameState,
        this.fieldStateDefinition.fieldState,
        this.botStateDefinition.botState,
        this.gameStateDefinition.drawnElements
      );
      this.fieldStateDefinition.initFunct(
        this.gameStateDefinition.gameState,
        this.fieldStateDefinition.fieldState,
        this.botStateDefinition.botState,
        this.fieldStateDefinition.drawnElements
      );
      this.botStateDefinition.initFunct(
        this.gameStateDefinition.gameState,
        this.fieldStateDefinition.fieldState,
        this.botStateDefinition.botState,
        this.botStateDefinition.drawnElements
      );

      //Check and trigger events
      for(var i = 0;i < this.eventDefinitions.length;i++) {
        var currWatcherState = this.eventDefinitions[i].watcherFunct(
          this.gameStateDefinition.gameState,
          this.fieldStateDefinition.fieldState,
          this.botStateDefinition.botState,
          this.buttonState
        );
        if(currWatcherState && !this.eventDefinitions[i].prevWatcherState) {
          this.eventDefinitions[i].prevWatcherState = currWatcherState;
          var emit = this.eventDefinitions[i].emitterFunct(
            this.gameStateDefinition.gameState,
            this.fieldStateDefinition.fieldState,
            this.botStateDefinition.botState,
            this.buttonState
          );
          Object.assign(this.eventDefinitions[i],{variables: emit});
          this.eventLog.push({
            event: deepcopy(this.eventDefinitions[i]),
            gameState: deepcopy(this.gameStateDefinition.gameState),
            fieldState: deepcopy(this.fieldStateDefinition.fieldState),
            botState: deepcopy(this.botStateDefinition.botstate)
          });
        }
      }
      
      //Push latest robot position to posLog
      this.posLog.push({
        x: this.botStateDefinition.botState.pos.x,
        y: this.botStateDefinition.botState.pos.y,
        t: this.botStateDefinition.botState.pos.t
      });

      //Trigger buttonStack and renderCanvas update functions
      this.refs.buttonStack.update();
      this.refs.renderCanvas.update();
    }
  }
  updateLoop() {
    this.update();
    if(this.engineState.playing) {
      setTimeout(this.updateLoop.bind(this), this.settings.updateInterval);
    }
  }
  start() {
    //Call this function to start the update loop, will reset eventLog and posLog
    if(this.engineState.initialized) {
      this.engineState.startDate = new Date();
      this.engineState.currDate = new Date();
      this.engineState.currTime = 0;
      this.eventLog = [];
      this.posLog = [];
      this.engineState.playing = true;
      this.engineState.played = true;
      this.setState({timestamp: 0});
      console.log('[Record Engine] Starting recording engine');
      this.updateLoop.bind(this)();
    }
  }
  stop() {
    //Call this function to stop the recording engine. Intended for restarting a recording session and this will erase information
    if(this.engineState.initialized) {
      this.engineState.startDate = 0;
      this.engineState.currDate = 0;
      this.engineState.currTime = 0;
      this.engineState.playing = false;
      console.log('[Record Engine] Stopping recording engine');
      this.setState({timestamp: 0});
    }
  }
  resume() {
    //Call this function to resume from a paused recording engine state
    if(this.engineState.initialized) {
      this.engineState.currDate = new Date();
      this.engineState.playing = true;
      console.log('[Record Engine] Resuming recording engine');
      this.updateLoop.bind(this)();
    }
  }
  pause() {
    //Call this function to pause a recording session. Use this for ending the session for saving as it does not erase information
    if(this.engineState.initialized) {
      this.engineState.playing = false;
      this.setState({timestamp: 0});
      console.log('[Record Engine] Pausing recording engine');
    }
  }
  render() {return (
    <Card className='Content' style={{height:'77vh'}}>
      <ControlBar 
    ref='controlBar'
    play={this.start.bind(this)}
    stop={this.stop.bind(this)}
    resume={this.resume.bind(this)}
    pause={this.pause.bind(this)}
    progress={((this.state.timestamp/this.gameStateDefinition.gameState.gameLength)*100)}
    time={this.state.timestamp}
      />
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
