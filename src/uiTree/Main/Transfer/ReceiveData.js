import React from 'react';

import * as Interface from 'db/Interface';
import serializerWorker from 'workerize-loader!engine/worker/Serializer'; // eslint-disable-line import/no-webpack-loader-syntax

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import ReceiveString from 'engine/transfer/ReceiveString';

var serializerInstance = new serializerWorker();
var deepCompare = require('deep-compare');

export default class TransferHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openRecordModal: false,
      openProcessModal: false,
      selectedProcesses: [],
      selectedRecords: [],
      dataStr: ''
    }
  }
  decodeData(inStr) {
    serializerInstance.serializeData(inStr, false, true).then((decoded) => {
      for(var i = 0;i < decoded.length;i++) {
        if(typeof decoded[i].eventLog !== 'undefined') {
          Interface.insertRecord(decoded[i]);
        }
        else if(typeof decoded[i].function !== 'undefined') {
          Interface.insertProcess(decoded[i]);
        }
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if(!deepCompare(prevState.selectedRecords, this.state.selectedRecords) || !deepCompare(prevState.selectedProcesses, this.state.selectedProcesses)) {
      this.serializeData();
    }
  }
  render() {
    return (
      <>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ReceiveString onFinish={this.decodeData.bind(this)} />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}
