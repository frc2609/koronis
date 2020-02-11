import React from 'react';

import * as Interface from 'db/Interface';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import TocIcon from '@material-ui/icons/Toc';
import AppsIcon from '@material-ui/icons/Apps';

import TransferHandler from 'engine/transfer/TransferHandler';
import RecordSelect from 'uiTree/components/RecordSelect';
import RecordQueryBar from 'uiTree/components/RecordQueryBar';

var store = require('store');

export default class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transfering: false,
      loading: true,
      tableMode: false,
      records: [],
      selectedRecords: []
    };
    this.queryObj = {};

    if(typeof store.get('transfer/settings/tableMode') !== 'undefined') {
      this.state.tableMode = store.get('transfer/settings/tableMode');
    }
  }
  startTransfering() {
    this.setState({transfering: true, selectedRecords: this.refs.recordSelect.getSelectedRecords()});
  }
  stopTransfering() {
    this.setState({transfering: false});
  }
  refresh() {
    this.setState({loading: true, records: []});
    this.queryObj = this.refs.recordQueryBar.getQueryObj();
    Interface.getRecords(this.queryObj, {lastModified: 'desc'}).then((docs) => {
      this.setState({records: docs, loading: false});
    });
  }
  componentDidMount() {
    this.refresh();
  }
  componentDidUpdate(prevProps, prevState) {
    if(!this.state.transfering && prevState.transfering) {
      this.refresh();
    }
  }
  render() {
    return (
      this.state.transfering ? <TransferHandler onClose={this.stopTransfering.bind(this)} dataType='records' data={this.state.selectedRecords} /> :
      <>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <RecordQueryBar ref='recordQueryBar' name='transfer' button onSubmit={this.refresh.bind(this)}/>
            </Grid>
            <Grid item xs={2}>
              <IconButton variant='contained' onClick={() => {
                store.set('transfer/settings/tableMode', !this.state.tableMode);
                this.setState({tableMode: !this.state.tableMode});
              }}>
                {!this.state.tableMode ? <TocIcon fontSize='large' /> : <AppsIcon fontSize='large' />}
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              {this.state.loading ? <CircularProgress /> : <RecordSelect ref='recordSelect' table={this.state.tableMode} records={this.state.records} selectedRecords={this.state.selectedRecords} onRemove={this.refresh.bind(this)} />}
            </Grid>
          </Grid>
        </Container>
        <Fab
          color='primary'
          onClick={this.startTransfering.bind(this)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px'
          }}
        >
          <SyncAltIcon />
        </Fab>
      </>
    );
  }
}
