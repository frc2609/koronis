import React from 'react';

import Config from 'config/Config';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';

import UpdateButton from 'uiTree/Main/Home/UpdateButton';

class DiscordJoin extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant='h6'>
            Join the community!
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Typography variant='body2' component='p'>
                Want to contribute? Looking for help? Got a bug to report?
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Button
                fullWidth
                variant='outlined'
                color='primary'
                onClick={() => { window.open('http://discord.koronis.cc'); }}
              >
                Join the KSS Discord server!
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

class AppVer extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant='h6'>
            Version
          </Typography>
          <Typography variant='body2' component='p'>
            App is version {Config.version} and configured for {Config.environmentConfig} mode.
          </Typography>
          <br/>
          <UpdateButton />
        </CardContent>
      </Card>
    );
  }
}

export default class Home extends React.Component {
  render() {
    return (
      <Box m={2}>
      <Hidden smDown>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DiscordJoin />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <AppVer />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DiscordJoin />
          </Grid>
          <Grid item xs={12}>
            <AppVer />
          </Grid>
        </Grid>
      </Hidden>
      </Box>
    );
  }
}
