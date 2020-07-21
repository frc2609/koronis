import React from 'react';

import * as Interface from 'db/Interface';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { FiberManualRecord, Code } from '@material-ui/icons';

import Selector from 'uiTree/components/Selector';
import ShareString from 'engine/transfer/ShareString';

var deepCompare = require('deep-compare');

export default class TransferHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Selector
              queryBarName='sharedata'
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
            <ShareString data={this.state.data} onUpload={this.onImport.bind(this)} />
          </Grid>
        </Grid>
      </Container>
    );
  }
}
