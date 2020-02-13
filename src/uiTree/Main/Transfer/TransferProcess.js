import React from 'react';

import * as Interface from 'db/Interface';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import SyncAltIcon from '@material-ui/icons/SyncAlt';

import TransferHandler from 'engine/transfer/TransferHandler';
import ProcessSelect from 'uiTree/components/ProcessSelect';

export default class TransferProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transfering: false,
      loading: true,
      processes: [],
      selectedProcesses: []
    };
    this.queryObj = {};
  }
  startTransfering() {
    this.setState({transfering: true, selectedProcesses: this.refs.processSelect.getSelectedProcesses()});
  }
  stopTransfering() {
    this.setState({transfering: false});
  }
  refresh() {
    this.setState({loading: true, processes: []});
    Interface.getProcesses({}, {lastModified: 'desc'}).then((docs) => {
      this.setState({processes: docs, loading: false});
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
      this.state.transfering ? <TransferHandler onClose={this.stopTransfering.bind(this)} dataType='processes' data={this.state.selectedProcesses} /> :
      <>
        <Container maxWidth='xl'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {this.state.loading ? <CircularProgress /> : <ProcessSelect ref='processSelect' processes={this.state.processes} selectedProcesses={this.state.selectedProcesses} onRemove={this.refresh.bind(this)} />}
            </Grid>
          </Grid>
        </Container>
        <Fab
          color='primary'
          onClick={this.startTransfering.bind(this)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 110
          }}
        >
          <SyncAltIcon />
        </Fab>
      </>
    );
  }
}
