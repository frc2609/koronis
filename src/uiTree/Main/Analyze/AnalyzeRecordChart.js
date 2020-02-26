import React from 'react';

import * as Processor from 'engine/process/Processor';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { FiberManualRecord, Code } from '@material-ui/icons';

import eruda from 'eruda';

import ProcessSelectModal from 'uiTree/components/ProcessSelectModal';
import RecordSelectModal from 'uiTree/components/RecordSelectModal';

var isMobile = require('is-mobile');

export default class AnalyzeRecordChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openRecordModal: false,
      openProcessModal: false,
      selectedRecords: [],
      selectedProcess: {},
      returnValue: {
        value: NaN,
        log: [],
        info: [],
        table: [],
        debug: [],
        warn: [],
        error: []
      }
    }
  }
  runProcess() {
    if(typeof this.refs.targetElement !== 'undefined') {
      var ret = Object.assign({
          value: NaN,
          log: [],
          info: [],
          table: [],
          debug: [],
          warn: [],
          error: []
        },
        Processor.runProcess(this.refs.targetElement, this.state.selectedRecords, this.state.selectedProcess)
      );
      this.setState({returnValue: ret});
    }
  }
  componentDidMount() {
    if(isMobile()) {eruda.init();}
  }
  componentWillUnmount() {
    try {eruda.destroy();}
    catch(err) {}
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
                selectedProcess: processes[0]
              });
            }
          }}
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
        />
        <Container maxWidth='xl' style={{marginBottom: '4vh'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ButtonGroup fullWidth>
                <Button onClick={() => {this.setState({openRecordModal: true})}}>
                  <FiberManualRecord />
                  Records
                </Button>
                <Button onClick={() => {this.setState({openProcessModal: true})}}>
                  <Code />
                  Process
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth
                variant='contained'
                color='primary'
                onClick={this.runProcess.bind(this)}
                disabled={
                  this.state.selectedRecords.length === 0 ||
                  Object.keys(this.state.selectedProcess).length === 0
                }
              >
                <PlayArrowIcon />
                Run
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <Typography variant='h5' align='center'>
                  Results: {this.state.returnValue.value}
                </Typography>
                <div ref='targetElement'></div>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}
