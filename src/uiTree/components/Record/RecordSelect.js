import React from 'react';

import * as Layout from 'config/Layout';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography'

import MaterialTable from 'material-table';
import tableIcons from 'config/Table';

import RecordCard from 'uiTree/components/Record/RecordCard';

var moment = require('moment');

export default class RecordSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecords: this.props.selectedRecords ? this.props.selectedRecords : [],
      tableRecords: []
    };
  }
  getSelectedRecords() {
    return this.state.selectedRecords;
  }
  mapTableRecords() {
    this.setState({
      tableRecords: this.props.records.map((rowData) => {
        return Object.assign({
          tableData: {
            checked: this.state.selectedRecords.findIndex((e) => {return e.id === rowData.id;}) > -1
          }
        }, rowData);
      })
    });
  }
  componentDidMount() {
    this.mapTableRecords();
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.records !== this.props.records || (prevProps.table !== this.props.table && this.props.table)) {
      this.mapTableRecords();
    }
  }
  render() {
    return (
      <>
        {!this.props.table ?
          <Grid container spacing={2}>
            {(typeof this.props.records === 'undefined' || this.props.records.length === 0) ?
              <Grid item xs={12}>
                {this.props.loading ?
                  <Box display='flex' justifyContent='center'>
                    <CircularProgress />
                  </Box>
                :
                  <Typography variant='body1' align='center'>
                    No processes to display
                  </Typography>
                }
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
                        }
                        else {
                          sR.splice(index, 1);
                        }
                        if((this.props.singular && this.state.selectedRecords.length <= 0) || !this.props.singular || index !== -1) {
                          this.setState({selectedRecords: sR});
                          if(typeof this.props.onSelect === 'function') {this.props.onSelect(sR)}
                        }
                      }}
                    >
                      <RecordCard
                        selectable
                        selected={this.state.selectedRecords.findIndex((e2) => {return e2.id === e.id;}) > -1}
                        record={e}
                      />
                    </div>
                  </Grid>
                );
              })
            }
          </Grid>
        :
          <Box mb={3}>
            <MaterialTable
              title='Records'
              icons={tableIcons}
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
              data={this.props.tableRecords}
              options={{
                selection: true,
                selectionProps: (rowData) => {
                  return {
                    disabled: this.props.singular && this.state.selectedRecords.length > 0 && this.state.selectedRecords.findIndex((e) => {return e.id === rowData.id;}) === -1
                  }
                },
                sorting: true
              }}
              onSelectionChange={(rows) => {
                this.setState({selectedRecords: rows});
                if(typeof this.props.onSelect === 'function') {this.props.onSelect(rows)}
              }}
            />
          </Box>
        }
      </>
    );
  }
}
