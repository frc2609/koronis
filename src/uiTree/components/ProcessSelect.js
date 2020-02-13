import React from 'react';

import * as Layout from 'config/Layout';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ProcessCard from 'uiTree/components/ProcessCard';

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
              <Grid key={i} item xs={Layout.isLandscape() ? 6 : 12} style={{minWidth: '300px'}}>
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
    );
  }
}
