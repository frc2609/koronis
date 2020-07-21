import React from 'react';

import * as Processor from 'engine/process/Processor';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import eruda from 'eruda';

import Selector from 'uiTree/components/Selector';

var isMobile = require('is-mobile');
var store = require('store');

export default class Execute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    if(isMobile() && !store.get('settings/eruda/enable')) {eruda.init();}
  }
  componentWillUnmount() {
    try {
      if(!store.get('settings/eruda/enable')) {eruda.destroy();}
    }
    catch(err) {}
  }
  render() {
    return (
      <>
        <Container maxWidth='xl' style={{marginBottom: '4vh'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Selector
                queryBarName='executeprocess'
                onRecordsChange={(records) => {
                  this.setState({
                    selectedRecords: records
                  });
                }}
                showRecords
                selectedRecords={this.state.selectedRecords}
                onProcessesChange={(processes) => {
                  this.setState({
                    selectedProcess: processes[0]
                  });
                }}
                showProcesses
                singularProcess
                selectedProcess={[this.state.selectedProcess]}
              />
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
