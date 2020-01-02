import React from 'react';

import * as User from 'auth/User';
import * as Interface from 'db/Interface';
import * as Layout from 'config/Layout';
import { request as workerRequest } from 'engine/worker/EngineDriver';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import SyncAltIcon from '@material-ui/icons/SyncAlt';

import TransferRecords from 'engine/transfer/TransferRecords';
import RecordView from 'uiTree/components/RecordView';
import RecordQueryBar from 'uiTree/components/RecordQueryBar';

export default class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transfering: false,
      loading: true,
      records: [],
      selectedRecords: []
    };
    this.queryObj = {};
  }
  startTransfering() {
    this.setState({transfering: true});
  }
  stopTransfering() {
    this.setState({transfering: false});
  }
  refresh() {
    this.setState({loading: true, records: []});
    this.queryObj = this.refs.recordQueryBar.getQueryObj();
    Interface.getRecords(this.queryObj, {lastModified: 'desc'}).then((docs) => {
      this.setState({records: docs, selectedRecords: docs, loading: false});
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
      this.state.transfering ? <TransferRecords onClose={this.stopTransfering.bind(this)} selectedRecords={this.state.selectedRecords} /> : 
      <>
      <Container>
      <RecordQueryBar ref='recordQueryBar' name='transfer' button onSubmit={this.refresh.bind(this)}/>
      {this.state.loading ? <CircularProgress /> : <RecordView records={this.state.records} onRemove={this.refresh.bind(this)} />}
      </Container>
      <Fab color='primary' onClick={this.startTransfering.bind(this)} style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px'}}
      >
        <SyncAltIcon />
      </Fab>
      </>
    );
  }
}
