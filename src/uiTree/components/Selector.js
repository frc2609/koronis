import React from 'react';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { FiberManualRecord, Code } from '@material-ui/icons';

import ProcessSelectModal from 'uiTree/components/Process/ProcessSelectModal';
import RecordSelectModal from 'uiTree/components/Record/RecordSelectModal';

var deepCompare = require('deep-compare');

export default class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProcesses: [],
      selectedRecords: [],
      openRecordModal: false,
      openProcessModal: false
    };
  }
  refresh() {
    if(this.props.selectedRecords) {
      this.setState({selectedRecords: this.props.selectedRecords});
    }
    if(this.props.selectedProcesses) {
      this.setState({selectedProcesses: this.props.selectedProcesses});
    }
  }
  componentDidMount() {
    this.refresh();
  }
  componentDidUpdate(prevProps) {
    if(!deepCompare(prevProps.selectedRecords, this.props.selectedRecords) && this.props.selectedRecords) {
      this.setState({selectedRecords: this.props.selectedRecords});
    }
    if(!deepCompare(prevProps.selectedProcesses, this.props.selectedProcesses) && this.props.selectedProcesses) {
      this.setState({selectedProcesses: this.props.selectedProcesses});
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
            this.setState({openRecordModal: false, selectedRecords: records});
            if(typeof this.props.onRecordsChange === 'function') {this.props.onRecordsChange(records)}
          }}
          selectedRecords={this.state.selectedRecords}
          singular={this.props.singularRecord}
        />
        <ProcessSelectModal
          open={this.state.openProcessModal}
          onClose={() => {
            this.setState({openProcessModal: false});
          }}
          onSelect={(processes) => {
            this.setState({openProcessModal: false, selectedProcesses: processes});
            if(typeof this.props.onProcessesChange === 'function') {this.props.onProcessesChange(processes)}
          }}
          selectedProcesses={this.state.selectedProcesses}
          singular={this.props.singularProcess}
          queryBarName={this.props.queryBarName}
        />
        <ButtonGroup fullWidth>
          {this.props.showRecords ?
            <Button onClick={() => {this.setState({openRecordModal: true})}} startIcon={<FiberManualRecord />}>
              {this.state.selectedRecords.length <= 0 ?
                this.props.singularRecord ?
                  'Select Record'
                :
                  'Select Records'
              :
                this.state.selectedRecords.length > 1 ?
                  this.state.selectedRecords.length + ' Records Selected'
                :
                  this.state.selectedRecords.length + ' Record Selected'
              }
            </Button>
          :
            <></>
          }
          {this.props.showProcesses ?
            <Button onClick={() => {this.setState({openProcessModal: true})}} startIcon={<Code />}>
              {this.state.selectedProcesses.length <= 0 ?
                this.props.singularProcess ?
                  'Select Process'
                :
                  'Select Processes'
              : this.state.selectedProcesses.length > 1 ?
                this.state.selectedProcesses.length + ' Processes Selected'
              :
                this.state.selectedProcesses.length + ' Process Selected'
              }
            </Button>
          :
            <></>
          }
        </ButtonGroup>
      </>
    );
  }
}
