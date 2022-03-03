import React from 'react';

import * as Package from 'sync/package/PackageCollector';
import * as Db from 'db/Db';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import * as ServiceWorker from 'ServiceWorkerRegistration';

import SettingsItem from 'uiTree/Main/Settings/SettingsItem';

import eruda from 'eruda';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStates: []
    }
  }
  refresh() {
    Package.getGameStates().then((results) => {
      this.setState({gameStates: results});
    });
  }
  componentDidMount() {
    this.refresh();
  }
  render() {
    return (
      <Container maxWidth='xl'>
        <Card>
          <Box m={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography align='left' variant='h6' gutterBottom>Misc</Typography>
              </Grid>
              <SettingsItem
                title='Current Year'
                path='/currentYear'
                type='dropdown'
              >
                {(typeof this.state.gameStates === 'undefined') ?
                  <></>
                :
                  this.state.gameStates.map((e, i) => {
                    return <MenuItem key={i} value={e.year}>{e.year + ' ' + e.nickname}</MenuItem>
                  })
                }
              </SettingsItem>
              <SettingsItem
                title='TBA Api Key'
                path='/tba/key'
                type='text'
              />
              <SettingsItem
                title='Enable Eruda Debug'
                path='/eruda/enable'
                type='switch'
                onChange={(val) => {
                  if(val === 'true') {eruda.init();}
                  else {eruda.destroy();}
                }}
              />
              <Grid item xs={12}>
                <Box mb={2}>
                  <Divider />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography align='left' variant='h6' gutterBottom>Theme</Typography>
              </Grid>
              <SettingsItem
                title='Dark Mode'
                path='/theme/darkMode'
                type='switch'
                onChange={(val) => {
                  window.location.reload();
                }}
              />
              <Grid item xs={12}>
                <Box mb={2}>
                  <Divider />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography align='left' variant='h6' gutterBottom>Data</Typography>
              </Grid>
              <SettingsItem
                title='Clear Database'
                type='button'
                onClick={() => {
                  window.globalDialog('Clear Database?', 'This will clear the database! Do you want to proceed?').then((res) => {
                    if(res) {
                      Db.clear();
                      window.location.reload();
                    }
                  });
                }}
              />
              <SettingsItem
                title='Clear All Data'
                type='button'
                onClick={() => {
                  window.globalDialog('Clear All Data?', 'This will clear all data! Do you want to proceed?').then((res) => {
                    if(res) {
                      Db.clear();
                      window.localStorage.clear();
                      window.sessionStorage.clear();
                      ServiceWorker.unregister();
                      window.setTimeout(() => {
                        window.location.reload();
                      }, 1000);
                    }
                  });
                }}
              />
            </Grid>
          </Box>
        </Card>
      </Container>
    );
  }
}
