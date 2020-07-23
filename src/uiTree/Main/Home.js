import React from 'react';

import Config from 'config/Config';

import Typography from '@material-ui/core/Typography';

export default class Home extends React.Component {
  render() {
    return (
      <Typography align='center'>
        App is version {Config.version} is configured for {Config.environmentConfig}. This view is still a work in progress.
      </Typography>
    );
  }
}
