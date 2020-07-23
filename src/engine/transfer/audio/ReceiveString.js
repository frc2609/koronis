import React from 'react';

import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { ReactMic } from 'react-mic';

import ProfileSelector from 'engine/transfer/audio/ProfileSelector';

var quiet = require('quietjs-bundle');

export default class ReceiveString extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      done: false,
      error: false,
      bytes: 0,
      showMic: false,
      visualizerWidth: 600,
      profile: 'cable-64k'
    };
    this.listener = null;
    this.visualizerRef = React.createRef();
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
  refreshWidth() {
    var elem = this.visualizerRef.current;
    if(elem) {
      var style = getComputedStyle(elem);
      var width = elem.clientWidth - parseInt(style.paddingLeft) - parseInt(style.paddingRight);
      if(width !== this.state.visualizerWidth) {
        this.setState({visualizerWidth: width});
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    this.refreshWidth();
    return true;
  }
  componentDidMount() {
    this.refreshWidth();
  }
  render() {
    return (
      <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {this.state.running ?
              <LinearProgress variant='query' />
            :
              <Typography align='center'>
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
            <Typography align='center'>
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
          <Grid item xs={12} ref={this.visualizerRef}>
            <ReactMic record={this.state.showMic} onStop={()=>{}} width={this.state.visualizerWidth} />
          </Grid>
        </Grid>
      </Container>
    );
  }
}
