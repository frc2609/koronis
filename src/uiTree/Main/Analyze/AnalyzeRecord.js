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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import MaterialTable from 'material-table';
import tableIcons from 'config/Table';

import Selector from 'uiTree/components/Selector';
import ChartModal from 'uiTree/components/ChartModal';

const moment = require('moment');
const deepCompare = require('fast-deep-equal');
const store = require('store');

class AnalyzeRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'metric',
      redirect: false,
      openChartModal: false,
      selectedRecords: [],
      selectedProcesses: [],
      data: [],
      columns: [],
      chartSelectedProcesses: [],
      chartProcess: {}
    };
    this.routeHandler = this.routeHandler.bind(this);
    window.addEventListener('hashchange', this.routeHandler);
  }
  runMetricProcess() {
    let tmpDataArr = [];
    let tmpColumns = [
      {
        field: 'startDate', title: 'Date', sortable: true,
        render: (rowData) => {
          return moment.unix(rowData.startDate).format('MMM Do YYYY');
        }
      },
      { field: 'teamNumber', title: 'Team Number', sortable: true },
      {
        field: 'matchType', title: 'Match Type', sortable: true,
        render: (rowData) => {
          let ret = 'Test';
          if (rowData.matchType === 't') { ret = 'Test'; }
          if (rowData.matchType === 'pf') { ret = 'Practice Field'; }
          if (rowData.matchType === 'pm') { ret = 'Practice Match'; }
          if (rowData.matchType === 'qm') { ret = 'Qualification'; }
          if (rowData.matchType === 'ef') { ret = 'Eighth-finals'; }
          if (rowData.matchType === 'qf') { ret = 'Quarterfinals'; }
          if (rowData.matchType === 'sf') { ret = 'Semifinals'; }
          if (rowData.matchType === 'f') { ret = 'Final'; }
          return ret;
        },
        customFilterAndSearch: (term, rowData) => {
          let ret = 'Test';
          if (rowData.matchType === 't') { ret = 'Test'; }
          if (rowData.matchType === 'pf') { ret = 'Practice Field'; }
          if (rowData.matchType === 'pm') { ret = 'Practice Match'; }
          if (rowData.matchType === 'qm') { ret = 'Qualification'; }
          if (rowData.matchType === 'ef') { ret = 'Eighth-finals'; }
          if (rowData.matchType === 'qf') { ret = 'Quarterfinals'; }
          if (rowData.matchType === 'sf') { ret = 'Semifinals'; }
          if (rowData.matchType === 'f') { ret = 'Final'; }
          return term.toLowerCase() === ret.toLowerCase();
        }
      },
      { field: 'matchNumber', title: 'Match Number', sortable: true },
      { field: 'isRedAlliance', title: 'Is Red Alliance', sortable: true },
      { field: 'year', title: 'Game Year', sortable: true },
      {
        field: 'comments', title: 'Comments', sortable: true,
        cellStyle: {
          minWidth: '200px'
        },
        render: (r) => {
          return r.comments.length <= 25 ? r.comments : r.comments.substr(0, 25) + '...';
        }
      }
    ];
    for (let i = 0; i < this.state.selectedProcesses.length; i++) {
      if (this.state.selectedProcesses[i].queryType === 'record' && this.state.selectedProcesses[i].dataType === 'metric') {
        tmpColumns.push({
          title: this.state.selectedProcesses[i].title,
          field: 'process_' + this.state.selectedProcesses[i].id,
          sortable: true
        });
      }
    }
    for (let i = 0; i < this.state.selectedRecords.length; i++) { // eslint-disable-line no-redeclare
      let tmpData = this.state.selectedRecords[i];
      for (let j = 0; j < this.state.selectedProcesses.length; j++) {
        if (this.state.selectedProcesses[j].queryType === 'record' && this.state.selectedProcesses[j].dataType === 'metric') {
          tmpData['process_' + this.state.selectedProcesses[j].id] = Processor.runProcess(null, [this.state.selectedRecords[i]], this.state.selectedProcesses[j]).value;
        }
      }
      tmpDataArr.push(tmpData);
    }
    this.setState({
      data: tmpDataArr,
      columns: tmpColumns
    });
  }
  runChartProcess() {}
  getAllProcesses() {
    let processQueryObj = {
      queryType: 'record',
      dataType: 'chart',
      $or: [
        { year: store.get('settings/currentYear') },
        { year: -1 }
      ]
    };
    if (this.state.tab === 'metric') {
      processQueryObj.dataType = 'metric';
    }
    Interface.getProcesses(processQueryObj, 'title').then((procs) => {
      this.setState({
        selectedProcesses: procs
      });
    });
  }
  showAll() {
    this.getAllProcesses();
    Interface.getRecords({ year: store.get('settings/currentYear') }, 'startDate').then((recs) => {
      this.setState({
        selectedRecords: recs
      });
    });
  }
  routeHandler() {
    if (typeof this.props.location !== 'undefined' && typeof this.props.location.pathname === 'string' && this.props.location.pathname.includes('/analyze/record')) {
      if (this.props.location.pathname.includes('/analyze/record/chart')) {
        this.setState({ tab: 'chart', redirect: false });
      }
      else {
        this.setState({ tab: 'metric', redirect: false });
      }
    }
  }
  tabHandler(event, value) {
    this.setState({ tab: value, redirect: true });
  }
  componentDidMount() {
    this.showAll();
    this.routeHandler();
  }
  componentDidUpdate(prevProps, prevState) {
    if (!deepCompare(prevState.selectedRecords, this.state.selectedRecords) || !deepCompare(prevState.selectedProcesses, this.state.selectedProcesses)) {
      if (this.state.tab === 'metric') {
        this.runMetricProcess();
      }
      else {
        this.runChartProcess();
      }
    }
    if (prevState.tab !== this.state.tab) {
      this.getAllProcesses();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('hashchange', this.routeHandler);
  }
  render() {
    return (
      <>
        <ChartModal
          open={this.state.openChartModal}
          records={this.state.selectedRecords}
          process={this.state.chartProcess}
          onClose={() => {
            this.setState({ openChartModal: false });
          }}
        />
        <Box mb={3}>
          <Container maxWidth='xl'>
            <Box mb={3}>
              <Card>
                <Box my={3}>
                  <Container maxWidth='xl'>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Selector
                          queryBarName='analyzerecord'
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
                    </Grid>
                  </Container>
                </Box>
              </Card>
            </Box>
            <Grid container spacing={2}>
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
                      <Tab label='Charts' value='chart' />
                    </Tabs>
                    {this.state.redirect ?
                      <Redirect push to={'/analyze/record/' + this.state.tab} />
                      :
                      null
                    }
                    <Route exact path='/analyze/record'><Redirect push to='/analyze/record/metric' /></Route>
                    <Route path='/analyze/record/metric'>
                      <MaterialTable
                        title='Metrics'
                        icons={tableIcons}
                        padding='dense'
                        color='primary'
                        columns={this.state.columns}
                        data={this.state.data}
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
                    <Route path='/analyze/record/chart'>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Process(es)</TableCell>
                            <TableCell>Chart(s)</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.selectedProcesses.map((e, i) => {
                            if (e.dataType !== 'chart' || e.queryType !== 'record') {
                              return null;
                            }
                            return (
                              <TableRow key={i}>
                                <TableCell>{e.title}</TableCell>
                                <TableCell>
                                  <Button
                                    onClick={() => {
                                      this.setState({ chartProcess: e, openChartModal: true });
                                    }}
                                  >
                                    Show Charts
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </Route>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

const AnalyzeRecordWithRouter = withRouter(AnalyzeRecord);
export default AnalyzeRecordWithRouter;
