import React from 'react';

import serializerWorker from 'workerize-loader!engine/worker/Serializer'; // eslint-disable-line import/no-webpack-loader-syntax

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { FiberManualRecord, Code } from '@material-ui/icons';

import Selector from 'uiTree/components/Selector';
import SendString from 'engine/transfer/qrcode/SendString';

var serializerInstance = new serializerWorker();
var deepCompare = require('deep-compare');

export default class QRSendData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProcesses: [],
      selectedRecords: [],
      dataStr: ''
    }
  }
  encodeData() {
    var commonArr= [];
    commonArr.push(this.state.selectedProcesses);
    commonArr.push(this.state.selectedRecords);
    commonArr = commonArr.flat();

    serializerInstance.serializeData(commonArr, true, true).then((encoded) => {
      this.setState({dataStr: encoded});
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if(!deepCompare(prevState.selectedRecords, this.state.selectedRecords) ||
      !deepCompare(prevState.selectedProcesses, this.state.selectedProcesses)
    ) {
      this.encodeData();
    }
  }
  render() {
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Selector
              queryBarName='qrsenddata'
              onRecordsChange={(records) => {
                this.setState({
                  selectedRecords: records
                });
              }}
              showRecords
              onProcessesChange={(processes) => {
                this.setState({
                  selectedProcesses: processes
                });
              }}
              showProcesses
            />
          </Grid>
          <Grid item xs={12}>
            <SendString targetString={this.state.dataStr} />
          </Grid>
        </Grid>
      </Container>
    );
  }
}
