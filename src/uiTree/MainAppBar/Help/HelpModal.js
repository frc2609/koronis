import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export default class HelpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  close() {
    this.setState({open: false});
  }
  open() {
    this.setState({open: true});
  }
  render() {
    return (
      <>
        <Dialog
          open={this.state.open}
          onClose={this.close.bind(this)}
          scroll='paper'
          maxWidth='lg'
          fullWidth
        >
          <DialogTitle>Help</DialogTitle>
          <DialogContent>
            {this.props.children}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.close.bind(this)} color='primary'>Close</Button>
          </DialogActions>
        </Dialog>
        <IconButton onClick={this.open.bind(this)}>
          <HelpOutlineIcon style={{color: '#ffffff'}} />
        </IconButton>
      </>
    );
  }
}
