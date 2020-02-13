import React from 'react';

import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

export default class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currStr: ''
    }
  }
  getValue() {
    return this.state.currStr;
  }
  codeMirrorHandler(val) {
    this.setState({currStr: val});
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.value !== this.props.value) {
      this.setState({currStr: this.props.value})
    }
  }
  render() {return (
    <div style={{marginBottom: '4vh', textAlign: 'left', border: '1px grey solid'}}>
      <CodeMirror
        value={this.state.currStr}
        onChange={this.codeMirrorHandler.bind(this)}
        options={{
          mode: 'javascript',
          tabSize: 2,
          lineNumbers: true
        }}
      />
    </div>
  );}
}
