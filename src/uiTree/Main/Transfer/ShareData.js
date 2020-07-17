import React from 'react';

import * as Interface from 'db/Interface';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { FiberManualRecord, Code } from '@material-ui/icons';

import ProcessSelectModal from 'uiTree/components/Process/ProcessSelectModal';
import RecordSelectModal from 'uiTree/components/Record/RecordSelectModal';
import ShareString from 'engine/transfer/ShareString';

var deepCompare = require('deep-compare');

export default class TransferHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openRecordModal: false,
      openProcessModal: false,
      selectedProcesses: [],
      selectedRecords: [],
      data: []
    }
  }
  combineData() {
    var commonArr= [];
    commonArr.push(this.state.selectedProcesses);
    commonArr.push(this.state.selectedRecords);
    commonArr = commonArr.flat();
    this.setState({data: commonArr});
  }
  onImport(data) {
    if(Array.isArray(data)) {
      for(var i = 0;i < data.length;i++) {
        if(typeof data[i].eventLog !== 'undefined') {
          Interface.insertRecord(data[i]);
        }
        else if(typeof data[i].function !== 'undefined') {
          Interface.insertProcess(data[i]);
        }
      }
    }
    else {
      if(typeof data.eventLog !== 'undefined') {
        Interface.insertRecord(data);
      }
      else if(typeof data.function !== 'undefined') {
        Interface.insertProcess(data);
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(!deepCompare(prevState.selectedRecords, this.state.selectedRecords) || !deepCompare(prevState.selectedProcesses, this.state.selectedProcesses)) {
      this.combineData();
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
              <ShareString data={this.state.data} onUpload={this.onImport.bind(this)} />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}
