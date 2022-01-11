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
import Box from '@material-ui/core/Box';
import { Close } from '@material-ui/icons';

import { DatePicker } from '@material-ui/pickers';

import TeamCard from 'uiTree/components/TeamCard';
import ColorSwitch from 'engine/record/RecordEngine/ControlBar/MatchState/ColorSwitch';

const moment = require('moment');

export default class MatchState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      matchStartDate: 0, //Could be different from engineState.startDate if scouting via video
      targetTeamNumber: -1,
      matchNumber: -1,
      matchType: 't', //t, pf, pm, qm, ef, qf, sf, f
      isRed: true,
      comments: ''
    };
  }
  open() {
    this.setState({open: true});
  }
  close() {
    if(typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
    this.setState({open: false});
  }
  matchStartDateHandler(date) {
    if(moment().isSame(date, 'day')) {
      this.setState({matchStartDate: 0});
    }
    else {
      this.setState({matchStartDate: date.valueOf()});
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
  commentsHandler(event) {
    this.setState({comments: event.target.value});
  }
  submit() {
    if(this.state.matchNumber > 0 && Number.isInteger(this.state.matchNumber)) {
      if(this.state.targetTeamNumber > 0 && Number.isInteger(this.state.targetTeamNumber)) {
        if(typeof this.props.submit !== 'undefined') {
          this.props.submit({
            matchStartDate: this.state.matchStartDate,
            targetTeamNumber: this.state.targetTeamNumber,
            matchNumber: this.state.matchNumber,
            matchType: this.state.matchType,
            isRed: this.state.isRed,
            comments: this.state.comments
          });
          this.close();
        }
      }
    }
    if(this.state.matchNumber === -1 || !Number.isInteger(this.state.matchNumber)) {
      this.setState({matchNumber: 0});
    }
    if(this.state.targetTeamNumber === -1 || !Number.isInteger(this.state.targetTeamNumber)) {
      this.setState({targetTeamNumber: 0});
    }
  }
  render() {
    return (
      <Dialog fullScreen open={this.state.open} onClose={this.close.bind(this)}>
        <AppBar position='fixed'>
          <Toolbar>
            <IconButton color='inherit' edge='start' onClick={this.close.bind(this)}>
              <Close />
            </IconButton>
            <Box mr={2} />
            <Typography variant='h6'>
              Edit Match Information
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
          <Grid container spacing={3}>
            <Grid item xs style={{minWidth: '200px'}}>
              <DatePicker
                variant='inline'
                autoOk={true}
                disableFuture={true}
                inputVariant='outlined'
                label='Match Date'
                fullWidth
                value={this.state.matchStartDate > 0 ? this.state.matchStartDate : (Date.now())}
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
                error={this.state.targetTeamNumber === 0 || this.state.targetTeamNumber < -1}
                value={this.state.targetTeamNumber <= 0 ? '' : this.state.targetTeamNumber}
                helperText={this.state.targetTeamNumber <= 0 ? 'Required' : ''}
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
                error={this.state.matchNumber === 0 || this.state.matchNumber < -1}
                value={this.state.matchNumber <= 0 ? '' : this.state.matchNumber}
                helperText={this.state.targetTeamNumber <= 0 ? 'Required' : ''}
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
                  label='Match Type'
                >
                  <MenuItem value='t'>Test</MenuItem>
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
              <ColorSwitch value={this.state.isRed} onChange={this.isRedHandler.bind(this)}/>
            </Grid>
            <Grid item xs={6} style={{minWidth: '250px'}}>
              <TextField
                ref='comments'
                variant='outlined'
                multiline
                fullWidth
                rowsMax='5'
                label='Comments'
                placeholder='Enter Comments Here'
                value={this.state.comments}
                onChange={this.commentsHandler.bind(this)}
              />
            </Grid>
            <Grid item xs={12}>
              <TeamCard teamNumber={this.state.targetTeamNumber} />
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    );
  }
}
