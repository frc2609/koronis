import React from 'react';

import Config from 'config/Config';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';

export default class Home extends React.Component {
  render() {
    return (
      <Container maxWidth='xl'>
        <Card>
          <Box my={3}>
          <Typography align='center'>
            App is version {Config.version} is configured for {Config.environmentConfig}. This view is still a work in progress.
          </Typography>
          </Box>
        </Card>
      </Container>
    );
  }
}
