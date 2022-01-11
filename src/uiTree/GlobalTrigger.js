import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const globalDialogResponseEvent = new Event('globaldialogresponse');

export default class GlobalTrigger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertTrigger: false,
      dialogTrigger: false,
      alertType: 'success',
      alertMessage: '',
      dialogTitle: '',
      dialogMessage: '',
      dialogChildren: <></>,
      dialogResponse: false
    };
    window.globalAlert = (type, message) => {
      this.setState({
        alertTrigger: true,
        alertType: type,
        alertMessage: message
      });
    };
    window.globalDialog = async (title, message, children = <></>) => {
      this.setState({
        dialogTrigger: true,
        dialogTitle: title,
        dialogMessage: message,
        dialogChildren: children,
        dialogResponse: false
      });
      let response = await (new Promise((resolve) => {
        function dialogEventHandler() {
          window.removeEventListener('globaldialogresponse', dialogEventHandler);
          resolve(this.state.dialogResponse);
        }
        window.addEventListener('globaldialogresponse', dialogEventHandler.bind(this));
      }));
      return response;
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.dialogTrigger && !this.state.dialogTrigger) {
      window.dispatchEvent(globalDialogResponseEvent);
    }
    if(!prevState.dialogResponse && this.state.dialogResponse) {
      this.setState({dialogTrigger: false});
    }
  }
  render() {
    return (
      <>
        <Snackbar
          open={this.state.alertTrigger}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          style={{top: 75}}
          onClose={() => {this.setState({alertTrigger: false})}}
        >
          <Alert
            style={{minWidth: 350}}
            variant='filled'
            onClose={() => {this.setState({alertTrigger: false})}}
            severity={this.state.alertType}
          >
            {this.state.alertMessage}
          </Alert>
        </Snackbar>
        <Dialog open={this.state.dialogTrigger} onClose={() => {this.setState({dialogTrigger: false})}}>
          <DialogTitle>{this.state.dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.state.dialogMessage}</DialogContentText>
            {this.state.dialogChildren}
          </DialogContent>
          <DialogActions>
            <Button color='primary' onClick={() => {this.setState({dialogTrigger: false})}}>No</Button>
            <Button color='primary' onClick={() => {this.setState({dialogResponse: true})}}>Yes</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
