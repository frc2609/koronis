import React from 'react';

import * as Sync from 'sync/Sync';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SyncIcon from '@material-ui/icons/Sync';
import CloudOffIcon from '@material-ui/icons/CloudOff';

import SideNav from 'uiTree/MainAppBar/SideNav';
import Help from 'uiTree/MainAppBar/Help';

import 'uiTree/MainAppBar.css';

export default class MainAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuState: false,
      syncIndicator: false,
      syncText: window.syncStatus,
      onlineStatus: true
    };
    this.syncStartListener = null;
    this.syncStatusListener = null;
    this.syncEndListener = null;
    this.connectionListener = null;
  }
  syncStart() {this.setState({syncIndicator: true, syncText: window.syncStatus});}
  syncStatus() {this.setState({syncText: window.syncStatus});}
  syncEnd() {this.setState({syncIndicator: false});}
  openMenu() {this.setState({menuState: true});}
  closeMenu() {this.setState({menuState: false});}
  componentDidMount() {
    this.setState({syncIndicator: Sync.getStatus()});
    this.syncStartListener = this.syncStart.bind(this);
    this.syncStatusListener = this.syncStatus.bind(this);
    this.syncEndListener = this.syncEnd.bind(this);
    this.connectionListener = () => {this.setState({onlineStatus: navigator.onLine})};
    window.addEventListener('syncstart', this.syncStartListener);
    window.addEventListener('syncstatus', this.syncStartListener);
    window.addEventListener('syncend', this.syncEndListener);
    window.addEventListener('online', this.connectionListener);
    window.addEventListener('offline', this.connectionListener);
  }
  componentWillUnmount() {;
    window.removeEventListener('syncstart', this.syncStartListener);
    window.removeEventListener('syncstatus', this.syncStartListener);
    window.removeEventListener('syncend', this.syncEndListener);
    window.removeEventListener('online', this.connectionListener);
    window.removeEventListener('offline', this.connectionListener);
  }
  render() {
    return (
      <>
        <AppBar position='fixed'>
          <SideNav menuState={this.state.menuState} closeMenuCallback={this.closeMenu.bind(this)}/>
          <Toolbar>
            <IconButton onClick={this.openMenu.bind(this)} edge='start' color='inherit' aria-label='menu'>
              <MenuIcon />
            </IconButton>
            <Box mr={2} />
            <Typography variant='h6' align='center'>KSS</Typography>
            <Box flexGrow={1} />
            {this.state.syncIndicator ?
              <>
                <Typography variant='body2' align='center'>{'Syncing ' + this.state.syncText}</Typography>
                <Box mr={2} />
                <SyncIcon className='rotate' />
              </>
            :
              <></>
            }
            {!this.state.onlineStatus ?
              <CloudOffIcon />
            :
              <></>
            }
            <Box mr={1} />
            <Help />
            <Box mr={2} />
            <Button color='inherit'>Login</Button>
          </Toolbar>
        </AppBar>
        <Box mb={3}>
          <Toolbar />
        </Box>
      </>
    );
  }
}
