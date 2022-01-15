import React from 'react';

import * as Interface from 'db/Interface';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';

import Selector from 'uiTree/components/Selector';
import ShareString from 'engine/transfer/ShareString';

const deepCompare = require('fast-deep-equal');

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
    let commonArr= [];
    commonArr.push(this.state.selectedProcesses);
    commonArr.push(this.state.selectedRecords);
    commonArr = commonArr.flat();
    this.setState({data: commonArr});
  }
  onImport(data) {
    if(Array.isArray(data)) {
      for(let i = 0;i < data.length;i++) {
        if(typeof data[i].eventLog !== 'undefined') {
          delete data[i].metadata;
          Interface.insertRecord(data[i]);
        }
        else if(typeof data[i].function !== 'undefined') {
          delete data[i].metadata;
          Interface.insertProcess(data[i]);
        }
      }
    }
    else {
      if(typeof data.eventLog !== 'undefined') {
        delete data.metadata;
        Interface.insertRecord(data);
      }
      else if(typeof data.function !== 'undefined') {
        delete data.metadata;
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
      <Container maxWidth='xl'>
        <Card>
          <Box m={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Selector
                  queryBarName='sharedata'
                  onRecordsChange={(records) => {
                    this.setState({
                      selectedRecords: records.map((e) => {delete e.metadata; return e})
                    });
                  }}
                  showRecords
                  onProcessesChange={(processes) => {
                    this.setState({
                      selectedProcesses: processes.map((e) => {delete e.metadata; return e})
                    });
                  }}
                  showProcesses
                />
              </Grid>
              <Grid item xs={12}>
                <ShareString data={this.state.data} onUpload={this.onImport.bind(this)} />
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    );
  }
}
