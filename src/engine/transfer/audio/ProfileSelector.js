import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default class ProfileSelector extends React.Component {
  render() {
    return (
      <FormControl variant='outlined' margin='normal' fullWidth>
        <InputLabel>Profile</InputLabel>
        <Select
          onChange={(e) => {
            if(typeof this.props.onChange === 'function') {
              this.props.onChange(e);
            }
          }}
          value={this.props.value}
          label='Profile'
        >
          <MenuItem value='audible'>Audible</MenuItem>
          <MenuItem value='audible-7k-channel-0'>Audible 7K Channel 0</MenuItem>
          <MenuItem value='audible-7k-channel-1'>Audible 7K Channel 1</MenuItem>
          <MenuItem value='cable-64k'>Cable 64K</MenuItem>
          <MenuItem value='hello-world'>GSMK 4400Hz</MenuItem>
          <MenuItem value='ultrasonic'>Ultrasonic</MenuItem>
          <MenuItem value='ultrasonic-3600'>Ultrasonic 3600</MenuItem>
          <MenuItem value='ultrasonic-whisper'>Ultrasonic Whisper</MenuItem>
          <MenuItem value='ultrasonic-experimental'>Ultrasonic Experimental</MenuItem>
        </Select>
      </FormControl>
    );
  }
}
