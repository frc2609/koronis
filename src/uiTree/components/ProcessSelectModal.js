import React from 'react';

import * as Interface from 'db/Interface';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import TocIcon from '@material-ui/icons/Toc';
import AppsIcon from '@material-ui/icons/Apps';
import { Close } from '@material-ui/icons';

import ProcessSelect from 'uiTree/components/ProcessSelect';

export default class ProcessSelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processes: [],
      tableMode: false,
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
    Interface.getProcesses(typeof this.props.queryObj !== 'undefined'? this.props.queryObj : {}, {lastModified: 'desc'}).then((docs) => {
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
              Select Processes
            </Typography>
            <Button color='inherit'
              onClick={this.select.bind(this)}
            >
              Select
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar style={{marginBottom: '4vh'}} />
        <Container maxWidth='xl'>
          <Grid container spacing={2}>
            <Grid item xs={10}></Grid>
            <Grid item xs={2}>
              <IconButton variant='contained'
                onClick={() => {
                  this.setState({tableMode: !this.state.tableMode});
                }}
              >
                {!this.state.tableMode ?
                  <TocIcon fontSize='large' />
                :
                  <AppsIcon fontSize='large' />
                }
              </IconButton>
            </Grid>
          </Grid>
          <ProcessSelect ref='processSelect' processes={this.state.processes} table={this.state.tableMode}
            onSelect={(selectedProcesses) => {
              this.setState({disable: (
                typeof selectedProcesses === 'undefined' ||
                selectedProcesses.length === 0
              )});
            }}
            onRemove={this.refresh.bind(this)}
            selectedProcesses={this.props.selectedProcesses}
          />
        </Container>
      </Dialog>
    );
  }
}
