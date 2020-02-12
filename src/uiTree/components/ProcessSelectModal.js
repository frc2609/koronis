import React from 'react';

import * as Interface from 'db/Interface';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';

import ProcessSelect from 'uiTree/components/ProcessSelect';

export default class ProcessSelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processes: []
    }
  }
  select() {
    if(typeof this.props.onSelect === 'function') {
      this.props.onSelect(this.refs.processSelect.getSelectedRecords());
    }
  }
  close() {
    if(typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  }
  componentDidMount() {
    Interface.getProcesses({}, {lastModified: 'desc'}).then((docs) => {
      this.setState({processes: docs});
    });
  }
  render() {
    return (
      <Dialog fullScreen open={this.props.open} onClose={this.close.bind(this)}>
        <AppBar position='fixed'>
          <Toolbar>
            <IconButton color='inherit' edge='start' onClick={this.close.bind(this)} style={{
              marginRight: '4vw'
            }}>
              <Close />
            </IconButton>
            <Typography variant='h6' style={{
              flexGrow: 1
            }}>
              Open Process
            </Typography>
            <Button color='inherit'
              disabled={
                typeof this.refs.processSelect === 'undefined' ||
                typeof this.refs.processSelect.getSelectedRecords() === 'undefined' ||
                this.refs.processSelect.getSelectedRecords().length === 0
              }
              onClick={this.select.bind(this)}
            >
              Select
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth='xl'>
          <ProcessSelect ref='processSelect' processes={this.state.processes} />
        </Container>
      </Dialog>
    );
  }
}
