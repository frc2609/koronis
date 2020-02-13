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

import RecordSelect from 'uiTree/components/RecordSelect';

export default class RecordSelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processes: [],
      disable: true
    }
  }
  select() {
    if(typeof this.props.onSelect === 'function') {
      this.props.onSelect(this.refs.processSelect.getSelectedProcesses());
    }
  }
  close() {
    if(typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  }
  refresh() {
    this.setState({processes: []});
    Interface.getProcesses({}, {lastModified: 'desc'}).then((docs) => {
      this.setState({processes: docs});
    });
  }
  componentDidMount() {
    this.refresh();
  }
  componentDidUpdate(prevProps) {
    if(!prevProps.open && this.props.open) {
      this.refresh();
    }
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
              disabled={this.state.disable}
              onClick={this.select.bind(this)}
            >
              Select
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar style={{marginBottom: '4vh'}} />
        <Container maxWidth='xl'>
          <ProcessSelect ref='processSelect' processes={this.state.processes}
            onSelect={(selectedProcesses) => {
              this.setState({disable: (
                typeof selectedProcesses === 'undefined' ||
                selectedProcesses.length === 0
              )});
            }}
            onRemove={this.refresh.bind(this)}
          />
        </Container>
      </Dialog>
    );
  }
}
