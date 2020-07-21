import React from 'react';

import * as Interface from 'db/Interface';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import RecordView from 'uiTree/components/Record/RecordView';
import RecordQueryBar from 'uiTree/components/Record/RecordQueryBar';
import RecordEngine from 'engine/record/RecordEngine';

export default class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      loading: true,
      records: []
    };
    this.queryObj = {};
  }
  startRecording() {
    this.setState({recording: true});
  }
  recordingEngineHandler() {
    this.setState({recording: false});
  }
  refresh() {
    this.setState({loading: true, records: []});
    if(typeof this.refs.recordQueryBar !== 'undefined') {
      this.queryObj = this.refs.recordQueryBar.getQueryObj();
    }
    Interface.getRecords(this.queryObj, {lastModified: 'desc'}).then((docs) => {
      this.setState({records: docs, loading: false});
    });
  }
  componentDidMount() {
    this.refresh();
  }
  componentDidUpdate(prevProps, prevState) {
    if(!this.state.recording && prevState.recording) {
      this.refresh();
    }
  }
  render() {
    return (
      this.state.recording ?
        <RecordEngine onClose={this.recordingEngineHandler.bind(this)}/>
      :
        <>
          <Container maxWidth='xl'>
            <RecordQueryBar ref='recordQueryBar' name='record' button onSubmit={this.refresh.bind(this)}/>
            {this.state.loading ?
              <CircularProgress />
            :
              <RecordView records={this.state.records} onRemove={this.refresh.bind(this)} />
            }
          </Container>
          <Fab color='primary' onClick={this.startRecording.bind(this)}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px'
            }}
          >
            <AddIcon />
          </Fab>
        </>
    );
  }
}
