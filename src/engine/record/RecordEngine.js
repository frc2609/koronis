import React from 'react';

import * as Package from 'sync/package/PackageCollector';
import * as Save from 'engine/record/Save';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import ControlBar from 'engine/record/RecordEngine/ControlBar';
import ButtonStack from 'engine/record/RecordEngine/ButtonStack';
import RenderCanvas from 'engine/record/RecordEngine/RenderCanvas';

var store = require('store');
var deepcopy = require('deep-copy');

export default class RecordEngine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: 0,
      buttonStackWidth: 30,
      buttonStackFocus: true
    };

    this.settings = {};
    this.engineState = {};
    this.colorPalette = {};
    this.gameStateDefinition = {};
    this.fieldStateDefinition = {};
    this.botStateDefinition = {};
    this.eventDefinitions = [];
    this.buttonDefinitions = [];
    this.statusUpdateDefinition = {};
    this.buttonState = [];
    this.eventLog = [];
    this.positionLog = [];
    this.matchState = {
      matchStartDate: 0, //Could be different from engineState.startDate if scouting via video
      targetTeamNumber: 0,
      matchNumber: 0,
      matchType: 't',
      isRed: true,
      comments: ''
    };
    this.resizeListener = () => {};

    this.init();
  }
  init() {
    this.settings = {
      currentYear: 0,
      buttonStackWidth: 30,
      updateInterval: (1000/15)
    };
    if(typeof store.get('settings/currentYear') !== 'undefined') {
      this.settings.currentYear = store.get('settings/currentYear');
    }
    if(typeof store.get('record/settings/buttonStackWidth') !== 'undefined') {
      this.settings.buttonStackWidth = store.get('record/settings/buttonStackWidth');
    }
    if(typeof store.get('record/settings/updateInterval') !== 'undefined') {
      this.settings.updateInterval = store.get('record/settings/updateInterval');
    }

    this.engineState = {
      intialized: false,
      playing: false,
      played: false,
      startDate: 0,
      currDate: 0,
      currTime: 0,
      flip: false
    };

    this.colorPalette = {};
    this.gameStateDefinition = {
      gameState: {
        gameLength: 150
      }
    };
    this.fieldStateDefinition = {
      fieldState: {
        dimensions: {x: 54, y: 27},
        zones: []
      }
    };
    this.botStateDefinition = {
      botState: {
        position: {
          x: 0,
          y: 0,
          t: 0
        },
        currentZones: [],
        previousZones: []
      }
    };
    this.eventDefinitions = [];
    this.buttonDefinitions = [];
    this.statusUpdateDefinition = {
      statusState: []
    };

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
      this.gameStateDefinition.initFunct = new Function('gS', 'fS', 'bS', 'dE', this.gameStateDefinition.init); // eslint-disable-line no-new-func
      //Initialize update function from update string
      this.gameStateDefinition.updateFunct = new Function('gS', 'fS', 'bS', 'dE', this.gameStateDefinition.update); // eslint-disable-line no-new-func
      //Assign default values to required fields
      Object.assign(this.gameStateDefinition.gameState, {
        startDatetime: 0
      });

      //New fieldStateDefinition instance
      this.fieldStateDefinition = deepcopy(results.fieldStateDefinition);
      //Initialize init function from init string
      this.fieldStateDefinition.initFunct = new Function('gS', 'fS', 'bS', 'dE', this.fieldStateDefinition.init); // eslint-disable-line no-new-func
      //Initialize update function from update string
      this.fieldStateDefinition.updateFunct = new Function('gS', 'fS', 'bS', 'dE', this.fieldStateDefinition.update); // eslint-disable-line no-new-func
      Object.assign(this.fieldStateDefinition.fieldState, {
        inverted: {x: false, y: false}
      });

      //New botStateDefinition instance
      this.botStateDefinition = deepcopy(results.botStateDefinition);
      //Initialize init function from init string
      this.botStateDefinition.initFunct = new Function('gS', 'fS', 'bS', 'dE', this.botStateDefinition.init); // eslint-disable-line no-new-func
      //Initialize update function from update string
      this.botStateDefinition.updateFunct = new Function('gS', 'fS', 'bS', 'dE', this.botStateDefinition.update); // eslint-disable-line no-new-func
      //Assign default values to required fields
      Object.assign(this.botStateDefinition.botState, {
        currentZones: [],
        previousZones: []
      });

      //New eventDefinitions instance
      this.eventDefinitions = deepcopy(results.eventDefinitions);
      for(var i = 0;i < this.eventDefinitions.length;i++) {
        //Initialize watcher function from watcher string
        this.eventDefinitions[i].watcherFunct = new Function('gS', 'fS', 'bS', 'btnS', this.eventDefinitions[i].watcher); // eslint-disable-line no-new-func
        //Initialize emitter function from emitter string
        this.eventDefinitions[i].emitterFunct = new Function('gS', 'fS', 'bS', 'btnS', this.eventDefinitions[i].emitter); // eslint-disable-line no-new-func
        //Set previous watcher state variable to track changes in watcher state
        this.eventDefinitions[i].prevWatcherState = false;
      }

      //New buttonDefinitions instance
      this.buttonDefinitions = deepcopy(results.buttonDefinitions);
      for(var i = 0;i < this.buttonDefinitions.length;i++) { // eslint-disable-line no-redeclare
        //Initialize watcher function from watcher string
        this.buttonDefinitions[i].watcherFunct = new Function('gS', 'fS', 'bS', this.buttonDefinitions[i].watcher); // eslint-disable-line no-new-func
        //Create default properties
        Object.assign(this.buttonDefinitions[i], {
          visible: false,
          selected: false,
          size: {x: 0, y: 0},
          position: {x: 0, y: 0}
        });
      }

      //New statusUpdateDefinition instance
      this.statusUpdateDefinition = deepcopy(results.statusUpdateDefinition);
      this.statusUpdateDefinition.updateFunct = new Function('gS', 'fS', 'bS', this.statusUpdateDefinition.update); // eslint-disable-line no-new-func

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
      console.info('[Record Engine] Initialized required variables, states, and definitions');
      this.setState({timestamp: 0});
      this.update();
    });
  }
  buttonStackHandler(btnS) {
    this.buttonState = btnS;
    this.update();
    this.buttonState = [];
    this.update();
  }
  renderCanvasHandler(cvsS) {
    this.botStateDefinition.botState.position.x = cvsS.x;
    this.botStateDefinition.botState.position.y = cvsS.y;
    this.update();
  }
  matchStateHandler(mS) {
    Object.assign(this.matchState, mS);
    this.update();
  }
  settingsHandler(s) {
    if(s.currentYear !== this.settings.currentYear) {
      this.init();
    }
    else {
      this.settings = s;
      setTimeout(this.update.bind(this), 500);
      this.resize();
      this.setState({buttonStackWidth: this.settings.buttonStackWidth});
    }
  }
  flipHandler(f) {
    this.engineState.flip = f;
    this.update();
  }
  update() {
    if(this.engineState.initialized) {
      //Update time if engine is playing
      if(this.engineState.playing) {
        //Calculate timestamp from current date
        var tmpCurrDate = Date.now();
        this.engineState.currTime += (tmpCurrDate - this.engineState.currDate)/1000;
        this.engineState.currDate = tmpCurrDate;

        //Assign current timestamp to various other objects needing time information
        this.botStateDefinition.botState.position.t = this.engineState.currTime;
        this.setState({timestamp: this.engineState.currTime});
        console.info('[Record Engine] Update at ' + this.engineState.currTime.toFixed(2) + ' sec');
      }

      //Assigning zones
      this.botStateDefinition.botState.previousZones = deepcopy(this.botStateDefinition.botState.currentZones);
      this.botStateDefinition.botState.currentZones = [];
      for(var i = 0;i < this.fieldStateDefinition.fieldState.zones.length;i++) {
        if(typeof this.fieldStateDefinition.fieldState.zones[i].points === 'undefined') {
          if(this.botStateDefinition.botState.position.x >= this.fieldStateDefinition.fieldState.zones[i].position.x) {
            if(this.botStateDefinition.botState.position.y >= this.fieldStateDefinition.fieldState.zones[i].position.y) {
              if(this.botStateDefinition.botState.position.x <= this.fieldStateDefinition.fieldState.zones[i].position.x + this.fieldStateDefinition.fieldState.zones[i].size.x) {
                if(this.botStateDefinition.botState.position.y <= this.fieldStateDefinition.fieldState.zones[i].position.y + this.fieldStateDefinition.fieldState.zones[i].size.y) {
                  var tmp = deepcopy(this.fieldStateDefinition.fieldState.zones[i]);
                  tmp.isAllied = this.fieldStateDefinition.fieldState.zones[i].isAllied === this.matchState.isRed;
                  this.botStateDefinition.botState.currentZones.push(tmp);
                }
              }
            }
          }
        }
        else {
          var points = this.fieldStateDefinition.fieldState.zones[i].points;
          var bot = this.botStateDefinition.botState.position;
          var j = 0;
          var k = points.length - 1;
          var c = 0;
          while(j < points.length) {
            if(
              ((points[j].y > bot.y) !== (points[k].y > bot.y)) &&
              (bot.x < (points[k].x-points[j].x) * (bot.y-points[j].y) / (points[k].y-points[j].y) + points[j].x)
            ) {
              c = c > 0 ? 0 : 1;
            }
            k = j;
            j++;
          }
          if(c > 0) {
            var tmp = deepcopy(this.fieldStateDefinition.fieldState.zones[i]); // eslint-disable-line no-redeclare
            tmp.isAllied = this.fieldStateDefinition.fieldState.zones[i].isAllied === this.matchState.isRed;
            this.botStateDefinition.botState.currentZones.push(tmp);
          }
        }
      }

      //Run update functions found in state definitions instances
      this.gameStateDefinition.updateFunct(
        this.gameStateDefinition.gameState,
        this.fieldStateDefinition.fieldState,
        this.botStateDefinition.botState,
        this.gameStateDefinition.drawnElements
      );
      this.fieldStateDefinition.updateFunct(
        this.gameStateDefinition.gameState,
        this.fieldStateDefinition.fieldState,
        this.botStateDefinition.botState,
        this.fieldStateDefinition.drawnElements
      );
      this.botStateDefinition.updateFunct(
        this.gameStateDefinition.gameState,
        this.fieldStateDefinition.fieldState,
        this.botStateDefinition.botState,
        this.botStateDefinition.drawnElements
      );

      //Check and trigger events
      for(var i = 0;i < this.eventDefinitions.length;i++) { // eslint-disable-line no-redeclare
        var currWatcherState = this.eventDefinitions[i].watcherFunct(
          this.gameStateDefinition.gameState,
          this.fieldStateDefinition.fieldState,
          this.botStateDefinition.botState,
          this.buttonState
        );
        if(currWatcherState && !this.eventDefinitions[i].prevWatcherState) {
          console.info('[Record Engine] Event Triggered: ' + this.eventDefinitions[i].name);
          var emit = {
            position: this.getPositionObj()
          };
          Object.assign(emit, this.eventDefinitions[i].emitterFunct(
            this.gameStateDefinition.gameState,
            this.fieldStateDefinition.fieldState,
            this.botStateDefinition.botState,
            this.buttonState
          ));

          //Push triggered event to eventLog
          var newObj = deepcopy(this.eventDefinitions[i]);
          this.eventLog.push({
            id: newObj.id,
            name: newObj.name,
            variables: emit,
            timeStamp: this.botStateDefinition.botState.position.t
          });
        }
        this.eventDefinitions[i].prevWatcherState = currWatcherState;
      }

      //Push latest robot position to posLog
      var tmpPos = this.getPositionObj();
      tmpPos.timeStamp = this.botStateDefinition.botState.position.t;
      this.positionLog.push(tmpPos);

      //Update status
      this.statusUpdateDefinition.statusState = this.statusUpdateDefinition.updateFunct(
        this.gameStateDefinition.gameState,
        this.fieldStateDefinition.fieldState,
        this.botStateDefinition.botState
      );

      //Trigger buttonStack, renderCanvas, and controlBar update functions
      this.refs.buttonStack.update();
      this.refs.renderCanvas.update();
      this.refs.controlBar.update();
    }
  }
  getPositionObj() {
    var x = Math.round(this.botStateDefinition.botState.position.x);
    x = x < 0 ? 0 : x;
    x = x > this.fieldStateDefinition.fieldState.dimensions.x ? this.props.fieldStateDefinition.fieldState.dimensions.x : x;
    var y = Math.round(this.botStateDefinition.botState.position.y);
    y = y < 0 ? 0 : y;
    y = y > this.fieldStateDefinition.fieldState.dimensions.x ? this.props.fieldStateDefinition.fieldState.dimensions.x : y;
    return {
      x: x,
      y: y
    };
  }
  updateLoop() {
    this.update();
    if(this.engineState.playing) {
      setTimeout(this.updateLoop.bind(this), this.settings.updateInterval);
    }
  }
  resize() {
    var containerRect = this.refs.mainContainer.getBoundingClientRect();
    this.refs.mainContainer.style = 'height: ' + (window.innerHeight - containerRect.top - 1) + 'px';
    if(this.settings.buttonStackWidth !== this.state.buttonStackWidth) {
      this.setState({buttonStackWidth: this.settings.buttonStackWidth});
    }
    if(typeof this.refs.buttonStack !== 'undefined') {
      this.refs.buttonStack.resize();
    }
    if(typeof this.refs.renderCanvas !== 'undefined') {
      this.refs.renderCanvas.resize();
    }
  }
  start() {
    //Call this function to start the update loop, will reset eventLog and posLog
    if(this.engineState.initialized) {
      this.engineState.startDate = Date.now();
      this.engineState.currDate = Date.now();
      this.engineState.currTime = 0;
      this.eventLog = [];
      this.posLog = [];
      this.engineState.playing = true;
      this.engineState.played = true;
      this.setState({timestamp: 0});
      console.info('[Record Engine] Starting recording engine');
      this.updateLoop.bind(this)();
    }
  }
  stop() {
    //Call this function to stop the recording engine. Intended for restarting a recording session and this will erase information
    if(this.engineState.initialized) {
      console.info('[Record Engine] Stopping recording engine');
      this.init();
      this.refs.controlBar.reset();
    }
  }
  resume() {
    //Call this function to resume from a paused recording engine state
    if(this.engineState.initialized) {
      this.engineState.currDate = Date.now();
      this.engineState.playing = true;
      console.info('[Record Engine] Resuming recording engine');
      this.updateLoop.bind(this)();
    }
  }
  pause() {
    //Call this function to pause a recording session. Use this for ending the session for saving as it does not erase information
    if(this.engineState.initialized) {
      this.engineState.playing = false;
      this.setState({timestamp: this.engineState.currTime});
      console.info('[Record Engine] Pausing recording engine');
    }
  }
  close() {
    this.pause();
    console.info('[Record Engine] Exiting recording engine');
    if(typeof this.props.onClose === 'function') { setTimeout(this.props.onClose.bind(this), 500); }
  }
  save() {
    console.info('[Record Engine] Saving recording engine');
    Save.saveRecord(this.gameStateDefinition, this.matchState, this.engineState, this.eventLog, this.positionLog, this.close.bind(this));
  }
  componentDidMount() {
    this.init();
    this.resize();
    this.refs.controlBar.matchStateOpen();
    this.resizeListener = () => {
      this.resize();
      setTimeout(this.update.bind(this), 500);
    };
    window.addEventListener('resize', this.resizeListener);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }
  render() {
    return (
      <Box ref='mainContainer' style={{
        overflow: 'hidden',
        position: 'fixed'
      }}>
        <ControlBar
          ref='controlBar'
          play={this.start.bind(this)}
          stop={this.stop.bind(this)}
          resume={this.resume.bind(this)}
          pause={this.pause.bind(this)}

          close={this.close.bind(this)}
          save={this.save.bind(this)}
          matchStateUpdate={this.matchStateHandler.bind(this)}
          onMatchStateOpen={() => {this.setState({buttonStackFocus: false})}}
          onMatchStateClose={() => {this.setState({buttonStackFocus: true})}}
          settingsUpdate={this.settingsHandler.bind(this)}
          flipUpdate={this.flipHandler.bind(this)}

          time={this.state.timestamp}
          progress={((this.state.timestamp/this.gameStateDefinition.gameState.gameLength)*100)}

          colorPalette={this.colorPalette}
          status={this.statusUpdateDefinition}
          engineState={this.engineState}
          settings={this.settings}
        />
        <Grid container style={{height:'87%'}}>
          <Grid item style={{width: this.state.buttonStackWidth + '%', height:'100%'}} zeroMinWidth>
            <ButtonStack
              ref='buttonStack'
              colorPalette={this.colorPalette}
              gameStateDefinition={this.gameStateDefinition}
              fieldStateDefinition={this.fieldStateDefinition}
              botStateDefinition={this.botStateDefinition}
              eventDefinitions={this.eventDefinitions}
              buttonDefinitions={this.buttonDefinitions}
              buttonStackUpdate={this.buttonStackHandler.bind(this)}
              settings={this.settings}
              focused={this.state.buttonStackFocus}
            />
          </Grid>
          <Grid item style={{width: (100 - this.state.buttonStackWidth) + '%', height:'100%'}} zeroMinWidth>
            <RenderCanvas
              ref='renderCanvas'
              colorPalette={this.colorPalette}
              engineState={this.engineState}
              matchState={this.matchState}
              gameStateDefinition={this.gameStateDefinition}
              fieldStateDefinition={this.fieldStateDefinition}
              botStateDefinition={this.botStateDefinition}
              eventDefinitions={this.eventDefinitions}
              buttonDefinitions={this.buttonDefinitions}
              renderCanvasUpdate={this.renderCanvasHandler.bind(this)}
              settings={this.settings}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}
