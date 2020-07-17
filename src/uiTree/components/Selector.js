import React from 'react';

import serializerWorker from 'workerize-loader!engine/worker/Serializer'; // eslint-disable-line import/no-webpack-loader-syntax

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { FiberManualRecord, Code } from '@material-ui/icons';

import ProcessSelectModal from 'uiTree/components/Process/ProcessSelectModal';
import RecordSelectModal from 'uiTree/components/Record/RecordSelectModal';
import SendString from 'engine/transfer/qrcode/SendString';

var serializerInstance = new serializerWorker();
var deepCompare = require('deep-compare');

export default class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openRecordModal: false,
      openProcessModal: false
    }
  }
  render() {
    return (
      <>
        <RecordSelectModal
          open={this.state.openRecordModal}
          onClose={() => {
            this.setState({openRecordModal: false});
          }}
          onSelect={(records) => {
            if(typeof this.props.onRecordsChange === 'function') {this.props.onProcessesChange(records)}
          }}
          value={this.props.valueRecords}
        />
        <ProcessSelectModal
          open={this.state.openProcessModal}
          onClose={() => {
            this.setState({openProcessModal: false});
          }}
          onSelect={(processes) => {
            if(typeof this.props.onProcessesChange === 'function') {this.props.onProcessesChange(processes)}
          }}
          value={this.props.valueProcesses}
        />
        <ButtonGroup fullWidth>
          <Button onClick={() => {this.setState({openRecordModal: true})}} startIcon={<FiberManualRecord />}>
            {this.props.valueRecords.length <= 0 ?
              this.props.singularRecord ?
                'Select Record'
              :
                'Select Records'
            :
              this.props.valueRecords.length > 1 ?
                this.props.valueRecords.length + ' Records Selected'
              :
                this.props.valueRecords.length + ' Record Selected'
            }
          </Button>
          <Button onClick={() => {this.setState({openProcessModal: true})}} startIcon={<Code />}>
            {this.props.valueProcesses.length <= 0 ?
              this.props.singularProcess ?
                'Select Process'
              :
                'Select Processes'
            : this.props.valueProcesses.length > 1 ?
              this.props.valueProcesses.length + ' Processes Selected'
            :
              this.props.valueProcesses.length + ' Process Selected'
            }
          </Button>
        </ButtonGroup>
      </>
    );
  }
}
