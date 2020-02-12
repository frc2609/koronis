import React from 'react';

import * as Interface from 'db/Interface';

import Container from '@material-ui/core/Container';

import * as Save from 'engine/process/Save';
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
  newHandler() {
    this.setState({
      process: this.refs.processCreationBar.getCreationObj()
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
  render() {
    return (
      <>
        <ProcessCreationBar
          ref='processCreationBar'
          onOpen={this.openHandler.bind(this)}
          onNew={this.newHandler.bind(this)}
          onSave={this.saveHandler.bind(this)}
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
