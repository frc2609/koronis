import React from 'react';

import serializerWorker from 'workerize-loader!engine/worker/Serializer'; // eslint-disable-line import/no-webpack-loader-syntax

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { FiberManualRecord, Code } from '@material-ui/icons';

import ProcessSelectModal from 'uiTree/components/Process/ProcessSelectModal';
import RecordSelectModal from 'uiTree/components/Record/RecordSelectModal';
import SendString from 'engine/transfer/qrcode/SendString';

var serializerInstance = new serializerWorker();
var deepCompare = require('deep-compare');

export default class QRSendData extends React.Component {
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
    if(!deepCompare(prevState.selectedRecords, this.state.selectedRecords) || !deepCompare(prevState.selectedProcesses, this.state.selectedProcesses)) {
      this.encodeData();
    }
  }
  render() {
    return (
      <>
        <ProcessSelectModal
          open={this.state.openProcessModal}
          onClose={() => {
            this.setState({openProcessModal: false});
          }}
          onSelect={(processes) => {
            if(processes.length > 0) {
              this.setState({
                openProcessModal: false,
                selectedProcesses: processes
              });
            }
          }}
          selectedProcesses={this.state.selectedProcesses}
        />
        <RecordSelectModal
          open={this.state.openRecordModal}
          onClose={() => {
            this.setState({openRecordModal: false});
          }}
          onSelect={(records) => {
            if(records.length > 0) {
              this.setState({
                openRecordModal: false,
                selectedRecords: records
              });
            }
          }}
          selectedRecords={this.state.selectedRecords}
        />
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ButtonGroup fullWidth>
                <Button onClick={() => {this.setState({openRecordModal: true})}}>
                  <FiberManualRecord />
                  {this.state.selectedRecords.length <= 0 ?
                    'Select Records'
                  : this.state.selectedRecords.length > 1 ?
                    this.state.selectedRecords.length + ' Records Selected'
                  :
                    this.state.selectedRecords.length + ' Record Selected'
                  }
                </Button>
                <Button onClick={() => {this.setState({openProcessModal: true})}}>
                  <Code />
                  {this.state.selectedProcesses.length <= 0 ?
                    'Select Processes'
                  : this.state.selectedProcesses.length > 1 ?
                    this.state.selectedProcesses.length + ' Processes Selected'
                  :
                    this.state.selectedProcesses.length + ' Process Selected'
                  }
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <SendString targetString={this.state.dataStr} />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}
