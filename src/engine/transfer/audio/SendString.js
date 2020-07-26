import React from 'react';

import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ProfileSelector from 'engine/transfer/audio/ProfileSelector';

var quiet = require('quietjs-bundle-cli');

export default class SendString extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      done: false,
      profile: 'cable-64k'
    };
    this.transmitter = null;
  }
  transmit() {
    quiet.addReadyCallback(() => {
     this.transmitter = quiet.transmitter({
       profile: this.state.profile,
       onFinish: () => {
         this.setState({done: true, running: false});
       }
     });
     this.transmitter.transmit(quiet.str2ab(this.props.targetString));
     this.setState({done: false, running: true});
    });
  }
  stop() {
    if(this.transmitter !== null) {
      this.transmitter.destroy();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(!prevState.running && this.state.running) {
      this.transmit.bind(this)();
    }
    if(prevState.running && !this.state.running) {
      this.stop();
    }
  }
  render() {
    return (
      <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {this.state.running ?
              <LinearProgress />
            :
              <Typography align='center'>
                {this.state.done ? 'Sent' : 'Ready'}
              </Typography>
            }
          </Grid>
          {typeof this.props.targetString !== 'undefined' ?
            <Grid item xs={12}>
              <Typography align='center'>
                {this.props.targetString.length + ' bytes to transfer'}
              </Typography>
            </Grid>
          :
            <></>
          }
          <Grid item xs={12}>
            <ProfileSelector value={this.state.profile} onChange={(e) => {this.setState({profile: e.target.value})}} />
          </Grid>
          <Grid item xs={12}>
            <Button color='primary'
              onClick={() => {
                this.setState({running: !this.state.running});
              }}
              fullWidth
            >
              {this.state.running ?
                'Stop'
              :
                'Transmit Audio'
              }
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
