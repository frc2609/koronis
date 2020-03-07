import React from 'react';

import * as Processor from 'engine/process/Processor';

import Card from '@material-ui/core/Card';

var deepCompare = require('deep-compare');

export default class ChartCard extends React.Component {
  runProcess() {
    if(typeof this.refs.targetElement !== 'undefined') {
      Processor.runProcess(this.refs.targetElement, this.props.records, this.props.process);
    }
  }
  componentDidMount() {
    this.runProcess();
  }
  componentDidUpdate(prevProps, prevState) {
    if(!deepCompare(prevProps.records, this.props.records) || !deepCompare(prevProps.process, this.props.process)) {
      this.runProcess();
    }
  }
  render() {
    return (
      <Card>
        <div ref='targetElement'></div>
      </Card>
    );
  }
}
