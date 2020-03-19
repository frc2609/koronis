import React from 'react';

import * as Layout from 'config/Layout';
import * as StringConversion from 'engine/transfer/StringConversion';

import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { ReactMic } from 'react-mic';

import ProfileSelector from 'engine/transfer/audio/ProfileSelector';

var quiet = require('quietjs-bundle');
var raf = require('raf');

export default class ReceiveString extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      done: false,
      error: false,
      bytes: 0,
      showMic: false,
      profile: 'audible'
    };
    this.listener = null;
    this.content = new ArrayBuffer(0);
  }
  listen() {
    quiet.addReadyCallback(() => {
     this.listener = quiet.receiver({
       profile: this.state.profile,
       onReceive: (p) => {
         this.content = quiet.mergeab(this.content, p);
         var data = quiet.ab2str(this.content);
         this.setState({bytes: data.length});
       },
       onCreateFail: () => {
         this.stop();
       },
       onReceiveFail: () => {
         this.setState({error: true});
         this.stop();
       }
     });
     this.setState({error: false, done: false, running: true, showMic: false, bytes: 0});
    });
  }
  finish() {
    if(!this.state.error) {
      var data = quiet.ab2str(this.content);
      this.setState({bytes: data.length});
      if(typeof this.props.onFinish === 'function') {this.props.onFinish(data);}
    }
    this.stop();
  }
  stop() {
    if(this.listener !== null) {
      this.listener.destroy();
    }
    this.content = new ArrayBuffer(0);
    this.setState({done: true, running: false, showMic: false});
  }
  render() {
    return (
      <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {this.state.running ?
              <LinearProgress variant='query' />
            :
              <Typography>
                {this.state.done ?
                  this.state.error ?
                    'Error in transmission, try again'
                  :
                    'Received'
                :
                  'Ready'
                }
              </Typography>
            }
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {this.state.bytes + ' bytes transferred'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ProfileSelector value={this.state.profile} onChange={(e) => {this.setState({profile: e.target.value})}} />
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup fullWidth>
              <Button color='primary'
                onClick={() => {
                  if(this.state.running) {
                    this.finish();
                  }
                  else {
                    this.listen();
                  }
                }}
              >
                {this.state.running ?
                  'Finish'
                :
                  'Start Listening'
                }
              </Button>
              <Button
                onClick={this.stop.bind(this)}
                disabled={!this.state.running}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup fullWidth>
              <Button
                onClick={() => {
                  this.setState({showMic: !this.state.showMic});
                }}
                disabled={this.state.running}
              >
                {this.state.showMic ?
                  'Stop Testing Mic'
                :
                  'Test Mic'
                }
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <ReactMic record={this.state.showMic} onStop={()=>{}} />
          </Grid>
        </Grid>
      </Container>
    );
  }
}
