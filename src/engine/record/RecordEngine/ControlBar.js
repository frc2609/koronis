import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import LinearProgress from '@material-ui/core/LinearProgress';

import { Pause, PlayArrow, Replay, Close, Save, Create, Flip } from '@material-ui/icons';
import SettingsIcon from '@material-ui/icons/Settings';

import MatchState from 'engine/record/RecordEngine/ControlBar/MatchState';
import Settings from 'engine/record/RecordEngine/ControlBar/Settings';

export default class ControlBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      played: false,
      playing: false,
      completeInfo: false,
      status: []
    };
  }
  reset() {
    this.setState({completeInfo: false});
  }
  start() {
    if(this.state.playing) {
      this.setState({playing: false});
      this.props.pause();
    }
    else {
      if(this.state.played) {
        this.setState({playing: true});
        this.props.resume();
      }
      else {
        this.setState({playing: true, played: true});
        this.props.play();
      }
    }
  }
  stop() {
    if(this.state.played) {
      this.setState({played: false, playing: false});
      this.props.stop();
    }
    else {
      this.setState({played: false, playing: false});
      this.props.close();
    }
  }
  save() {
    if(this.state.completeInfo) {
      this.props.save();
    }
    else {
      this.matchStateOpen();
    }
  }
  flipUpdate() {
    this.props.flipUpdate(!this.props.engineState.flip);
  }
  matchStateOpen() {
    if(typeof this.props.onMatchStateOpen === 'function') {
      this.props.onMatchStateOpen();
    }
    this.refs.matchState.open();
  }
  settings() {
    this.refs.settings.open();
  }
  matchStateHandler(mS) {
    this.props.matchStateUpdate(mS);
    this.setState({completeInfo: true});
  }
  update() {
    this.setState({status: this.props.status.statusState});
  }
  keyUp(event) {
    if(event.key === ' ') {
      this.start();
      event.preventDefault();
    }
  }
  componentDidMount() {
    this.keyUpListener = this.keyUp.bind(this);
    window.addEventListener('keyup', this.keyUpListener);
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyUpListener);
  }
  render() {
    return (
      <Box style={{height:'12.5%'}}>
        <MatchState ref='matchState'
          submit={this.matchStateHandler.bind(this)}
          onClose={() => {
            if(typeof this.props.onMatchStateClose === 'function') {
              this.props.onMatchStateClose();
            }
          }}
        />
        <Settings ref='settings' submit={this.props.settingsUpdate.bind(this)}/>
        <ButtonGroup style={{height:'93%'}} variant='outlined' fullWidth>
          <Button style={{height:'100%'}} onClick={this.flipUpdate.bind(this)} color='primary'>
            <Flip />
          </Button>
          {(typeof this.state.status === 'undefined') ?
            ''
          :
            this.state.status.map((e, i) => {
              let colorPaletteArr = this.props.colorPalette[e.style.palette]
              let fill = colorPaletteArr[colorPaletteArr.findIndex((p) => {return p.name === e.style.fill;})].hex;
              let outline = colorPaletteArr[colorPaletteArr.findIndex((p) => {return p.name === e.style.outline;})].hex;
              let text = colorPaletteArr[colorPaletteArr.findIndex((p) => {return p.name === e.style.text;})].hex;
              return (
                <Button
                  key={i}
                  style={{
                    height:'100%',
                    backgroundColor: fill,
                    borderColor: outline,
                    color: text
                  }}
                  disableRipple={true}
                  disableFocusRipple={true}
                >
                  {e.title}
                </Button>
              );
            })
          }
          <Button style={{height:'100%'}} color='default' disableRipple={true} disableFocusRipple={true}>
            {this.props.time.toFixed(2)}
          </Button>
          <Button style={{height:'100%'}} onClick={this.start.bind(this)} color='primary'>
            {this.state.playing ? <Pause /> : <PlayArrow />}
          </Button>
          <Button style={{height:'100%'}} onClick={this.matchStateOpen.bind(this)} color='default'>
            <Create />
          </Button>
          {this.state.completeInfo ?
            <Button style={{height:'100%'}} onClick={this.save.bind(this)} color='default'>
              <Save />
            </Button>
          :
            ''
          }
          <Button style={{height:'100%'}} onClick={this.settings.bind(this)} color='default'>
            <SettingsIcon />
          </Button>
          {this.state.playing ?
            ''
          :
            <Button style={{height:'100%'}} onClick={this.stop.bind(this)} color='secondary'>
              {this.state.played ?
                <Replay />
              :
                <Close />
              }
            </Button>
          }
        </ButtonGroup>
        <LinearProgress variant='determinate'
          value={(this.props.progress > 100) ?
            100
          :
            this.props.progress
          }
          color={(this.props.progress > 100) ?
            'secondary'
          :
            'primary'
          }
        />
      </Box>
    );
  }
}
