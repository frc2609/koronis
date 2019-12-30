import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { Close, Save } from '@material-ui/icons';

import { DatePicker } from '@material-ui/pickers';

import ColorSwitch from 'engine/record/RecordEngine/ControlBar/MatchState/ColorSwitch';

var moment = require('moment');

export default class MatchState extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      open: false,
      matchStartDate: 0, //Could be different from engineState.startDate if scouting via video
      targetTeamNumber: -1,
      matchNumber: -1,
      matchType: 't', //t, pf, pm, qm, ef, qf, sf, f
      isRed: true
    };
  }
  open() {
    this.setState({open: true});
  }
  close() {
    this.setState({open: false});
  }
  matchStartDateHandler(date) {
    if(moment().isSame(date, 'day')) {
      this.setState({matchStartDate: 0});
    }
    else {
      this.setState({matchStartDate: date.unix()});
    }
  }
  targetTeamNumberHandler(event) {
    this.setState({targetTeamNumber: Number(event.target.value)});
  }
  matchNumberHandler(event) {
    this.setState({matchNumber: Number(event.target.value)});
  }
  matchTypeHandler(event) {
    this.setState({matchType: event.target.value});
  }
  isRedHandler(event) {
    this.setState({isRed: event.target.checked});
  }
  submit() {
    if(this.state.matchNumber > 0) {
      if(this.state.targetTeamNumber > 0) {
        if(typeof this.props.submit != 'undefined') {
          this.props.submit({
            matchStartDate: this.state.matchStartDate,
            targetTeamNumber: this.state.targetTeamNumber,
            matchNumber: this.state.matchNumber,
            matchType: this.state.matchType,
            isRed: this.state.isRed
          });
          this.setState({open: false});
        }
      }
    }
    if(this.state.matchNumber == -1) {
      this.setState({matchNumber: 0});
    }
    if(this.state.targetTeamNumber == -1) {
      this.setState({targetTeamNumber: 0});
    }
  }
  render() {
    return (
      <Dialog fullScreen open={this.state.open} onClose={this.close.bind(this)}>
        <AppBar position='static' style={{
          marginBottom: '3vh'
        }}>
          <Toolbar>
            <IconButton color='inherit' edge='start' onClick={this.close.bind(this)} style={{
              marginRight: '4vw'
            }}>
              <Close />
            </IconButton>
            <Typography variant='h6' style={{
              flexGrow: 1
            }}>
              Edit Match Information
            </Typography>
            <Button color='inherit' onClick={this.submit.bind(this)}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
        <Grid container spacing={3}>
          <Grid item xs style={{minWidth: '200px'}}>
          <DatePicker
      variant='inline'
      autoOk={true}
      disableFuture={true}
      inputVariant='outlined'
      label='Match Date'
      fullWidth
      value={this.state.matchStartDate > 0 ? (this.state.matchStartDate * 1000) : (new Date())}
      onChange={this.matchStartDateHandler.bind(this)}
          />
          </Grid>
          <Grid item xs={6} style={{minWidth: '200px'}}>        
          <TextField
      ref='targetTeamNumber'
      label='Robot Team Number'
      type='number'
      variant='outlined'
      fullWidth
      error={this.state.targetTeamNumber == 0 || this.state.targetTeamNumber < -1}
      value={this.state.targetTeamNumber <= 0 ? '' : this.state.targetTeamNumber}
      helperText={this.state.targetTeam <= 0 ? 'Required' : ''}
      onChange={this.targetTeamNumberHandler.bind(this)}
          />
          </Grid>
          <Grid item xs={6} style={{minWidth: '150px'}}>
          <TextField
      ref='matchNumber'
      label='Match Number'
      type='number'
      variant='outlined'
      fullWidth
      error={this.state.matchNumber == 0 || this.state.matchNumber < -1}
      value={this.state.matchNumber <= 0 ? '' : this.state.matchNumber}
      helperText={this.state.targetTeam <= 0 ? 'Required' : ''}
      onChange={this.matchNumberHandler.bind(this)}
          />
          </Grid>
          <Grid item xs={6} style={{minWidth: '200px'}}>
            <FormControl variant='outlined' fullWidth>
              <InputLabel>Match Type</InputLabel>
              <Select
      ref='matchType'
      onChange={this.matchTypeHandler.bind(this)}
      value={this.state.matchType}
      fullWidth
              >
                <MenuItem value='t'>Test</MenuItem>//t, pf, pm, qm, ef, qf, sf, f
                <MenuItem value='pf'>Practice Field</MenuItem>
                <MenuItem value='pm'>Practice Match</MenuItem>
                <MenuItem value='qm'>Qualification</MenuItem>
                <MenuItem value='ef'>Eighth-finals</MenuItem>
                <MenuItem value='qf'>Quarterfinals</MenuItem>
                <MenuItem value='sf'>Semifinals</MenuItem>
                <MenuItem value='f'>Final</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} style={{minWidth: '150px'}}>
            <FormControl variant='outlined' fullWidth>
              <InputLabel shrink>Alliance</InputLabel>
            </FormControl>
            <ColorSwitch onChange={this.isRedHandler.bind(this)}/>
          </Grid>
        </Grid>
        </Container>
      </Dialog>
    )
  }
}
