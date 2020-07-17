import React from 'react';
import { forwardRef } from 'react';

import * as Layout from 'config/Layout';

import Grid from '@material-ui/core/Grid';
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

import ProcessCard from 'uiTree/components/Process/ProcessCard';

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

export default class ProcessSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProcesses: this.props.selectedProcesses ? this.props.selectedProcesses : []
    };
  }
  getSelectedProcesses() {
    return this.state.selectedProcesses;
  }
  render() {
    return (
      !this.props.table ?
        <Grid container spacing={2}>
          {(typeof this.props.processes === 'undefined' || this.props.processes.length === 0) ?
            <Grid item xs={12}>
              <Typography variant='body1' align='center'>
                No processes to display
              </Typography>
            </Grid>
          :
            this.props.processes.map((e, i) => {
              return (
                <Grid key={i} item xs={Layout.getDefaultGrid()} style={{minWidth: '300px'}}>
                  <div
                    onClick={() => {
                      var index = this.state.selectedProcesses.findIndex((e2) => {return e2.id === e.id});
                      var sR = this.state.selectedProcesses.slice();
                      if(index === -1) {
                        sR.push(e);
                        this.setState({selectedProcesses: sR});
                      }
                      else {
                        sR.splice(index, 1);
                      }
                      this.setState({selectedProcesses: sR});
                      if(typeof this.props.onSelect === 'function') {this.props.onSelect(sR)}
                    }}
                  >
                    <ProcessCard
                      selectable
                      selected={this.state.selectedProcesses.findIndex((e2) => {return e2.id === e.id;}) > -1}
                      process={e}
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
          title='Processes'
          icons={tableIcons}
          style={{marginBottom: '4vh'}}
          padding='dense'
          color='primary'
          columns={[
            {field: 'lastModified', title: 'Last Modified', sortable: true,
              render: (rowData) => {
                return moment.unix(rowData.lastModified).format('MMM Do YYYY, HH:mm:ss')
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
          data={this.props.processes}
          options={{
            selection: true,
            selectionProps: (rowData) => {return {
              checked: this.state.selectedProcesses.findIndex((e) => {return e.id === rowData.id;}) > -1,
              color: 'default'
            }},
            sorting: true
          }}
          onSelectionChange={(rows) => {
            this.setState({selectedProcesses: rows});
            if(typeof this.props.onSelect === 'function') {this.props.onSelect(rows)}
          }}
        />
    );
  }
}
