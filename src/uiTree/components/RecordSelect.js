import React from 'react';
import { forwardRef } from 'react';

import * as Layout from 'config/Layout';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

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

import RecordCard from 'uiTree/components/RecordCard';

var moment = require('moment');

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

export default class RecordSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecords: this.props.selectedRecords ? this.props.selectedRecords : []
    };
  }
  getSelectedRecords() {
    return this.state.selectedRecords;
  }
  render() {
    return (
      <>
        {!this.props.table ?
          <Grid container spacing={2}>
            {(typeof this.props.records === 'undefined' || this.props.records.length === 0) ?
              <Grid item xs={12}>
                <Typography variant='body1' align='center'>
                  No records to display
                </Typography>
              </Grid>
            :
              this.props.records.map((e, i) => {
                return (
                  <Grid key={i} item xs={Layout.getDefaultGrid()} style={{minWidth: '300px'}}>
                    <div
                      onClick={() => {
                        var index = this.state.selectedRecords.findIndex((e2) => {return e2.id === e.id});
                        var sR = this.state.selectedRecords.slice();
                        if(index === -1) {
                          sR.push(e);
                          this.setState({selectedRecords: sR});
                        }
                        else {
                          sR.splice(index, 1);
                        }
                        this.setState({selectedRecords: sR});
                        if(typeof this.props.onSelect === 'function') {this.props.onSelect(sR)}
                      }}
                    >
                      <RecordCard
                        selectable
                        selected={this.state.selectedRecords.findIndex((e2) => {return e2.id === e.id;}) > -1}
                        record={e}
                        onRemove={this.props.onRemove.bind(this)}
                      />
                    </div>
                  </Grid>
                );
              })
            }
          </Grid>
        :
          <MaterialTable
            title='Records'
            icons={tableIcons}
            style={{marginBottom: '4vh'}}
            padding='dense'
            color='primary'
            columns={[
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
                render: (r) => {return r.comments.length <= 50 ? r.comments : r.comments.substr(0,50) + '...'}
              }
            ]}
            data={this.props.records}
            options={{
              selection: true,
              selectionProps: (rowData) => {return {
                checked: this.state.selectedRecords.findIndex((e) => {return e.id === rowData.id;}) > -1,
                color: 'default'
              }},
              sorting: true
            }}
            onSelectionChange={(rows) => {
              this.setState({selectedRecords: rows});
              if(typeof this.props.onSelect === 'function') {this.props.onSelect(rows)}
            }}
          />
        }
      </>
    );
  }
}
