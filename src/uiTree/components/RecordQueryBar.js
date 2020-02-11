import React from 'react';

import * as Package from 'package/PackageCollector';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { DatePicker } from '@material-ui/pickers';

var store = require('store');

export default class RecordQueryBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: -1,
      gameStates: [],
      minStartDate: 0,
      maxStartDate: 0,
      teamNumber: 0,
      minMatchNumber: 0,
      maxMatchNumber: 0,
      matchTypesT: true,
      matchTypesPF: true,
      matchTypesPM: true,
      matchTypesQM: true,
      matchTypesEF: true,
      matchTypesQF: true,
      matchTypesSF: true,
      matchTypesF: true,
      isRed: true,
      isBlue: true,
      minLastModified: 0,
      maxLastModified: 0
    };
    if(typeof this.props.name === 'string') {
      var obj = store.get('query/' + this.props.name);
      if(typeof obj !== 'undefined') {
        Object.assign(this.state, obj);
      }
    }
    this.queryObj = {};
  }
  yearHandler(event) {
    this.setState({year: event.target.value});
  }
  getQueryObj() {
    this.queryObj = {};
    var obj = this.state;
    if(obj.isBlue !== obj.isRed) {
      this.queryObj.isRedAlliance = obj.isRed;
    }
    var orArr = [];
    if(obj.matchTypesT) {orArr.push({matchType: {'$eq':'t'}});}
    if(obj.matchTypesPF) {orArr.push({matchType: {'$eq':'pf'}});}
    if(obj.matchTypesPM) {orArr.push({matchType: {'$eq':'pm'}});}
    if(obj.matchTypesQM) {orArr.push({matchType: {'$eq':'qm'}});}
    if(obj.matchTypesEF) {orArr.push({matchType: {'$eq':'ef'}});}
    if(obj.matchTypesQF) {orArr.push({matchType: {'$eq':'qf'}});}
    if(obj.matchTypesSF) {orArr.push({matchType: {'$eq':'sf'}});}
    if(obj.matchTypesF) {orArr.push({matchType: {'$eq': 'f'}});}
    if(orArr.length > 0) {this.queryObj['$or'] = orArr;}
    if(obj.maxLastModified > 0) {
      this.queryObj.lastModified = {};
      Object.assign(this.queryObj.lastModified,{'$lte': obj.maxLastModified});
    }
    if(obj.minLastModified > 0) {
      this.queryObj.lastModified = {};
      Object.assign(this.queryObj.lastModified,{'$gte': obj.minLastModified});
    }
    if(obj.maxStartDate > 0) {
      this.queryObj.startDate = {};
      Object.assign(this.queryObj.startDate, {'$lte': obj.maxStartDate});
    }
    if(obj.minStartDate > 0) {
      this.queryObj.startDate = {};
      Object.assign(this.queryObj.startDate, {'$gte': obj.minStartDate});
    }
    if(obj.maxMatchNumber > 0) {
      this.queryObj.matchNumber = {};
      Object.assign(this.queryObj.matchNumber, {'$lte': obj.maxMatchNumber});
    }
    if(obj.minMatchNumber > 0) {
      this.queryObj.matchNumber = {};
      Object.assign(this.queryObj.matchNumber, {'$gte': obj.minMatchNumber});
    }
    if(obj.teamNumber > 0) {this.queryObj.teamNumber = obj.teamNumber;}
    if(obj.year >= 0) {this.queryObj.year = obj.year;}
    this.setStore(obj);
    return this.queryObj;
  }
  setStore(obj) {
    if(typeof this.props.name === 'string') {
      var newobj = {
        year: obj.year,
        minStartDate: obj.minStartDate,
        maxStartDate: obj.maxStartDate,
        teamNumber: obj.teamNumber,
        minMatchNumber: obj.minMatchNumber,
        maxMatchNumber: obj.maxMatchNumber,
        matchTypesT: obj.matchTypesT,
        matchTypesPF: obj.matchTypesPF,
        matchTypesPM: obj.matchTypesPM,
        matchTypesQM: obj.matchTypesQM,
        matchTypesEF: obj.matchTypesEF,
        matchTypesQF: obj.matchTypesQF,
        matchTypesSF: obj.matchTypesSF,
        matchTypesF: obj.matchTypesF,
        isRed: obj.isRed,
        isBlue: obj.isBlue,
        minLastModified: obj.minLastModified,
        maxLastModified: obj.minLastModified
      };
      store.set('query/' + this.props.name, newobj)
    }
  }
  getStore() {
    if(typeof this.props.name === 'string') {
      var obj = store.get('query/' + this.props.name);
      if(typeof obj !== 'undefined') {
        this.setState(obj);
      }
    }
  }
  setDefault() {
    var obj = {
      year: -1,
      minStartDate: 0,
      maxStartDate: 0,
      teamNumber: 0,
      minMatchNumber: 0,
      maxMatchNumber: 0,
      matchTypesT: true,
      matchTypesPF: true,
      matchTypesPM: true,
      matchTypesQM: true,
      matchTypesEF: true,
      matchTypesQF: true,
      matchTypesSF: true,
      matchTypesF: true,
      isRed: true,
      isBlue: true,
      minLastModified: 0,
      maxLastModified: 0
    }
    if(typeof this.props.defaults !== 'undefined') {Object.assign(obj, this.props.defaults);}
    this.setStore(obj);
    this.refresh();
  }
  submit() {
    if(typeof this.props.onSubmit === 'function') {this.props.onSubmit(this.getQueryObj());}
  }
  minStartDateChangeHandler(date) {this.setState({minStartDate: date.unix()});}
  minStartDateOpenHandler() {this.setState({minStartDate: 0});}
  maxStartDateChangeHandler(date) {this.setState({maxStartDate: date.unix()});}
  maxStartDateOpenHandler() {this.setState({maxStartDate: 0});}
  minLastModifiedChangeHandler(date) {this.setState({minLastModified: date.unix()});}
  minLastModifiedOpenHandler() {this.setState({minLastModified: 0});}
  maxLastModifiedChangeHandler(date) {this.setState({maxLastModified: date.unix()});}
  maxLastModifiedOpenHandler() {this.setState({maxLastModified: 0});}
  minMatchNumberHandler(event) {this.setState({minMatchNumber: Math.round(event.target.value)});}
  maxMatchNumberHandler(event) {this.setState({maxMatchNumber: Math.round(event.target.value)});}
  teamNumberHandler(event) {this.setState({teamNumber: Math.round(event.target.value)});}
  refresh() {
    this.getStore();
    Package.getGameStates().then((results) => {
      this.setState({gameStates: results});
    });
  }
  componentDidMount() {
    this.refresh();
  }
  render() {
    return (
      <ExpansionPanel style={{marginBottom: '4vh'}}>
        <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
        >
        <Typography>Filter</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Grid container>
        <Grid container item xs={12} spacing={2} style={{marginBottom: '4vh'}}>
        <Grid item xs={3} style={{minWidth: '150px'}}>
          <FormControl variant='outlined' fullWidth>
            <InputLabel>Year</InputLabel>
            <Select
      ref='year'
      onChange={this.yearHandler.bind(this)}
      value={this.state.year}
      fullWidth
            >
            <MenuItem key={-1} value={-1}><em>None</em></MenuItem>
            {(typeof this.state.gameStates === 'undefined') ? '' :
              this.state.gameStates.map((e, i) => {
                return <MenuItem key={i} value={e.year}>{e.year + ' ' + e.nickname}</MenuItem>
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} style={{minWidth: '210px'}}>
          <TextField
      ref='teamNumber'
      label='Team Number'
      type='number'
      variant='outlined'
      fullWidth
      value={this.state.teamNumber === 0 ? '' : this.state.teamNumber}
      onChange={this.teamNumberHandler.bind(this)}
          />
        </Grid>
        <Grid item xs={3} style={{minWidth: '200px'}}>
          <DatePicker
      variant='inline'
      autoOk={true}
      inputVariant='outlined'
      label='Earliest Match Date'
      fullWidth
      value={this.state.minStartDate*1000}
      labelFunc={(date) => {return (this.state.minStartDate === 0 ? 'No date selected' : date.format('ddd, MMM Do YYYY'))}}
      onChange={this.minStartDateChangeHandler.bind(this)}
      onOpen={this.minStartDateOpenHandler.bind(this)}
          />
        </Grid>
        <Grid item xs={3} style={{minWidth: '200px'}}>
          <DatePicker
      variant='inline'
      autoOk={true}
      inputVariant='outlined'
      label='Latest Match Date'
      fullWidth
      value={this.state.maxStartDate*1000}
      labelFunc={(date) => {return (this.state.maxStartDate === 0 ? 'No date selected' : date.format('ddd, MMM Do YYYY'))}}
      onChange={this.maxStartDateChangeHandler.bind(this)}
      onOpen={this.maxStartDateOpenHandler.bind(this)}
          />
        </Grid>
        <Grid item xs={3} style={{minWidth: '200px'}}>
          <FormGroup>
            <FormLabel>Match Types</FormLabel>
            <FormControlLabel
      control={<Checkbox color='primary' checked={this.state.matchTypesT} onChange={(e) => {this.setState({matchTypesT: e.target.checked})}}/>}
      label='Test'
            />
            <FormControlLabel
      control={<Checkbox color='primary' checked={this.state.matchTypesPF} onChange={(e) => {this.setState({matchTypesPF: e.target.checked})}}/>}
      label='Practice Field'
            />
            <FormControlLabel
      control={<Checkbox color='primary' checked={this.state.matchTypesPM} onChange={(e) => {this.setState({matchTypesPM: e.target.checked})}}/>}
      label='Practice Match'
            />
            <FormControlLabel
      control={<Checkbox color='primary' checked={this.state.matchTypesQM} onChange={(e) => {this.setState({matchTypesQM: e.target.checked})}}/>}
      label='Qualifications'
            />
            <FormControlLabel
      control={<Checkbox color='primary' checked={this.state.matchTypesEF} onChange={(e) => {this.setState({matchTypesEF: e.target.checked})}}/>}
      label='Eighth-finals'
            />
            <FormControlLabel
      control={<Checkbox color='primary' checked={this.state.matchTypesQF} onChange={(e) => {this.setState({matchTypesQF: e.target.checked})}}/>}
      label='Quarterfinals'
            />
            <FormControlLabel
      control={<Checkbox color='primary' checked={this.state.matchTypesSF} onChange={(e) => {this.setState({matchTypesSF: e.target.checked})}}/>}
      label='Semifinals'
            />
            <FormControlLabel
      control={<Checkbox color='primary' checked={this.state.matchTypesF} onChange={(e) => {this.setState({matchTypesF: e.target.checked})}}/>}
      label='Finals'
            />
          </FormGroup>
        </Grid>
        <Grid item xs={4} style={{minWidth: '210px'}}>
          <TextField
      ref='minMatchNumber'
      label='Lowest Match Number'
      type='number'
      variant='outlined'
      fullWidth
      value={this.state.minMatchNumber === 0 ? '' : this.state.minMatchNumber}
      onChange={this.minMatchNumberHandler.bind(this)}
          />
        </Grid>
        <Grid item xs={4} style={{minWidth: '210px'}}>
          <TextField
      ref='maxMatchNumber'
      label='Highest Match Number'
      type='number'
      variant='outlined'
      fullWidth
      value={this.state.maxMatchNumber === 0 ? '' : this.state.maxMatchNumber}
      onChange={this.maxMatchNumberHandler.bind(this)}
          />
        </Grid>
        <Grid item xs={3} style={{minWidth: '200px'}}>
          <FormGroup>
            <FormLabel>Match Types</FormLabel>
            <FormControlLabel
      control={<Checkbox color='primary' checked={this.state.isBlue} onChange={(e) => {this.setState({isBlue: e.target.checked})}}/>}
      label='Blue Alliance'
            />
            <FormControlLabel
      control={<Checkbox color='secondary' checked={this.state.isRed} onChange={(e) => {this.setState({isRed: e.target.checked})}}/>}
      label='Red Alliance'
            />
          </FormGroup>
        </Grid>
        <Grid item xs={3} style={{minWidth: '220px'}}>
          <DatePicker
      variant='inline'
      autoOk={true}
      inputVariant='outlined'
      label='Earliest Modification Date'
      fullWidth
      value={this.state.minLastModified*1000}
      labelFunc={(date) => {return (this.state.minLastModified === 0 ? 'No date selected' : date.format('ddd, MMM Do YYYY'))}}
      onChange={this.minLastModifiedChangeHandler.bind(this)}
      onOpen={this.minLastModifiedOpenHandler.bind(this)}
          />
        </Grid>
        <Grid item xs={3} style={{minWidth: '200px'}}>
          <DatePicker
      variant='inline'
      autoOk={true}
      inputVariant='outlined'
      label='Latest Modification Date'
      fullWidth
      value={this.state.maxLastModified*1000}
      labelFunc={(date) => {return (this.state.maxLastModified === 0 ? 'No date selected' : date.format('ddd, MMM Do YYYY'))}}
      onChange={this.maxLastModifiedChangeHandler.bind(this)}
      onOpen={this.maxLastModifiedOpenHandler.bind(this)}
          />
        </Grid>
        </Grid>
        {this.props.button ?
        <Grid container item xs={12} spacing={2}>
        <Grid item xs={6}>
          <Button variant='outlined' onClick={this.setDefault.bind(this)}>Default</Button>
        </Grid>
        <Grid item xs={6}>
          <Button color='primary' variant='outlined' onClick={this.submit.bind(this)}>Run</Button>
        </Grid>
         </Grid> : ''}
        </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
