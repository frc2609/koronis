import React from 'react';

import * as User from 'auth/User';
import * as Interface from 'db/Interface';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import RecordCard from 'uiTree/Main/Record/RecordCard';
import RecordEngine from 'engine/record/RecordEngine';

export default class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      loading: true,
      records: []
    };
  }
  startRecording() {
    this.setState({recording: true});
  }
  recordingEngineHandler() {
    this.setState({recording: false});
    this.refresh();
  }
  refresh() {
    this.setState({loading: true, records: []});
    var queryObj = {};
    if(User.getUserId() != '') {
      queryObj.user = {$eq: User.getUserId()};
    }
    else {
      queryObj.device = {$eq: User.getFingerprint()};
    }
    Interface.getRecords(queryObj, {lastModified: 'desc'}).then((docs) => {
      this.setState({records: docs, loading: false});
    });
  }
  componentDidMount() {
    this.refresh();
  }
  render() {
    return (
      this.state.recording ? <RecordEngine onClose={this.recordingEngineHandler.bind(this)}/> : 
      <>
      <Container>
      {this.state.loading ? <CircularProgress /> :
        <Grid container spacing={2}>
          {(typeof this.state.records == 'undefined') ? '' :
            this.state.records.map((e, i) => {
              return (
                <Grid key={i} item xs={6} style={{minWidth: '300px'}}>
                  <RecordCard record={e} onRemove={this.refresh.bind(this)} />
                </Grid>
              );
            })
          }
        </Grid>
      }
      </Container>
      <Fab color='primary' onClick={this.startRecording.bind(this)} style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px'}}
      >
        <AddIcon />
      </Fab>
      </>
    );
  }
}
