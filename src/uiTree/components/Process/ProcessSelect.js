import React from 'react';

import * as Layout from 'config/Layout';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import MaterialTable from 'material-table';
import tableIcons from 'config/Table';

import ProcessCard from 'uiTree/components/Process/ProcessCard';

const moment = require('moment');
const deepCopy = require('deep-copy');

export default class ProcessSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProcesses: this.props.selectedProcesses ? this.props.selectedProcesses : [],
      tableProcesses: []
    };
  }
  getSelectedProcesses() {
    return this.state.selectedProcesses;
  }
  mapTableProcesses() {
    this.setState({
      tableProcesses: this.props.processes.map((rowData) => {
        return Object.assign({
          tableData: {
            checked: this.state.selectedProcesses.findIndex((e) => {return e.id === rowData.id;}) > -1
          }
        }, rowData);
      })
    });
  }
  componentDidMount() {
    this.mapTableProcesses();
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.processes !== this.props.processes || (prevProps.table !== this.props.table && this.props.table)) {
      this.mapTableProcesses();
    }
  }
  render() {
    return (
      !this.props.table ?
        <Grid container spacing={2}>
          {(typeof this.props.processes === 'undefined' || this.props.processes.length === 0) ?
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
            this.props.processes.map((e, i) => {
              return (
                <Grid key={i} item xs={Layout.getDefaultGrid()} style={{minWidth: '300px'}}>
                  <div
                    onClick={() => {
                      let index = this.state.selectedProcesses.findIndex((e2) => {return e2.id === e.id});
                      let sR = this.state.selectedProcesses.slice();
                      if(index === -1) {
                        sR.push(e);
                      }
                      else {
                        sR.splice(index, 1);
                      }
                      if((this.props.singular && this.state.selectedProcesses.length <= 0) || !this.props.singular || index !== -1) {
                        this.setState({selectedProcesses: sR});
                        if(typeof this.props.onSelect === 'function') {this.props.onSelect(sR)}
                      }
                    }}
                  >
                    <ProcessCard
                      selectable
                      selected={this.state.selectedProcesses.findIndex((e2) => {return e2.id === e.id;}) > -1}
                      process={e}
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
            title='Processes'
            icons={tableIcons}
            padding='dense'
            color='primary'
            columns={[
              {field: 'lastModified', title: 'Last Modified', sortable: true,
                render: (rowData) => {
                  return moment.unix(rowData.lastModified).format('MMM Do YYYY')
                }
              },
              {field: 'title', title: 'Title', sortable: true,
                cellStyle: {
                  minWidth: '200px'
                }
              },
              {field: 'description', title: 'Description', sortable: true,
                cellStyle: {
                  minWidth: '300px'
                }
              },
              {field: 'queryType', title: 'Query Type', sortable: true},
              {field: 'dataType', title: 'Data Type', sortable: true},
              {field: 'year', title: 'Game Year', sortable: true,
                render: (rowData) => {
                  return rowData.year !== -1 ? rowData.year : 'None'
                }
              }
            ]}
            data={this.state.tableProcesses}
            options={{
              selection: true,
              selectionProps: (rowData) => {
                return {
                  disabled: this.props.singular && this.state.selectedProcesses.length > 0 && this.state.selectedProcesses.findIndex((e) => {return e.id === rowData.id;}) === -1
                }
              },
              sorting: true,
              filtering: true
            }}
            onSelectionChange={(rows) => {
              let returnRows = deepCopy(rows);
              for(let i = 0;i < returnRows.length;i++) {
                delete returnRows[i].tableData;
              }
              this.setState({selectedProcesses: returnRows});
              if(typeof this.props.onSelect === 'function') {this.props.onSelect(returnRows)}
            }}
            body={{
              emptyDataSourceMessage: 'No processes to display'
            }}
          />
        </Box>
    );
  }
}
