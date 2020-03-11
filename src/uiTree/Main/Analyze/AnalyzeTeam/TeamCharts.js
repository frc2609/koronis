import React from 'react';

import * as Color from 'config/Color';
import * as Layout from 'config/Layout';
import * as Processor from 'engine/process/Processor';

import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

var deepCompare = require('deep-compare');
var deepcopy = require('deep-copy');
var chart = require('chart.js');
var moment = require('moment');

export default class TeamCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSeries: false
    };
    this.timelineChart = null;
  }
  runCharts() {
    if(typeof this.refs.timeline !== 'undefined') {
      var timelineCtx = this.refs.timeline.getContext('2d');
      var timelineData = [];

      for(var i = 0;i < this.props.processes.length;i++) {
        if(this.props.processes[i].queryType === 'record' && this.props.processes[i].dataType === 'metric') {
          var perProcessData = [];
          for(var j = 0;j < this.props.records.length;j++) {
            var val = Processor.runProcess(null, [this.props.records[j]], this.props.processes[i]).value;
            if(!Number.isNaN(val)) {
              perProcessData.push({
                x: moment.unix(this.props.records[j].startDate).toString(),
                y: val,
                matchString: this.props.records[j].matchType.toUpperCase() + this.props.records[j].matchNumber
              });
            }
          }
          timelineData.push({
            label: this.props.processes[i].title,
            backgroundColor: Color.getColor(this.props.processes[i].title, 0.5),
            borderColor: Color.getColor(this.props.processes[i].title),
					  fill: false,
            data: perProcessData
          });
        }
      }
      if(this.timelineChart !== null) {
        this.timelineChart.destroy();
      }
      this.timelineChart = new chart(timelineCtx, {
        type: 'line',
        data: {
          datasets: timelineData
        },
        options: {
  				responsive: true,
          scales: {
            xAxes: [{
              type: 'time',
  						display: true,
              scaleLabel: {
  							display: true,
  							labelString: 'Date'
  						},
              time: {
                displayFormat: 'day'
              },
              distribution: this.state.timeSeries ? 'series' : 'linear'
            }],
  					yAxes: [{
  						display: true,
  						scaleLabel: {
  							display: true,
  							labelString: 'Metric'
  						}
  					}]
          },
          legend: {
            position: 'bottom'
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].matchString + ' - ' + data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.value;
              }
            }
          }
        }
      });
    }
  }
  componentDidMount() {
    this.runCharts();
  }
  componentDidUpdate(prevProps, prevState) {
    if(!deepCompare(prevProps.records, this.props.records) || !deepCompare(prevProps.processes, this.props.processes) || prevState.timeSeries !== this.state.timeSeries) {
      this.runCharts();
    }
  }
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <canvas ref='timeline'></canvas>
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.timeSeries}
                  onChange={(event) => {
                    this.setState({timeSeries: event.target.checked});
                  }}
                  color='primary'
                />
              }
              label='Equal Time Width Mode'
            />
          </FormGroup>
        </Grid>
      </Grid>
    );
  }
}
