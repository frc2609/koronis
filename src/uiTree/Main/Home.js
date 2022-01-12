import React from 'react';

import Config from 'config/Config';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

export default class Home extends React.Component {
  render() {
    return (
      <Container maxWidth='xl'>
        <Card>
          <CardContent>
            <Typography variant='h6'>
              Join the community!
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                Want to contribute? Looking for help? Got a bug to report?
              </Grid>
              <Grid item xs={5}>
                <Button
                  fullWidth
                  variant='contained'
                  onClick={() => { window.open('http://discord.koronis.cc'); }}
                >
                  Join the KSS Discord server!
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' component='p'>
                  App is version {Config.version} and configured for {Config.environmentConfig} mode. This view is still a work in progress.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    );
  }
}
