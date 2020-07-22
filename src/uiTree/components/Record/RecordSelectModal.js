import React from 'react';

import * as Interface from 'db/Interface';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TocIcon from '@material-ui/icons/Toc';
import AppsIcon from '@material-ui/icons/Apps';
import { Close } from '@material-ui/icons';

import RecordSelect from 'uiTree/components/Record/RecordSelect';
import RecordQueryBar from 'uiTree/components/Record/RecordQueryBar';

export default class RecordSelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      loading: true,
      tableMode: false,
      disable: true
    }
    this.queryObj = {};
    this.recordsSubscription = null;
  }
  select() {
    if(typeof this.props.onSelect === 'function') {
      this.props.onSelect(this.refs.recordSelect.getSelectedRecords());
    }
  }
  close() {
    if(typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  }
  refresh() {
    this.setState({loading: true, records: []});
    if(typeof this.refs.recordQueryBar !== 'undefined') {
      this.queryObj = this.refs.recordQueryBar.getQueryObj();
    }
    else {
      this.queryObj = typeof this.props.queryObj !== 'undefined' ? this.props.queryObj : {};
    }
    if(this.recordsSubscription !== null) {
      this.recordsSubscription.unsubscribe();
    }
    Interface.subscribeRecords(this.queryObj, {lastModified: 'desc'}, (docs) => {
      this.setState({records: docs, loading: false});
    }).then((subscription) => {
      this.recordsSubscription = subscription;
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
    if(this.recordsSubscription !== null) {
      this.recordsSubscription.unsubscribe();
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
            <Typography variant='h6'
              style={{
                flexGrow: 1
              }}
            >
              {this.props.singular ?
                'Select Record'
              :
                'Select Records'
              }
            </Typography>
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
            <Grid item xs={10}>
              <RecordQueryBar ref='recordQueryBar' name={this.props.queryBarName} button onSubmit={this.refresh.bind(this)}/>
            </Grid>
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
          <RecordSelect ref='recordSelect' records={this.state.records} table={this.state.tableMode} onRemove={this.refresh.bind(this)}
            onSelect={(selectedRecords) => {
              this.setState({disable: (
                typeof selectedRecords === 'undefined' ||
                selectedRecords.length === 0
              )});
            }}
            loading={this.state.loading}
            selectedRecords={this.props.selectedRecords}
          />
        </Container>
      </Dialog>
    );
  }
}
