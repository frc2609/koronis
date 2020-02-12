import React from 'react';

import * as Layout from 'config/Layout';

import Grid from '@material-ui/core/Grid';

import ProcessCard from 'uiTree/components/ProcessCard';

export default class ProcessSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProcesses: this.props.selectedProcesses ? this.props.selectedProcesses : []
    };
  }
  getSelectedRecords() {
    return this.state.selectedProcesses;
  }
  render() {
    return (
      <Grid container spacing={2}>
        {(typeof this.props.processes === 'undefined') ? '' :
          this.props.processes.map((e, i) => {
            return (
              <Grid key={i} item xs={Layout.isLandscape() ? 6 : 12} style={{minWidth: '300px'}}>
                <div
                  onClick={() => {
                    var index = this.state.selectedProcesses.findIndex((e2) => {return e2.id === e.id;});
                    if(index === -1) {
                      var sR = this.state.selectedProcesses.slice();
                      sR.push(e);
                      this.setState({selectedProcesses: sR});
                    }
                    else {
                      var sR = this.state.selectedProcesses.slice(); // eslint-disable-line no-redeclare
                      sR.splice(index, 1);
                      this.setState({selectedProcesses: sR});
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
    );
  }
}
