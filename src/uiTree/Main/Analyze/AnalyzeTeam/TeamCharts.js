import React from 'react';

import * as Color from 'config/Color';
import * as Layout from 'config/Layout';
import * as Processor from 'engine/process/Processor';

import Grid from '@material-ui/core/Grid';

var deepCompare = require('deep-compare');
var chart = require('chart.js');
var moment = require('moment');

export default class TeamCharts extends React.Component {
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
                x: moment.unix(this.props.records[j].startDate).toDate(),
                y: val
              });
            }
          }
          timelineData.push({
            label: this.props.processes[i].title,
            backgroundColor: Color.getColor(this.props.processes[i].title, 0.5),
            borderColor: Color.getColor(this.props.processes[i].title),
            data: perProcessData
          });
        }
      }
      var timelineChart = new chart(timelineCtx, {
        type: 'line',
        data: {
          labels: [],
          datasets: timelineData
        },
        option: {
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'day'
              }
            }]
          }
        }
      });
    }
    if(typeof this.refs.bar !== 'undefined' && false) {
      var barCtx = this.refs.bar.getContext('2d');
      var barData = []

      if(this.state.selectedProcess.queryType === 'record' && this.state.selectedProcess.dataType === 'metric') {
        for(var i = 0;i < this.props.records.length;i++) {
          var val = Processor.runProcess(null, [this.props.records[i]], this.state.selectedProcess).value;
          if(!Number.isNaN(val)) {
            barData.push(val);
          }
        }
        var barChart = new chart(barCtx, {
          type: 'bar',
          data: {
            labels: [],
            datasets: [{
              label: this.state.selectedProcess.title,
      				backgroundColor: 'rgba(255, 0, 0, 0.5)',
      				borderColor: 'rgb(255, 0, 0)',
              data: barData
            }]
          },
          option: {}
        });
      }
    }
  }
  componentDidMount() {
    this.runCharts();
  }
  componentDidUpdate(prevProps, prevState) {
    if(!deepCompare(prevProps.records, this.props.records) || !deepCompare(prevProps.processes, this.props.processes)) {
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
          <canvas ref='bar'></canvas>
        </Grid>
      </Grid>
    );
  }
}
