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
import TextField from '@material-ui/core/TextField';

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

import TeamCard from 'uiTree/components/TeamCard';
import ProcessSelectModal from 'uiTree/components/Process/ProcessSelectModal';
import RecordSelectModal from 'uiTree/components/Record/RecordSelectModal';
import TeamCharts from 'uiTree/Main/Analyze/AnalyzeTeam/TeamCharts';

var moment = require('moment');
var deepCompare = require('deep-compare');
var store = require('store');
var ss = require('simple-statistics');

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

export default class AnalyzeTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'metric',
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
  }
  runMetricProcess() {
    //Records section
    var tmpRecordsData = [];
    var tmpRecordsColumn = [
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
    for(var i = 0;i < this.state.selectedProcesses.length;i++) {
      if(this.state.selectedProcesses[i].queryType === 'record' && this.state.selectedProcesses[i].dataType === 'metric') {
        var perProcessData = [];
        for(var j = 0;j < this.state.selectedRecords.length;j++) {
          var val = Processor.runProcess(null, [this.state.selectedRecords[j]], this.state.selectedProcesses[i]).value;
          if(val !== NaN) {
            perProcessData.push(val);
          }
        }
        if(perProcessData.length > 0) {
          var recordData = {
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
    var processQueryObj = {
      dataType: 'chart',
      $or: [
        {year: Number(store.get('settings/currentYear'))},
        {year: -1}
      ]
    };
    if(this.state.tab === 'metric' || this.state.tab === 'mchart') {
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
    Interface.getRecords({year: Number(store.get('settings/currentYear')), teamNumber: Number(this.state.targetTeamNumber)}).then((recs) => {
      this.setState({
        selectedRecords: recs
      });
    });
  }
  componentDidMount() {
    this.showAll();
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.targetTeamNumber !== this.state.targetTeamNumber || !deepCompare(prevState.selectedRecords, this.state.selectedRecords) || !deepCompare(prevState.selectedProcesses, this.state.selectedProcesses)) {
      this.runMetricProcess();
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
            var tmpRecords = [];
            for(var i = 0;i < records.length;i++) {
              if(records[i].teamNumber === this.state.targetTeamNumber) {
                tmpRecords.push(records[i]);
              }
            }
            if(tmpRecords.length > 0) {
              this.setState({
                openRecordModal: false,
                selectedRecords: tmpRecords
              });
            }
          }}
          selectedRecords={this.state.selectedRecords}
        />
        <Container maxWidth='xl' style={{marginBottom: '4vh'}}>
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
                value={this.state.targetTeamNumber}
                onChange={(e) => {
                  store.set('analyze/team/targetTeamNumber', e.target.value);
                  this.setState({targetTeamNumber: Number(e.target.value)});
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
               <TeamCard teamNumber={this.state.targetTeamNumber} />
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
                  <Tab label='Charts' value='mchart' />
                  <Tab label='Custom Charts' disabled value='chart' />
                </Tabs>
                {this.state.tab === 'metric' ?
                  <>
                    <MaterialTable
                      title='Team Records'
                      icons={tableIcons}
                      padding='dense'
                      color='primary'
                      columns={this.state.recordsColumns}
                      data={this.state.recordsData}
                      options={{
                        exportButton: true,
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
                        filtering: true,
                        doubleHorizontalScroll: true
                      }}
                    />
                  </>
                : this.state.tab === 'mchart' ?
                  <Container>
                    <TeamCharts
                      processes={this.state.selectedProcesses}
                      records={this.state.selectedRecords}
                    />
                  </Container>
                :
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
                }
              </Card>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}
