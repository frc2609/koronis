import React from 'react';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

var store = require('store');

export default class SettingsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  defaultValue() {
    store.set('settings' + this.props.path, this.props.defaultValue);
  }
  valueHandler(val) {
    store.set('settings' + this.props.path, val);
    this.setState({value: val});
  }
  refresh() {
    var val = store.get('settings' + this.props.path);
    if(typeof val === 'undefined') {
      this.defaultValue();
      val = this.props.defaultValue;
    }
    console.debug(val)
    this.setState({value: val});
  }
  componentDidMount() {
    this.refresh();
  }
  render() {
    return (
      <Grid item xs={6}>
        {this.props.type === 'switch' ?
          ''
        : this.props.type === 'text' ?
          <TextField
            label={this.props.title}
            variant='outlined'
            margin='normal'
            value={this.state.value}
            onChange={(e) => {
              this.valueHandler(e.target.value);
            }}
            fullWidth
          />
        : this.props.type === 'dropdown' ?
          <FormControl variant='outlined' margin='normal' fullWidth>
            <InputLabel>{this.props.title}</InputLabel>
            <Select
              onChange={(e) => {
                this.valueHandler(e.target.value);
              }}
              value={this.state.value}
              fullWidth
            >
              {this.props.children}
            </Select>
          </FormControl>
        :
          ''
        }
      </Grid>
    );
  }
}
