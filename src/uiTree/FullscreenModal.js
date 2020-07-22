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
    var elem = document.documentElement;
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
      this.setState({fullscreen: false, open: true});
    }
    document.documentElement.onfullscreenchange = (event) => {
      var isFullscreen = document.fullscreenElement === event.target;
      this.setState({fullscreen: isFullscreen, open: !isFullscreen});
    }
  }
  render() {
    return (
      <Dialog open={this.state.open}>
        <DialogTitle>Go Fullscreen?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            It is recommended you go fullscreen for the best user experience. Do you want to go fullscreen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.close.bind(this)}>No</Button>
          <Button onClick={this.goFullscreen.bind(this)}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
