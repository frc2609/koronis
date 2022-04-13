import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import * as Interface from 'db/Interface';
import * as Processor from 'engine/process/Processor';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import MaterialTable from 'material-table';
import tableIcons from 'config/Table';

import TeamCard from 'uiTree/components/TeamCard';
import Selector from 'uiTree/components/Selector';
import TeamCharts from 'uiTree/Main/Analyze/AnalyzeTeam/TeamCharts';

const deepCompare = require('fast-deep-equal');
const store = require('store');
let ss = require('simple-statistics');

class AnalyzeTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'metric',
      redirect: false,
      targetTeamNumber: 0,
      openRecordModal: false,
      openProcessModal: false,
      selectedRecords: [],
      selectedProcesses: [],
      recordsData: [],
      recordsColumns: [],
      metricsData: [],
      metricsColumns: []
    };
    if(typeof store.get('analyze/team/targetTeamNumber') !== 'undefined') {
      this.state.targetTeamNumber = Number(store.get('analyze/team/targetTeamNumber'));
    }
    if(typeof this.props.location !== 'undefined' && typeof this.props.location.pathname === 'string' && this.props.location.pathname.includes('/analyze/team')) {
      if(this.props.location.pathname.includes('/analyze/team/mchart')) {
        this.state.tab = 'mchart';
      }
      else if(this.props.location.pathname.includes('/analyze/team/chart')) {
        this.state.tab = 'chart';
      }
    }
  }
  runMetricProcess() {
    //Records section
    let tmpRecordsData = [];
    let tmpRecordsColumn = [
      {field: 'title', title: 'Title', sortable: true,
        cellStyle: {
          minWidth: '200px'
        }
      },
      {field: 'mean', title: 'Mean', sortable: true},
      {field: 'mode', title: 'Mode', sortable: true},
      {field: 'median', title: 'Median', sortable: true},
      {field: 'sum', title: 'Sum', sortable: true},
      {field: 'min', title: 'Min', sortable: true},
      {field: 'quartile1', title: '1st Quartile', sortable: true},
      {field: 'quartile3', title: '3rd Quartile', sortable: true},
      {field: 'max', title: 'Max', sortable: true},
      {field: 'standardDeviation', title: 'Standard Deviation', sortable: true},
      {field: 'interquartileRange', title: 'Interquartile Range', sortable: true},
      {field: 'range', title: 'Range', sortable: true}
    ];
    for(let i = 0;i < this.state.selectedProcesses.length;i++) {
      if(this.state.selectedProcesses[i].queryType === 'record' && this.state.selectedProcesses[i].dataType === 'metric') {
        let perProcessData = [];
        for(let j = 0;j < this.state.selectedRecords.length;j++) {
          let val = Processor.runProcess(null, [this.state.selectedRecords[j]], this.state.selectedProcesses[i]).value;
          if(!Number.isNaN(val)) {
            perProcessData.push(val);
          }
        }
        if(perProcessData.length > 0) {
          let recordData = {
            title: this.state.selectedProcesses[i].title,
            mean: ss.mean(perProcessData),
            mode: ss.modeFast(perProcessData),
            median: ss.median(perProcessData),
            min: ss.min(perProcessData),
            max: ss.max(perProcessData),
            sum: ss.sum(perProcessData),
            quartile1: ss.quantile(perProcessData, 0.25),
            quartile3: ss.quantile(perProcessData, 0.75),
            standardDeviation: ss.standardDeviation(perProcessData),
            interquartileRange: ss.interquartileRange(perProcessData)
          };
          recordData.range = recordData.max - recordData.min;
          tmpRecordsData.push(recordData);
        }
      }
    }
    this.setState({
      recordsData: tmpRecordsData,
      recordsColumns: tmpRecordsColumn
    })
  }
  getAllProcesses() {
    let processQueryObj = {
      dataType: 'chart',
      $or: [
        {year: Number(store.get('settings/currentYear'))},
        {year: -1}
      ]
    };
    if(this.state.tab === 'metric' || this.state.tab === 'mchart') {
      processQueryObj.dataType = 'metric';
    }
    Interface.getProcesses(processQueryObj, 'title').then((procs) => {
      this.setState({
        selectedProcesses: procs
      });
    });
  }
  getAllRecords() {
    Interface.getRecords({year: Number(store.get('settings/currentYear')), teamNumber: Number(this.state.targetTeamNumber)}, 'startDate').then((recs) => {
      this.setState({
        selectedRecords: recs
      });
    });
  }
  showAll() {
    this.getAllProcesses();
    this.getAllRecords();
  }
  tabHandler(event, value) {
    this.setState({tab: value, redirect: true});
  }
  componentDidMount() {
    this.showAll();
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.targetTeamNumber !== this.state.targetTeamNumber) {
      this.getAllRecords();
    }
    if(prevState.tab !== this.state.tab) {
      this.getAllProcesses();
    }
    if(!deepCompare(prevState.selectedRecords, this.state.selectedRecords) || !deepCompare(prevState.selectedProcesses, this.state.selectedProcesses)) {
      this.runMetricProcess();
    }
  }
  render() {
    return (
      <Box mb={3}>
        <Container maxWidth='xl'>
          <Box mb={3}>
            <Card>
              <Box my={3}>
                <Container maxWidth='xl'>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Selector
                        queryBarName='analyzeteam'
                        onRecordsChange={(records) => {
                          this.setState({
                            selectedRecords: records
                          });
                        }}
                        showRecords
                        selectedRecords={this.state.selectedRecords}
                        onProcessesChange={(processes) => {
                          this.setState({
                            selectedProcesses: processes
                          });
                        }}
                        showProcesses
                        selectedProcesses={this.state.selectedProcesses}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        onClick={this.showAll.bind(this)}
                      >
                        <SelectAllIcon />
                        Show All
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label='Team Number'
                        variant='outlined'
                        margin='normal'
                        type='number'
                        value={this.state.targetTeamNumber > 0 ? this.state.targetTeamNumber : ''}
                        onChange={(e) => {
                          store.set('analyze/team/targetTeamNumber', e.target.value);
                          this.setState({targetTeamNumber: Number(e.target.value)});
                        }}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Card>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TeamCard teamNumber={this.state.targetTeamNumber} />
            </Grid>
            <Grid item xs={12}>
              <Box mb={3}>
                <Card>
                  <Tabs
                    value={this.state.tab}
                    onChange={this.tabHandler.bind(this)}
                    indicatorColor='primary'
                    textColor='primary'
                    variant='fullWidth'
                  >
                    <Tab label='Metrics' value='metric' />
                    <Tab label='Charts' value='mchart' />
                    <Tab label='Custom Charts' disabled value='chart' />
                  </Tabs>
                  {this.state.redirect ?
                    <Redirect push to={'/analyze/team/' + this.state.tab} />
                  :
                    null
                  }
                  <Route exact path='/analyze/team'><Redirect push to='/analyze/team/metric' /></Route>
                  <Route path='/analyze/team/metric'>
                    <MaterialTable
                      title='Team Records'
                      icons={tableIcons}
                      padding='dense'
                      color='primary'
                      columns={this.state.recordsColumns}
                      data={this.state.recordsData}
                      options={{
                        exportButton: true,
                        exportAllData: true,
                        sorting: true,
                        filtering: true,
                        doubleHorizontalScroll: true
                      }}
                    />
                    <MaterialTable
                      title='Team Metrics'
                      icons={tableIcons}
                      padding='dense'
                      color='primary'
                      columns={this.state.metricsColumns}
                      data={this.state.metricsData}
                      options={{
                        exportButton: true,
                        exportAllData: true,
                        sorting: true,
                        filtering: true,
                        doubleHorizontalScroll: true
                      }}
                      body={{
                        emptyDataSourceMessage: 'No metrics to display'
                      }}
                    />
                  </Route>
                  <Route path='/analyze/team/mchart'>
                    <Container>
                      <TeamCharts
                        processes={this.state.selectedProcesses}
                        records={this.state.selectedRecords}
                      />
                    </Container>
                  </Route>
                  <Route path='/analyze/team/chart'>
                    <Grid container spacing={2}>
                      {(typeof this.state.selectedRecords === 'undefined' || this.state.selectedRecords.length === 0) ?
                        <Grid item xs={12}>
                          <Typography variant='body1' align='center'>
                            No records to display
                          </Typography>
                        </Grid>
                      :
                        this.state.selectedRecords.map((e, i) => {
                          return (
                            <Grid key={i} item xs={12}>
                            </Grid>
                          );
                        })
                      }
                    </Grid>
                  </Route>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }
}

const AnalyzeTeamWithRouter = withRouter(AnalyzeTeam);
export default AnalyzeTeamWithRouter;
