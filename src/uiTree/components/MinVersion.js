import React from 'react';

import Typography from '@material-ui/core/Typography';

import Config from 'config/Config';

export default class MinVersion extends React.Component {
  render() {
    return (
      <Typography>
        Minimum compatible version is {Config.minVersion} 
      </Typography>
    );
  }
}