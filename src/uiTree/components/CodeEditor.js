import React from 'react';

import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';

import 'uiTree/components/CodeEditor.css';

export default class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currStr: typeof this.props.value === 'undefined' ? '' : this.props.value
    }
  }
  getValue() {
    return this.state.currStr;
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.value !== this.props.value && typeof this.props.value !== 'undefined') {
      this.setState({currStr: this.props.value});
    }
  }
  render() {return (
    <div style={{marginBottom: '4vh', textAlign: 'left', border: '1px grey solid', height: '100%'}}>
      <CodeMirror
        ref='codeMirror'
        value={this.state.currStr}
        onBeforeChange={(editor, data, value) => {this.setState({currStr: value})}}
        onChange={(editor, data, value) => {if(typeof this.props.onChange === 'function') {this.props.onChange(value)}}}
        options={{
          mode: 'javascript',
          matchBrackets: true,
          autoCloseBrackets: true,
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          tabSize: 2,
          lineNumbers: true
        }}
      />
    </div>
  );}
}
