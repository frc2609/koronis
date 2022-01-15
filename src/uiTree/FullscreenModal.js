import React from 'react';

import * as Layout from 'config/Layout';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FullscreenModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: true,
      open: false
    };
  }
  goFullscreen() {
    let elem = document.documentElement;
    if(elem.requestFullscreen) {elem.requestFullscreen();}
    else if(elem.mozRequestFullScreen) {elem.mozRequestFullscreen();}
    else if(elem.webkitRequestFullscreen) {elem.webkitRequestFullscreen();}
    else if(elem.msRequestFullscreen) {elem.msRequestFullscreen();}
  }
  close() {
    this.setState({open: false});
  }
  componentDidMount() {
    if(!((window.screen.availHeight || window.screen.height - 30) <= window.innerHeight) && !Layout.isLarge()) {
      let isPWA = window.matchMedia('(display-mode: standalone)').matches;
      this.setState({
        fullscreen: isPWA,
        open: !isPWA
      });
    }
    document.documentElement.onfullscreenchange = (event) => {
      let isFullscreen = document.fullscreenElement === event.target;
      if(window.matchMedia('(display-mode: standalone)').matches) {
        isFullscreen = true;
      }
      this.setState({fullscreen: isFullscreen, open: !isFullscreen});
    }
    
  }
  render() {
    return (
      <Dialog open={this.state.open} onClose={() => {this.setState({dialogTrigger: false})}}>
        <DialogTitle>Go Fullscreen?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            It is recommended you go fullscreen for the best user experience. Do you want to go fullscreen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={this.close.bind(this)}>No</Button>
          <Button color='primary' onClick={this.goFullscreen.bind(this)}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
