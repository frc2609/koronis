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

var quiet = require('quietjs-bundle');
var raf = require('raf');

export default class ReceiveString extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      done: false,
      profile: 'hello-world'
    };
    this.scanner = null;
    this.init();
  }
  listen() {
    quiet.addReadyCallback(() => {
     var listen = quiet.receiver(this.state.profile);
     quiet.receiver(this.state.profile, (p) => {
       var data = quiet.ab2str(p);
       this.setState({done: true, running: false});
       if(typeof this.props.onFinish === 'function') {this.props.onFinish(data);}
     }, () => {
       this.setState({done: false, running: false});
     }, () => {
       this.setState({done: false, running: false});
     });
     this.setState({done: false, running: true});
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if(!prevState.running && this.state.running) {
      this.listen();
    }
  }
  render() {
    return (
      <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{marginBottom: '2vh'}}>
            <div ref='qrcodeCanvasWrapper' style={{width: '100%', marginBottom: '2vh'}}>
              {this.state.running ?
                <LinearProgress variant='query' />
              :
                <Typography gutterBottom>
                  {this.state.done ? 'Sent' : 'Ready'}
                </Typography>
              }
            </div>
          </Grid>
          <Grid item xs={12} style={{marginBottom: '2vh'}}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
              </Grid>
              <Grid item xs={12}>
                <Button color='primary'
                  onClick={() => {
                    this.setState({running: true});
                  }}
                  disabled={this.state.running}
                  fullWidth
                >
                  Start Listening
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
