import React from 'react';

import * as Save from 'engine/process/Save';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';

import CodeEditor from 'uiTree/components/CodeEditor';
import ProcessCreationBar from 'uiTree/Main/Process/Edit/ProcessCreationBar';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      process: {}
    }
  }
  openHandler(process) {
    this.setState({
      process: process
    });
  }
  newHandler(emptyObj) {
    this.setState({
      process: emptyObj
    });
  }
  saveHandler() {
    var process = this.refs.processCreationBar.getCreationObj();
    Save.saveProcess(
      process.year,
      process.queryType,
      process.dataType,
      process.name,
      process.title,
      process.description,
      this.state.process.function,
      this.state.process
    ).then((success) => {
      if(success) {
        window.globalAlert('success', 'Saved Process Successfully!');
      }
      else {
        window.globalAlert('error', 'Error Saving Process!');
      }
    });
  }
  saveNewHandler() {
    var process = this.refs.processCreationBar.getCreationObj();
    Save.saveProcess(
      process.year,
      process.queryType,
      process.dataType,
      process.name,
      process.title,
      process.description,
      this.state.process.function,
      {}
    ).then((success) => {
      if(success) {
        window.globalAlert('success', 'Saved New Process Successfully!');
      }
      else {
        window.globalAlert('error', 'Error Saving New Process!');
      }
    });
  }
  render() {
    return (
      <Container maxWidth='xl'>
        <Card>
          <Box mt={3}>
            <ProcessCreationBar
              ref='processCreationBar'
              openModal={this.state.openModal}
              onOpen={this.openHandler.bind(this)}
              onNew={this.newHandler.bind(this)}
              onSave={this.saveHandler.bind(this)}
              onSaveNew={this.saveNewHandler.bind(this)}
            />
          </Box>
          <Box mb={3}>
            <Container maxWidth='xl' style={{height: '45vh'}}>
              <CodeEditor
                ref='codeEditor'
                value={typeof this.state.process === 'undefined' ?
                  ''
                :
                  this.state.process.function
                }
                onChange={(value) => {
                  var tmp = typeof this.state.process === 'undefined' ? {} : this.state.process;
                  tmp.function = value;
                  this.setState({process: tmp, openModal: false});
                }}
                onOpen={() => {this.setState({openModal: true})}}
                onSave={this.saveHandler.bind(this)}
                onSaveNew={this.saveNewHandler.bind(this)}
              />
            </Container>
          </Box>
        </Card>
      </Container>
    );
  }
}
