import React from 'react';

import * as Save from 'engine/process/Save';

import Container from '@material-ui/core/Container';

import CodeEditor from 'uiTree/components/CodeEditor';
import ProcessCreationBar from 'uiTree/Main/Process/Edit/ProcessCreationBar';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    );
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
    );
  }
  render() {
    return (
      <>
        <ProcessCreationBar
          ref='processCreationBar'
          onOpen={this.openHandler.bind(this)}
          onNew={this.newHandler.bind(this)}
          onSave={this.saveHandler.bind(this)}
          onSaveNew={this.saveNewHandler.bind(this)}
        />
        <Container maxWidth='xl' style={{marginBottom: '4vh', height: '40vh'}}>
          <CodeEditor
            ref='codeEditor'
            value={
              typeof this.state.process === 'undefined' ?
                ''
              :
                this.state.process.function
            }
            onChange={(value) => {
              var tmp = typeof this.state.process === 'undefined' ? {} : this.state.process;
              tmp.function = value;
              this.setState({process: tmp});
            }}
          />
        </Container>
      </>
    );
  }
}
