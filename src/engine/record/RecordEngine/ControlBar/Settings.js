import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Dialog from '@material-ui/core/Dialog';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Close } from '@material-ui/icons';

import * as Package from 'sync/package/PackageCollector';

var store = require('store');

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      currentYear: 0,
      gameStates: [],
      buttonStackWidth: 30,
      updateInterval: (1000/15)
    };
    if(typeof store.get('settings/currentYear') !== 'undefined') {
      this.state.currentYear = store.get('settings/currentYear');
    }
    if(typeof store.get('record/settings/buttonStackWidth') !== 'undefined') {
      this.state.buttonStackWidth = store.get('record/settings/buttonStackWidth');
    }
    if(typeof store.get('record/settings/updateInterval') !== 'undefined') {
      this.state.updateInterval = store.get('record/settings/updateInterval');
    }
  }
  open() {
    this.setState({open: true});
    Package.getYears().then((results) => {
      this.setState({availableYears: results});
    });
  }
  close() {
    this.setState({open: false});
  }
  buttonStackWidthHandler(event, value) {
    this.setState({buttonStackWidth: value});
  }
  updateIntervalHandler(event, value) {
    this.setState({updateInterval: (1000/value)});
  }
  submit() {
    store.set('record/settings/buttonStackWidth', this.state.buttonStackWidth);
    store.set('record/settings/updateInterval', this.state.updateInterval);
    if(typeof this.props.submit !== 'undefined') {
      this.props.submit({
        currentYear: this.state.currentYear,
        buttonStackWidth: this.state.buttonStackWidth,
        updateInterval: this.state.updateInterval
      });
      this.setState({open: false});
    }
  }
  refresh() {
    Package.getGameStates().then((results) => {
      this.setState({gameStates: results});
    });
  }
  componentDidMount() {
    this.refresh();
  }
  render() {
    return (
      <Dialog fullScreen open={this.state.open} onClose={this.close.bind(this)}>
        <AppBar position='fixed'>
          <Toolbar>
            <Box mr={2}>
              <IconButton color='inherit' edge='start' onClick={this.close.bind(this)}>
                <Close />
              </IconButton>
            </Box>
            <Typography variant='h6'>
              Edit Settings
            </Typography>
            <Box flexGrow={1} />
            <Button color='inherit' onClick={this.submit.bind(this)}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Box mb={3}>
          <Toolbar />
        </Box>
        <Container maxWidth='xl'>
          <Grid container spacing={4}>
            <Grid item xs={6} style={{minWidth: '150px'}}>
              <Typography gutterBottom>
                Button Stack Width
              </Typography>
              <Slider
                value={this.state.buttonStackWidth}
                onChange={this.buttonStackWidthHandler.bind(this)}
                valueLabelDisplay='auto'
                valueLabelFormat={(val) => {return val + '%'}}
                min={10}
                max={90}
              />
            </Grid>
            <Grid item xs={6} style={{minWidth: '320px'}}>
              <Typography gutterBottom>
                Frames Per Second
              </Typography>
              <Slider
                value={(1000/this.state.updateInterval)}
                onChange={this.updateIntervalHandler.bind(this)}
                valueLabelDisplay='auto'
                valueLabelFormat={(val) => {return val.toFixed(0)}}
                marks={[
                  { value: 15, label: 'Power Saver' },
                  { value: 50, label: 'Performance' }
                ]}
                step={5}
                min={5}
                max={60}
              />
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    );
  }
}
