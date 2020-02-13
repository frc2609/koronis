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
      this.refs.codeEditor.getValue(),
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
      this.refs.codeEditor.getValue(),
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
        <Container maxWidth='xl'>
          <CodeEditor
            ref='codeEditor'
          />
        </Container>
      </>
    );
  }
}
