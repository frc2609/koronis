import React from 'react';

import * as Interface from 'db/Interface';
import * as Layout from 'config/Layout';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { DatePicker } from '@material-ui/pickers';

var store = require('store');

export default class ProcessCreationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processes: [],
      name: '',
      description: ''
    };
  }
  componentDidMount() {
    Interface.getProcesses({}, {lastModified: 'desc'}).then((docs) => {
      this.setState({processes: docs});
    });
  }
  render() {
    return (
      <Container style={{marginBottom: '4vh'}}>
      <Grid>
        <Grid item xs={Layout.isLandscape() ? 6 : 12} style={{minWidth: '300px'}}>
          <Autocomplete
            freeSolo
            value={this.state.name}
            select
            variant='outlined'
            options={this.state.processes.map(option => option.name)}
            renderInput={params => (
              <TextField
                {...params}
                label="Name"
                margin="normal"
                variant="outlined"
                fullWidth
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          />
        </Grid>
      </Grid>
      </Container>
    );
  }
}
