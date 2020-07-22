import React from 'react';

import * as Interface from 'db/Interface';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
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

import ProcessSelect from 'uiTree/components/Process/ProcessSelect';

export default class ProcessSelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processes: [],
      tableMode: false,
      loading: true,
      disable: true
    }
    this.processesSubscription = null;
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
    if(this.processesSubscription !== null) {
      this.processesSubscription.unsubscribe();
    }
    Interface.subscribeProcesses(typeof this.props.queryObj !== 'undefined'? this.props.queryObj : {}, {lastModified: 'desc'}, (docs) => {
      this.setState({processes: docs, loading: false});
    }).then((subscription) => {
      this.processesSubscription = subscription;
    });
  }
  componentDidMount() {
    this.refresh();
  }
  componentDidUpdate(prevProps) {
    if(prevProps.queryObj !== this.props.queryObj) {
      this.refresh();
    }
  }
  componentWillUnmount() {
    if(this.processesSubscription !== null) {
      this.processesSubscription.unsubscribe();
    }
  }
  render() {
    return (
      <Dialog fullScreen open={this.props.open} onClose={this.close.bind(this)}>
        <AppBar position='fixed'>
          <Toolbar>
            <IconButton color='inherit' edge='start' onClick={this.close.bind(this)}>
              <Close />
            </IconButton>
            <Box mr={2} />
            <Typography variant='h6'>
              {this.props.singular ?
                'Select Process'
              :
                'Select Processes'
              }
            </Typography>
            <Box flexGrow={1}/>
            <Button color='inherit'
              onClick={this.select.bind(this)}
            >
              Select
            </Button>
          </Toolbar>
        </AppBar>
        <Box mb={3}>
          <Toolbar />
        </Box>
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
            singular={this.props.singular}
            loading={this.state.loading}
            selectedProcesses={this.props.selectedProcesses}
          />
        </Container>
      </Dialog>
    );
  }
}
