import React from 'react';
import { forwardRef } from 'react';

import * as Interface from 'db/Interface';
import * as Processor from 'engine/process/Processor';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import { FiberManualRecord, Code } from '@material-ui/icons';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from "material-table";

import ProcessSelectModal from 'uiTree/components/ProcessSelectModal';
import RecordSelectModal from 'uiTree/components/RecordSelectModal';
import ChartModal from 'uiTree/components/ChartModal';

var moment = require('moment');
var deepCompare = require('deep-compare');
var store = require('store');

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default class AnalyzeRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'metric',
      openRecordModal: false,
      openProcessModal: false,
      openChartModal: false,
      selectedRecords: [],
      selectedProcesses: [],
      data: [],
      columns: [],
      chartSelectedProcesses: [],
      chartProcess: {}
    }
  }
  runMetricProcess() {
    var tmpDataArr = [];
    var tmpColumns = [
      {field: 'startDate', title: 'Date', sortable: true,
        render: (rowData) => {
          return moment.unix(rowData.startDate).format('MMM Do YYYY')
        }
      },
      {field: 'teamNumber', title: 'Team Number', sortable: true},
      {field: 'matchType', title: 'Match Type', sortable: true,
        render: (rowData) => {
          var ret = 'Test';
          if(rowData.matchType === 't') {ret = 'Test';}
          if(rowData.matchType === 'pf') {ret = 'Practice Field';}
          if(rowData.matchType === 'pm') {ret = 'Practice Match';}
          if(rowData.matchType === 'qm') {ret = 'Qualification';}
          if(rowData.matchType === 'ef') {ret = 'Eighth-finals';}
          if(rowData.matchType === 'qf') {ret = 'Quarterfinals';}
          if(rowData.matchType === 'sf') {ret = 'Semifinals';}
          if(rowData.matchType === 'f') {ret = 'Final';}
          return ret;
        }
      },
      {field: 'matchNumber', title: 'Match Number', sortable: true},
      {field: 'isRedAlliance', title: 'Is Red Alliance', sortable: true},
      {field: 'year', title: 'Game Year', sortable: true},
      {field: 'comments', title: 'Comments', sortable: true,
        cellStyle: {
          minWidth: '200px'
        },
        render: (r) => {return r.comments.length <= 25 ? r.comments : r.comments.substr(0,25) + '...'}
      }
    ];
    for(var i = 0;i < this.state.selectedProcesses.length;i++) {
      if(this.state.selectedProcesses[i].queryType === 'record' && this.state.selectedProcesses[i].dataType === 'metric') {
        tmpColumns.push({
          title: this.state.selectedProcesses[i].title,
          field: 'process_' + this.state.selectedProcesses[i].id,
          sortable: true
        });
      }
    }
    for(var i = 0;i < this.state.selectedRecords.length;i++) { // eslint-disable-line no-redeclare
      var tmpData = this.state.selectedRecords[i];
      for(var j = 0;j < this.state.selectedProcesses.length;j++) {
        if(this.state.selectedProcesses[j].queryType === 'record' && this.state.selectedProcesses[j].dataType === 'metric') {
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
  runChartProcess() {
    var tmpDataArr = [];
    var tmpColumns = [
      {field: 'startDate', title: 'Date', sortable: true,
        render: (rowData) => {
          return moment.unix(rowData.startDate).format('MMM Do YYYY')
        }
      },
      {field: 'teamNumber', title: 'Team Number', sortable: true},
      {field: 'matchType', title: 'Match Type', sortable: true,
        render: (rowData) => {
          var ret = 'Test';
          if(rowData.matchType === 't') {ret = 'Test';}
          if(rowData.matchType === 'pf') {ret = 'Practice Field';}
          if(rowData.matchType === 'pm') {ret = 'Practice Match';}
          if(rowData.matchType === 'qm') {ret = 'Qualification';}
          if(rowData.matchType === 'ef') {ret = 'Eighth-finals';}
          if(rowData.matchType === 'qf') {ret = 'Quarterfinals';}
          if(rowData.matchType === 'sf') {ret = 'Semifinals';}
          if(rowData.matchType === 'f') {ret = 'Final';}
          return ret;
        }
      },
      {field: 'matchNumber', title: 'Match Number', sortable: true},
      {field: 'isRedAlliance', title: 'Is Red Alliance', sortable: true},
      {field: 'year', title: 'Game Year', sortable: true},
      {field: 'comments', title: 'Comments', sortable: true,
        cellStyle: {
          minWidth: '200px'
        },
        render: (r) => {return r.comments.length <= 25 ? r.comments : r.comments.substr(0,25) + '...'}
      }
    ];
    for(var i = 0;i < this.state.selectedProcesses.length;i++) {
      if(this.state.selectedProcesses[i].queryType === 'record' && this.state.selectedProcesses[i].dataType === 'chart') {
        tmpColumns.push({
          title: this.state.selectedProcesses[i].title,
          field: 'process_' + this.state.selectedProcesses[i].id,
          render: (r) => {
            return (
              <Button
                fullWidth
                variant='contained'
                color='primary'
              >
                <SelectAllIcon />
                Show Chart
              </Button>
            );
          },
          sortable: true
        });
      }
    }
    for(var i = 0;i < this.state.selectedRecords.length;i++) { // eslint-disable-line no-redeclare
      var tmpData = this.state.selectedRecords[i];
      for(var j = 0;j < this.state.selectedProcesses.length;j++) {
        if(this.state.selectedProcesses[j].queryType === 'record' && this.state.selectedProcesses[j].dataType === 'chart') {
          tmpData['process_' + this.state.selectedProcesses[j].id] = '';
        }
      }
      tmpDataArr.push(tmpData);
    }
    this.setState({
      data: tmpDataArr,
      columns: tmpColumns
    });
  }
  getAllProcesses() {
    var processQueryObj = {
      queryType: 'record',
      dataType: 'chart',
      $or: [
        {year: store.get('settings/currentYear')},
        {year: -1}
      ]
    };
    if(this.state.tab === 'metric') {
      processQueryObj.dataType = 'metric';
    }
    Interface.getProcesses(processQueryObj).then((procs) => {
      this.setState({
        selectedProcesses: procs
      });
    });
  }
  showAll() {
    this.getAllProcesses();
    Interface.getRecords({year: store.get('settings/currentYear')}).then((recs) => {
      this.setState({
        selectedRecords: recs
      });
    });
  }
  componentDidMount() {
    this.showAll();
  }
  componentDidUpdate(prevProps, prevState) {
    if(!deepCompare(prevState.selectedRecords, this.state.selectedRecords) || !deepCompare(prevState.selectedProcesses, this.state.selectedProcesses)) {
      if(this.state.tab === 'metric') {
        this.runMetricProcess();
      }
      else {
        this.runChartProcess();
      }
    }
    if(prevState.tab !== this.state.tab) {
      this.getAllProcesses();
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
        <ChartModal
          open={this.state.openChartModal}
          records={this.state.selectedRecords}
          process={this.state.chartProcess}
          onClose={() => {
            this.setState({openChartModal: false});
          }}
        />
        <Container maxWidth='xl' style={{marginBottom: '4vh'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ButtonGroup fullWidth>
                <Button onClick={() => {this.setState({openRecordModal: true})}}>
                  <FiberManualRecord />
                  Select Records
                </Button>
                <Button onClick={() => {this.setState({openProcessModal: true})}}>
                  <Code />
                  Select Processes
                </Button>
              </ButtonGroup>
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
              <Card style={{marginBottom: '4vh'}}>
                <Tabs
                  value={this.state.tab}
                  onChange={(e, v) => {this.setState({tab: v})}}
                  indicatorColor='primary'
                  textColor='primary'
                  variant='fullWidth'
                >
                  <Tab label='Metrics' value='metric' />
                  <Tab label='Charts' disabled value='chart' />
                </Tabs>
                {this.state.tab === 'metric' ?
                  <MaterialTable
                    title='Metrics'
                    icons={tableIcons}
                    padding='dense'
                    color='primary'
                    columns={this.state.columns}
                    data={this.state.data}
                    options={{
                      exportButton: true,
                      filtering: true,
                      doubleHorizontalScroll: true
                    }}
                  />
                :
                  <MaterialTable
                    title='Metrics'
                    icons={tableIcons}
                    padding='dense'
                    color='primary'
                    columns={this.state.columns}
                    data={this.state.data}
                    options={{
                      exportButton: true,
                      filtering: true,
                      doubleHorizontalScroll: true
                    }}
                  />
                }
              </Card>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}
