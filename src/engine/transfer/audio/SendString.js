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

export default class SendString extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      done: false,
      profile: 'hello-world'
    };
  }
  transmit() {
    quiet.addReadyCallback(() => {
     var transmit = quiet.transmitter(this.state.profile);
     transmit(quiet.str2ab(this.props.targetString), () => {
       this.setState({done: true, running: false});
     });
     this.setState({done: false, running: true});
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if(!prevState.running && this.state.running) {
      this.transmit();
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
                  Transmit Audio
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
