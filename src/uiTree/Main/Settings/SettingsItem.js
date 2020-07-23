import React from 'react';

import * as Layout from 'config/Layout';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
  valueHandler(val) {
    store.set('settings' + this.props.path, val);
    this.setState({value: val});
    if(typeof this.props.onChange === 'function') {
      this.props.onChange(val);
    }
  }
  refresh() {
    this.setState({value: store.get('settings' + this.props.path)});
  }
  componentDidMount() {
    this.refresh();
  }
  render() {
    return (
      <Grid item xs={Layout.isLarge() || Layout.isLandscape() ? 6 : 12}>
        {this.props.type === 'switch' ?
          <FormGroup row
            variant='outlined'
          >
            <FormControlLabel
              control={
                <Switch
                  checked={String(this.state.value) === 'true'}
                  onChange={(e) => {
                    this.valueHandler(String(e.target.checked));
                  }}
                  color='primary'
                />
              }
              label={this.props.title}
            />
          </FormGroup>
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
        : this.props.type === 'button' ?
          <Button variant='outlined' fullWidth onClick={this.props.onClick}>
            {this.props.title}
          </Button>
        :
          <></>
        }
      </Grid>
    );
  }
}
