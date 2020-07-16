import React from 'react';

import * as Sync from 'sync/Sync';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import MenuIcon from '@material-ui/icons/Menu';
import SyncIcon from '@material-ui/icons/Sync';

import SideNav from 'uiTree/MainAppBar/SideNav';
import Help from 'uiTree/MainAppBar/Help';

import 'uiTree/MainAppBar.css';

export default class MainAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuState: false,
      syncIndicator: false,
      syncText: window.syncStatus
    };
    this.syncStartListener = null;
    this.syncStatusListener = null;
    this.syncEndListener = null;
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
    window.addEventListener('syncstart', this.syncStartListener);
    window.addEventListener('syncstatus', this.syncStartListener);
    window.addEventListener('syncend', this.syncEndListener);
  }
  componentWillUnmount() {;
    window.removeEventListener('syncstart', this.syncStartListener);
    window.removeEventListener('syncstatus', this.syncStartListener);
    window.removeEventListener('syncend', this.syncEndListener);
  }
  render() {
    return (
      <>
        <Snackbar
          open={this.state.syncIndicator}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          message={'Syncing ' + this.state.syncText}
          action={<SyncIcon className='rotate' />}
        />
        <AppBar position='fixed'>
          <SideNav menuState={this.state.menuState} closeMenuCallback={this.closeMenu.bind(this)}/>
          <Toolbar>
            <Box mr={2}>
              <IconButton onClick={this.openMenu.bind(this)} edge='start' color='inherit' aria-label='menu'>
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography variant='h6' align='center'>KSS</Typography>
            <Box flexGrow={1} />
            <Help />
            <Box ml={2}>
              <Button color='inherit'>
                Login
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box mb={3}>
          <Toolbar />
        </Box>
      </>
    );
  }
}
