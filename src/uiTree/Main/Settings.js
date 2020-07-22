import React from 'react';

import * as Package from 'sync/package/PackageCollector';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

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
      <Container>
        <Grid container spacing={2}>
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
        </Grid>
      </Container>
    );
  }
}
