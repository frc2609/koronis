import React from 'react';

import * as Layout from 'config/Layout';
import * as Package from 'package/PackageCollector';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import CreateIcon from '@material-ui/icons/Create';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import SaveIcon from '@material-ui/icons/Save';

import { DatePicker } from '@material-ui/pickers';

import ProcessSelectModal from 'uiTree/components/ProcessSelectModal';

var deepcopy = require('deep-copy');

export default class ProcessCreationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      process: {},
      years: [],
      year: -1,
      name: '',
      title: '',
      description: '',
      queryType: '',
      dataType: ''
    };
  }
  openModal() {
    this.setState({openModal: true});
  }
  newDoc() {
    var emptyObj = {
      year: -1,
      name: '',
      title: '',
      description: '',
      queryType: '',
      dataType: ''
    };
    this.setState(emptyObj);
    if(typeof this.props.onNew === 'function') {this.props.onNew(emptyObj);}
  }
  save() {
    if(typeof this.props.onSave === 'function') {this.props.onSave();}
  }
  saveNew() {
    if(typeof this.props.onSaveNew === 'function') {this.props.onSaveNew();}
  }
  yearHandler(event) {this.setState({year: event.target.value});}
  nameHandler(event) {this.setState({name: event.target.value.replace(' ', '-').toLowerCase()});}
  titleHandler(event) {this.setState({title: event.target.value});}
  descriptionHandler(event) {this.setState({description: event.target.value});}
  queryTypeHandler(event) {this.setState({queryType: event.target.value});}
  dataTypeHandler(event) {this.setState({dataType: event.target.value});}
  getCreationObj() {
    return {
      year: this.state.year,
      name: this.state.name,
      title: this.state.title,
      description: this.state.description,
      queryType: this.state.queryType,
      dataType: this.state.dataType
    };
  }
  getProcessObj() {
    return this.state.process;
  }
  componentDidMount() {
    Package.getYears().then((val) => {
      this.setState({years: val});
    });
  }
  render() {
    return (
      <>
        <ProcessSelectModal
          open={this.state.openModal}
          onClose={() => {
            this.setState({openModal: false});
          }}
          onSelect={(processes) => {
            if(processes.length > 0) {
              var selectedProcess = deepcopy(processes[0].toJSON());
              delete selectedProcess._rev;
              this.setState({
                openModal: false,
                process: selectedProcess,
                name: selectedProcess.name,
                title: selectedProcess.title,
                description: selectedProcess.description,
                queryType: selectedProcess.queryType,
                dataType: selectedProcess.dataType
              });
              if(typeof this.props.onOpen === 'function') {this.props.onOpen(selectedProcess);}
            }
          }}
        />
        <Container maxWidth='xl' style={{marginBottom: '4vh'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ButtonGroup fullWidth>
                <Button onClick={this.openModal.bind(this)}>
                  <FolderOpenIcon />
                  Open
                </Button>
                <Button onClick={this.newDoc.bind(this)}>
                  <InsertDriveFileOutlinedIcon />
                  New
                </Button>
                <Button onClick={this.save.bind(this)}>
                  <SaveIcon />
                  Save
                </Button>
                <Button onClick={this.saveNew.bind(this)}>
                  <CreateIcon />
                  Save as New
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={Layout.isLandscape() ? 6 : 12}>
              <TextField
                label='Name'
                variant='outlined'
                margin='normal'
                value={this.state.name}
                onChange={this.nameHandler.bind(this)}
                fullWidth
              />
            </Grid>
            <Grid item xs={Layout.isLandscape() ? 6 : 12}>
              <TextField
                label='Title'
                variant='outlined'
                margin='normal'
                value={this.state.title}
                onChange={this.titleHandler.bind(this)}
                fullWidth
              />
            </Grid>
            <Grid item xs={Layout.isLandscape() ? 4 : 12}>
              <FormControl variant='outlined' margin='normal' fullWidth>
                <InputLabel>Year</InputLabel>
                <Select
                  onChange={this.yearHandler.bind(this)}
                  value={this.state.year}
                  variant='outlined'
                  fullWidth
                >
                <MenuItem key={-1} value={-1}><em>None</em></MenuItem>
                {(typeof this.state.years === 'undefined') ?
                  ''
                :
                  this.state.years.map(
                    (e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                    }
                  )
                }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={Layout.isLandscape() ? 4 : 12}>
              <FormControl variant='outlined' margin='normal' fullWidth>
                <InputLabel>Query Type</InputLabel>
                <Select
                  onChange={this.queryTypeHandler.bind(this)}
                  value={this.state.queryType}
                  variant='outlined'
                  fullWidth
                >
                  <MenuItem value='record'>Record</MenuItem>
                  <MenuItem value='match'>Match</MenuItem>
                  <MenuItem value='team'>Team</MenuItem>
                  <MenuItem value='event'>Event</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={Layout.isLandscape() ? 4 : 12}>
              <FormControl variant='outlined' margin='normal' fullWidth>
                <InputLabel>Data Type</InputLabel>
                <Select
                  onChange={this.dataTypeHandler.bind(this)}
                  value={this.state.dataType}
                  variant='outlined'
                  fullWidth
                >
                  <MenuItem value='metric'>Metric</MenuItem>
                  <MenuItem value='chart'>Chart</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Description'
              variant='outlined'
              margin='normal'
              multiline
              rows='2'
              value={this.state.description}
              onChange={this.descriptionHandler.bind(this)}
              fullWidth
            />
          </Grid>
        </Container>
      </>
    );
  }
}
