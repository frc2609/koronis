import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import SideNav from 'uiTree/MainAppBar/SideNav';

export default class MainAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuState: false
    }

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  openMenu() {this.setState({menuState: true});}
  closeMenu() {this.setState({menuState: false});}
  render() {
    return (
      <>
        <AppBar position='fixed'>
          <SideNav menuState={this.state.menuState} closeMenuCallback={this.closeMenu}/>
          <Toolbar>
            <IconButton onClick={this.openMenu} edge='start' color='inherit' aria-label='menu'
              style={{
                marginRight: '4vw'
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6'
              style={{
                flexGrow: 1
              }}
            >
              {this.props.title}
            </Typography>
            <Button color='inherit'>
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar style={{marginBottom: '2vh'}} />
      </>
    );
  }
}
